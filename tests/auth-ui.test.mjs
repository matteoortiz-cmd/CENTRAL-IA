import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Exercise the actual UI module without a browser, network or Firebase account.
const source = await readFile(new URL('../dist/auth-ui.js', import.meta.url), 'utf8');
const { mountAuth, authErrorMessage } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

class Element {
  textContent = '';
  hidden = false;
  disabled = false;
  open = false;
  dataset = {};
  listeners = new Map();
  attributes = new Map();
  focusCalls = [];
  scrollCalls = [];
  classList = {
    values: new Set(),
    add(...names) { names.forEach(name => this.values.add(name)); },
    remove(...names) { names.forEach(name => this.values.delete(name)); },
    contains(name) { return this.values.has(name); },
    toggle(name, force) {
      const next = force === undefined ? !this.values.has(name) : force;
      if (next) this.values.add(name); else this.values.delete(name);
      return next;
    }
  };
  setAttribute(name, value) { this.attributes.set(name, value); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  removeAttribute(name) { this.attributes.delete(name); }
  focus(options) { this.focusCalls.push(options); }
  scrollIntoView(options) { this.scrollCalls.push(options); }
  addEventListener(name, callback) {
    const callbacks = this.listeners.get(name) || [];
    callbacks.push(callback);
    this.listeners.set(name, callbacks);
  }
  emit(name) { return Promise.all((this.listeners.get(name) || []).map(callback => callback())); }
  showModal() { this.open = true; }
  close() { this.open = false; }
  set innerHTML(_) { throw new Error('Account data must never be rendered as HTML.'); }
}

function fixture({ initialUser = null, guest = false, sessionOnly = false, loadClient, storage,
  loadTimeoutMs, signInTimeoutMs, clientOverride = {} } = {}) {
  const ids = ['account-dialog', 'auth-status', 'account-button', 'auth-guest', 'auth-retry',
    'auth-sign-out', 'auth-signed-out', 'auth-signed-in', 'account-title', 'auth-name',
    'auth-email', 'auth-providers', 'auth-persistence', 'auth-diagnostic'];
  const elements = Object.fromEntries(ids.map(id => [id, new Element()]));
  const controls = ['google', 'github'].map(provider => {
    const element = new Element();
    element.dataset.signIn = provider;
    return element;
  });
  const doc = {
    querySelector: selector => elements[selector.slice(1)],
    querySelectorAll: selector => selector === '[data-sign-in]' ? controls : []
  };
  const values = new Map([['centralia-projects', '[{"name":"Meu site","code":"<h1>Oi</h1>"}]']]);
  if (guest) values.set('centralia-guest-session', 'yes');
  const session = storage ?? {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: key => values.delete(key),
    clear: () => values.clear()
  };
  let next, fail;
  const signIns = [];
  let signOuts = 0;
  const client = {
    sessionOnly,
    observe(callback, error) { next = callback; fail = error; callback(initialUser); return () => {}; },
    signIn(provider) { signIns.push(provider); return Promise.resolve(); },
    signOut() { signOuts++; next(null); return Promise.resolve(); },
    ...clientOverride
  };
  const mounted = mountAuth({ document: doc, storage: session, loadTimeoutMs, signInTimeoutMs,
    loadClient: loadClient || (() => Promise.resolve(client)) });
  return { elements, controls, values, client, signIns, get signOuts() { return signOuts; },
    emitUser: user => next(user), emitError: error => fail(error), mounted, doc };
}

const settle = () => new Promise(resolve => setImmediate(resolve));
const waitForTimeout = () => new Promise(resolve => setTimeout(resolve, 50));
const user = { displayName: 'Matteo', email: 'matteo@example.test', providerData: [{ providerId: 'google.com' }] };

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function observerClient({ initial = true, initialUser = null } = {}) {
  let next, fail;
  let observed = 0, unsubscribed = 0;
  const calls = [];
  return {
    calls,
    get observed() { return observed; },
    get unsubscribed() { return unsubscribed; },
    observe(callback, error) {
      observed++;
      next = callback;
      fail = error;
      if (initial) callback(initialUser);
      return () => { unsubscribed++; };
    },
    emitUser(value) { next(value); },
    emitError(error) { fail(error); },
    signIn(provider) { calls.push(provider); return Promise.resolve(); },
    signOut() { next(null); return Promise.resolve(); }
  };
}

test('SDK failure keeps guest access, local projects, and retry available', async () => {
  const f = fixture({ loadClient: () => Promise.reject({ code: 'auth/network-request-failed' }) });
  await settle();
  assert.equal(f.elements['account-dialog'].open, true);
  assert.equal(f.elements['auth-retry'].hidden, false);
  assert.ok(f.controls.every(control => control.disabled));
  const projects = f.values.get('centralia-projects');
  await f.elements['auth-guest'].emit('click');
  assert.equal(f.elements['account-dialog'].open, false);
  assert.equal(f.values.get('centralia-projects'), projects);
  assert.equal(f.values.get('centralia-guest-session'), 'yes');
});

test('retry recovers from SDK failure and enables both providers', async () => {
  let attempts = 0;
  let f;
  f = fixture({ loadClient: () => ++attempts === 1 ? Promise.reject(new Error('offline')) : Promise.resolve(f.client) });
  await settle();
  await f.elements['auth-retry'].emit('click');
  assert.equal(attempts, 2);
  assert.equal(f.elements['auth-retry'].hidden, true);
  assert.ok(f.controls.every(control => !control.disabled));
});

test('sign-in calls popup synchronously and blocks competing clicks until settled', async () => {
  const f = fixture();
  await settle();
  let resolve;
  f.client.signIn = provider => { f.signIns.push(provider); return new Promise(done => { resolve = done; }); };
  const pending = f.controls[0].emit('click');
  assert.deepEqual(f.signIns, ['google']);
  assert.ok(f.controls.every(control => control.disabled));
  await f.controls[1].emit('click');
  assert.deepEqual(f.signIns, ['google']);
  f.emitUser(user);
  resolve();
  await pending;
  assert.equal(f.elements['account-dialog'].open, false);
  assert.equal(f.elements['account-button'].textContent, 'Matteo');
  assert.equal(f.elements['auth-email'].textContent, user.email);
  assert.equal(f.elements['auth-providers'].textContent, 'Google');
});

test('sign-out changes identity and preserves all existing local projects', async () => {
  const f = fixture({ initialUser: user });
  await settle();
  const projects = f.values.get('centralia-projects');
  await f.elements['account-button'].emit('click');
  assert.equal(f.elements['auth-signed-in'].hidden, false);
  await f.elements['auth-sign-out'].emit('click');
  assert.equal(f.signOuts, 1);
  assert.equal(f.elements['account-button'].textContent, 'Entrar');
  assert.equal(f.elements['auth-signed-in'].hidden, true);
  assert.equal(f.elements['auth-signed-out'].hidden, false);
  assert.equal(f.values.get('centralia-projects'), projects);
});

test('after sign-out completes Google can be selected immediately without reinitializing or delaying', async () => {
  let loads = 0;
  let f;
  f = fixture({ initialUser: user, loadClient: async () => { loads++; await Promise.resolve(); return f.client; } });
  await settle();
  const projects = f.values.get('centralia-projects');
  await f.elements['account-button'].emit('click');
  const signOut = deferred();
  f.client.signOut = () => signOut.promise.then(() => { f.emitUser(null); });
  const pendingSignOut = f.elements['auth-sign-out'].emit('click');
  assert.ok(f.controls.every(control => control.disabled));
  signOut.resolve();
  await pendingSignOut;
  assert.equal(f.elements['auth-signed-out'].hidden, false);
  assert.equal(f.controls[0].disabled, false);
  const pendingSignIn = f.controls[0].emit('click');
  assert.deepEqual(f.signIns, ['google']);
  assert.equal(loads, 1);
  assert.equal(f.values.get('centralia-projects'), projects);
  await pendingSignIn;
  f.mounted.destroy();
});

test('restored account is displayed as text even with hostile profile strings or missing email', async () => {
  const name = '<img src=x onerror=alert(1)>';
  const f = fixture({ initialUser: { displayName: name, providerData: [{ providerId: 'github.com' }] } });
  await settle();
  assert.equal(f.elements['auth-name'].textContent, name);
  assert.equal(f.elements['account-button'].textContent, name);
  assert.match(f.elements['auth-email'].textContent, /não informou/);
  assert.equal(f.elements['auth-providers'].textContent, 'GitHub');
  assert.equal(f.elements['account-dialog'].open, false);
});

test('cancelled popup and configuration failures leave retryable sign-in controls', async () => {
  const f = fixture();
  await settle();
  for (const code of ['auth/popup-closed-by-user', 'auth/unauthorized-domain', 'auth/operation-not-allowed']) {
    f.client.signIn = () => Promise.reject({ code });
    await f.controls[1].emit('click');
    assert.equal(f.elements['auth-status'].textContent, authErrorMessage({ code }));
    assert.ok(f.controls.every(control => !control.disabled));
    assert.equal(f.elements['account-dialog'].open, true);
  }
});

test('guest preference skips initial screen while account button remains usable', async () => {
  const f = fixture({ guest: true });
  await settle();
  assert.equal(f.elements['account-dialog'].open, false);
  await f.elements['account-button'].emit('click');
  assert.equal(f.elements['account-dialog'].open, true);
});

test('restricted session storage methods do not block guest access', async () => {
  const f = fixture({ storage: {
    getItem() { throw new Error('SecurityError'); },
    setItem() { throw new Error('SecurityError'); }
  } });
  await settle();
  await f.elements['auth-guest'].emit('click');
  assert.equal(f.elements['account-dialog'].open, false);
});

test('browser throwing on sessionStorage property access does not break initialization', async () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage');
  Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, get() { throw new Error('SecurityError'); } });
  try {
    const f = fixture();
    assert.doesNotThrow(() => mountAuth({ document: f.doc, loadClient: () => Promise.reject(new Error('offline')) }));
    await settle();
  } finally {
    if (original) Object.defineProperty(globalThis, 'sessionStorage', original);
    else delete globalThis.sessionStorage;
  }
});

