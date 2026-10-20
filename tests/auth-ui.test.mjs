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
  setAttribute(name, value) { this.attributes.set(name, value); }
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

function fixture({ initialUser = null, guest = false, sessionOnly = false, loadClient, storage } = {}) {
  const ids = ['account-dialog', 'auth-status', 'account-button', 'auth-guest', 'auth-retry',
    'auth-sign-out', 'auth-signed-out', 'auth-signed-in', 'account-title', 'auth-name',
    'auth-email', 'auth-providers', 'auth-persistence'];
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
    signOut() { signOuts++; next(null); return Promise.resolve(); }
  };
  const mounted = mountAuth({ document: doc, storage: session, loadClient: loadClient || (() => Promise.resolve(client)) });
  return { elements, controls, values, client, signIns, get signOuts() { return signOuts; },
    emitUser: user => next(user), emitError: error => fail(error), mounted, doc };
}

const settle = () => new Promise(resolve => setImmediate(resolve));
const user = { displayName: 'Matteo', email: 'matteo@example.test', providerData: [{ providerId: 'google.com' }] };

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