test('session-only persistence is communicated and observer failure permits retry', async () => {
  const f = fixture({ sessionOnly: true });
  await settle();
  assert.equal(f.elements['auth-persistence'].hidden, false);
  f.emitError({ code: 'auth/network-request-failed' });
  assert.equal(f.elements['auth-retry'].hidden, false);
  assert.ok(f.controls.every(control => control.disabled));
});

test('stalled SDK initialization times out and retry recovers without losing projects or opening a popup', async () => {
  const stalled = deferred();
  let attempts = 0;
  let f;
  f = fixture({ loadTimeoutMs: 15,
    loadClient: () => ++attempts === 1 ? stalled.promise : Promise.resolve(f.client) });
  const projects = f.values.get('centralia-projects');
  assert.ok(f.controls.every(control => control.disabled));
  await waitForTimeout();
  assert.equal(f.elements['auth-retry'].hidden, false);
  assert.equal(f.elements['account-dialog'].attributes.get('aria-busy'), 'false');
  assert.match(f.elements['auth-status'].textContent, /demor|tempo|conex|carreg|indispon|respon/i);
  assert.deepEqual(f.signIns, []);
  await f.elements['auth-retry'].emit('click');
  await settle();
  assert.equal(attempts, 2);
  assert.ok(f.controls.every(control => !control.disabled));
  assert.equal(f.values.get('centralia-projects'), projects);
  assert.deepEqual(f.signIns, []);
  const click = f.controls[0].emit('click');
  assert.deepEqual(f.signIns, ['google']);
  await click;
  f.mounted.destroy();
});

test('waiting for first account update is covered by timeout and unsubscribes the stalled observer', async () => {
  const client = observerClient({ initial: false });
  const f = fixture({ loadTimeoutMs: 15, loadClient: () => Promise.resolve(client) });
  await settle();
  assert.equal(client.observed, 1);
  assert.ok(f.controls.every(control => control.disabled));
  await waitForTimeout();
  assert.equal(f.elements['auth-retry'].hidden, false);
  assert.equal(client.unsubscribed, 1);
  assert.deepEqual(client.calls, []);
  await f.elements['auth-guest'].emit('click');
  assert.equal(f.elements['account-dialog'].open, false);
  f.mounted.destroy();
});

test('late SDK result from a timed-out attempt cannot replace the successful retry', async () => {
  const oldLoad = deferred();
  const oldClient = observerClient({ initialUser: { ...user, displayName: 'Conta antiga' } });
  const currentClient = observerClient({ initialUser: user });
  let attempts = 0;
  const f = fixture({ loadTimeoutMs: 15,
    loadClient: () => ++attempts === 1 ? oldLoad.promise : Promise.resolve(currentClient) });
  await waitForTimeout();
  await f.elements['auth-retry'].emit('click');
  await settle();
  assert.equal(f.elements['account-button'].textContent, 'Matteo');
  oldLoad.resolve(oldClient);
  await settle();
  assert.equal(oldClient.observed, 0);
  assert.equal(f.elements['account-button'].textContent, 'Matteo');
  assert.equal(currentClient.unsubscribed, 0);
  f.mounted.destroy();
});

test('late SDK rejection from an expired attempt cannot disable a successful retry', async () => {
  const oldLoad = deferred();
  const currentClient = observerClient({ initialUser: user });
  let attempts = 0;
  const f = fixture({ loadTimeoutMs: 15,
    loadClient: () => ++attempts === 1 ? oldLoad.promise : Promise.resolve(currentClient) });
  await waitForTimeout();
  await f.elements['auth-retry'].emit('click');
  await settle();
  oldLoad.reject({ code: 'auth/network-request-failed' });
  await settle();
  assert.equal(f.elements['account-button'].textContent, 'Matteo');
  assert.equal(f.elements['auth-retry'].hidden, true);
  assert.ok(f.controls.every(control => !control.disabled));
  assert.equal(currentClient.unsubscribed, 0);
  f.mounted.destroy();
});

test('late callbacks from an expired observer cannot change or disable a recovered account', async () => {
  const staleClient = observerClient({ initial: false });
  const currentClient = observerClient({ initialUser: user });
  let attempts = 0;
  const f = fixture({ loadTimeoutMs: 15,
    loadClient: () => Promise.resolve(++attempts === 1 ? staleClient : currentClient) });
  await waitForTimeout();
  assert.equal(staleClient.unsubscribed, 1);
  await f.elements['auth-retry'].emit('click');
  await settle();
  staleClient.emitUser({ ...user, displayName: 'Conta antiga' });
  staleClient.emitError({ code: 'auth/network-request-failed' });
  assert.equal(f.elements['account-button'].textContent, 'Matteo');
  assert.equal(f.elements['auth-retry'].hidden, true);
  assert.ok(f.controls.every(control => !control.disabled));
  assert.equal(currentClient.unsubscribed, 0);
  assert.deepEqual(currentClient.calls, []);
  f.mounted.destroy();
});

test('successful observer clears timeout so ready buttons stay usable after its deadline', async () => {
  const f = fixture({ loadTimeoutMs: 15 });
  await settle();
  assert.ok(f.controls.every(control => !control.disabled));
  await waitForTimeout();
  assert.ok(f.controls.every(control => !control.disabled));
  assert.equal(f.elements['auth-retry'].hidden, true);
  assert.deepEqual(f.signIns, []);
  f.mounted.destroy();
});

test('destroy cancels loading and prevents late SDK completion from observing an abandoned screen', async () => {
  const pending = deferred();
  const client = observerClient();
  const f = fixture({ loadTimeoutMs: 15, loadClient: () => pending.promise });
  f.mounted.destroy();
  pending.resolve(client);
  await settle();
  await waitForTimeout();
  assert.equal(client.observed, 0);
  assert.deepEqual(client.calls, []);
});

test('GitHub popup rejection remains visible, gets attention, and permits another provider', async () => {
  const f = fixture();
  await settle();
  f.client.signIn = () => Promise.reject({ code: 'auth/account-exists-with-different-credential' });
  await f.controls[1].emit('click');
  await settle();
  const status = f.elements['auth-status'];
  assert.match(status.textContent, /outro|anterior/i);
  assert.equal(status.hidden, false);
  assert.equal(status.getAttribute('role'), 'alert');
  assert.equal(f.elements['account-dialog'].open, true);
  assert.ok(status.focusCalls.length > 0, 'Error should receive keyboard/screen reader focus.');
  assert.ok(status.scrollCalls.length > 0, 'Error should scroll into view on the small screen.');
  assert.ok(f.controls.every(control => !control.disabled));
  f.mounted.destroy();
});

test('signed-out account update after popup failure preserves visible error and diagnostic', async () => {
  const f = fixture();
  await settle();
  f.client.signIn = () => Promise.reject({ code: 'auth/account-exists-with-different-credential' });
  await f.controls[1].emit('click');
  const status = f.elements['auth-status'].textContent;
  const diagnostic = f.elements['auth-diagnostic'].textContent;
  f.emitUser(null);
  assert.equal(f.elements['auth-status'].textContent, status);
  assert.equal(f.elements['auth-status'].getAttribute('role'), 'alert');
  assert.equal(f.elements['auth-diagnostic'].textContent, diagnostic);
  assert.equal(f.elements['auth-diagnostic'].hidden, false);
  assert.equal(f.elements['account-dialog'].open, true);
  assert.ok(f.controls.every(control => !control.disabled));
  f.mounted.destroy();
});

test('failure feedback exposes only safe provider/code details and never raw credential data', async () => {
  const f = fixture();
  await settle();
  const privateValues = ['private-user@example.test', 'canary-access-token', 'canary-refresh-token', 'canary-oauth-secret'];
  const rawMessage = privateValues.join(' ');
  f.client.signIn = () => Promise.reject({
    code: 'auth/invalid-credential', message: rawMessage,
    customData: { email: privateValues[0], _tokenResponse: {
      oauthAccessToken: privateValues[1], refreshToken: privateValues[2], oauthTokenSecret: privateValues[3]
    } }
  });
  await f.controls[1].emit('click');
  const displayed = Object.values(f.elements).map(element => element.textContent).join('\n');
  for (const value of privateValues) assert.equal(displayed.includes(value), false);
  const feedback = [f.elements['auth-status'].textContent, f.elements['auth-diagnostic'].textContent].join('\n');
  assert.match(feedback, /GitHub/);
  assert.match(feedback, /invalid-credential/);
  f.mounted.destroy();
});

test('unknown or malformed error codes are normalized without displaying attacker-controlled text', async () => {
  const f = fixture();
  await settle();
  const canary = 'private-user@example.test-canary-secret';
  for (const code of [`auth/${canary}`, '<img src=x onerror=canary-secret>', { toString() { throw new Error('unsafe coercion'); } }]) {
    f.client.signIn = () => Promise.reject({ code, message: canary });
    await f.controls[1].emit('click');
    const displayed = Object.values(f.elements).map(element => element.textContent).join('\n');
    assert.equal(displayed.includes(canary), false);
    assert.equal(displayed.includes('onerror'), false);
    assert.ok(f.controls.every(control => !control.disabled));
  }
  f.mounted.destroy();
});

test('stalled popup times out, unlocks choices and preserves projects without retrying automatically', async () => {
  const pending = deferred();
  let loads = 0;
  let f;
  f = fixture({ signInTimeoutMs: 15,
    loadClient: async () => { loads++; await Promise.resolve(); return f.client; } });
  await settle();
  const projects = f.values.get('centralia-projects');
  f.client.signIn = provider => { f.signIns.push(provider); return pending.promise; };
  // Deliberately leave the popup promise unresolved, as a blocked return path can.
  f.controls[1].emit('click');
  assert.deepEqual(f.signIns, ['github']);
  assert.ok(f.controls.every(control => control.disabled));
  await waitForTimeout();
  assert.ok(f.controls.every(control => !control.disabled));
  assert.equal(f.elements['account-dialog'].attributes.get('aria-busy'), 'false');
  assert.match(f.elements['auth-status'].textContent, /demor|tempo|tente|novamente|conclu/i);
  assert.equal(f.elements['account-dialog'].open, true);
  assert.deepEqual(f.signIns, ['github']);
  assert.equal(loads, 1);
  assert.equal(f.values.get('centralia-projects'), projects);
  await f.elements['auth-guest'].emit('click');
  assert.equal(f.elements['account-dialog'].open, false);
  f.mounted.destroy();
});

test('late rejection from timed-out popup cannot overwrite successful retry or disable its controls', async () => {
  const oldPopup = deferred();
  const f = fixture({ signInTimeoutMs: 15 });
  await settle();
  let calls = 0;
  f.client.signIn = () => ++calls === 1 ? oldPopup.promise : Promise.resolve({ user });
  f.controls[1].emit('click');
  await waitForTimeout();
  assert.ok(f.controls.every(control => !control.disabled));
  await f.controls[0].emit('click');
  f.emitUser(user);
  const status = f.elements['auth-status'].textContent;
  oldPopup.reject({ code: 'auth/invalid-credential', message: 'canary-old-secret' });
  await settle();
  assert.equal(f.elements['account-button'].textContent, 'Matteo');
  assert.equal(f.elements['account-dialog'].open, false);
  assert.equal(f.elements['auth-status'].textContent, status);
  assert.ok(f.controls.every(control => !control.disabled));
  assert.equal(calls, 2);
  f.mounted.destroy();
});

test('completed popup clears its deadline and cannot later replace a successful account with timeout', async () => {
  const f = fixture({ signInTimeoutMs: 15 });
  await settle();
  await f.controls[1].emit('click');
  f.emitUser({ ...user, providerData: [{ providerId: 'github.com' }] });
  const status = f.elements['auth-status'].textContent;
  await waitForTimeout();
  assert.equal(f.elements['auth-status'].textContent, status);
  assert.equal(f.elements['account-dialog'].open, false);
  assert.equal(f.elements['auth-providers'].textContent, 'GitHub');
  assert.ok(f.controls.every(control => !control.disabled));
  f.mounted.destroy();
});

test('successful GitHub credential displays account even before observer updates and clears popup deadline', async () => {
  const f = fixture({ signInTimeoutMs: 15 });
  await settle();
  const projects = f.values.get('centralia-projects');
  const githubUser = { displayName: 'Matteo GitHub', email: null,
    providerData: [{ providerId: 'github.com' }] };
  f.client.signIn = provider => {
    assert.equal(provider, 'github');
    return Promise.resolve({ user: githubUser, providerId: 'github.com' });
  };
  await f.controls[1].emit('click');
  // No emitUser call: the observer still has its initial signed-out state.
  assert.equal(f.elements['account-dialog'].open, false);
  assert.equal(f.elements['account-button'].textContent, githubUser.displayName);
  assert.equal(f.elements['auth-name'].textContent, githubUser.displayName);
  assert.equal(f.elements['auth-providers'].textContent, 'GitHub');
  assert.equal(f.elements['auth-signed-in'].hidden, false);
  assert.equal(f.elements['auth-status'].getAttribute('data-error'), 'false');
  const status = f.elements['auth-status'].textContent;
  await waitForTimeout();
  assert.equal(f.elements['auth-status'].textContent, status);
  assert.equal(f.elements['account-dialog'].open, false);
  assert.equal(f.values.get('centralia-projects'), projects);
  assert.ok(f.controls.every(control => !control.disabled));
  f.mounted.destroy();
});
