import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Load the product adapter unchanged except for its external imports. SDK doubles
// record its public calls; no Firebase account, network or browser is involved.
const productSource = await readFile(new URL('../dist/firebase-auth-client.js', import.meta.url), 'utf8');
let serial = 0;
const asModule = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const sdkFixture = `
export const state = {
  initializeApp: [], initializeAuth: [], persistence: [], popups: [], observers: [], signOuts: [],
  failLocal: false, failSession: false, unsubscribed: 0
};
export const browserLocalPersistence = Symbol('local');
export const browserSessionPersistence = Symbol('session');
export const browserPopupRedirectResolver = Symbol('popup resolver');
export const app = {};
export const auth = {};
export function initializeApp(config) { state.initializeApp.push(config); return app; }
export function initializeAuth(selectedApp, dependencies) {
  state.initializeAuth.push([selectedApp, dependencies]);
  return auth;
}
export function setPersistence(selectedAuth, persistence) {
  state.persistence.push([selectedAuth, persistence]);
  if ((persistence === browserLocalPersistence && state.failLocal) ||
      (persistence === browserSessionPersistence && state.failSession)) {
    return Promise.reject(Object.assign(new Error('storage blocked'), { code: 'auth/web-storage-unsupported' }));
  }
  return Promise.resolve();
}
export class GoogleAuthProvider {
  scopes = [];
  customParameters = {};
  setCustomParameters(value) { this.customParameters = value; }
  addScope(scope) { this.scopes.push(scope); }
}
export class GithubAuthProvider {
  scopes = [];
  addScope(scope) { this.scopes.push(scope); }
}
export function signInWithPopup(selectedAuth, provider, resolver) {
  state.popups.push([selectedAuth, provider, resolver]);
  return Promise.resolve({ user: { displayName: 'Matteo' } });
}
export function onAuthStateChanged(selectedAuth, next, error) {
  state.observers.push([selectedAuth, next, error]);
  return () => { state.unsubscribed++; };
}
export function signOut(selectedAuth) { state.signOuts.push(selectedAuth); return Promise.resolve(); }
`;

async function fixture() {
  const sdkUrl = asModule(`${sdkFixture}\n// fixture ${serial++}`);
  const sdk = await import(sdkUrl);
  const configUrl = asModule('export const firebaseConfig = { projectId: "test-project" };');
  const source = productSource
    .replace(/(['"])https:\/\/www\.gstatic\.com\/firebasejs\/[^'\"]+\1/g, JSON.stringify(sdkUrl))
    .replace(/(['"])\.\/firebase-config\.js\1/, JSON.stringify(configUrl));
  const module = await import(asModule(source));
  return { ...sdk, createAuthClient: module.createAuthClient };
}

test('startup omits popup resolver and IndexedDB while preserving ordered browser storage', async () => {
  const f = await fixture();
  const client = await f.createAuthClient();
  assert.equal(f.state.initializeApp.length, 1);
  assert.equal(f.state.initializeAuth.length, 1);
  const [app, dependencies] = f.state.initializeAuth[0];
  assert.equal(app, f.app);
  assert.deepEqual(Object.keys(dependencies), ['persistence']);
  assert.deepEqual(dependencies.persistence, [f.browserLocalPersistence, f.browserSessionPersistence]);
  assert.deepEqual(f.state.persistence, [[f.auth, f.browserLocalPersistence]]);
  assert.deepEqual(f.state.popups, []);
  assert.equal(f.auth.languageCode, 'pt-BR');
  assert.equal(client.sessionOnly, false);
});

test('provider selection supplies popup resolver only on explicit sign-in, without Drive or repo scopes', async () => {
  const f = await fixture();
  const client = await f.createAuthClient();
  assert.equal(f.state.popups.length, 0);
  const googleResult = client.signIn('google');
  assert.equal(f.state.popups.length, 1);
  const [auth, provider, resolver] = f.state.popups[0];
  assert.equal(auth, f.auth);
  assert.ok(provider instanceof f.GoogleAuthProvider);
  assert.deepEqual(provider.customParameters, { prompt: 'select_account' });
  assert.deepEqual(provider.scopes, []);
  assert.equal(resolver, f.browserPopupRedirectResolver);
  await googleResult;
  await client.signIn('github');
  const github = f.state.popups[1];
  assert.ok(github[1] instanceof f.GithubAuthProvider);
  assert.deepEqual(github[1].scopes, []);
  assert.equal(github[2], f.browserPopupRedirectResolver);
});

test('blocked local storage falls back to session and reports that persistence choice', async () => {
  const f = await fixture();
  f.state.failLocal = true;
  const client = await f.createAuthClient();
  assert.equal(client.sessionOnly, true);
  assert.deepEqual(f.state.persistence, [
    [f.auth, f.browserLocalPersistence], [f.auth, f.browserSessionPersistence]
  ]);
  assert.deepEqual(f.state.popups, []);
});

test('unavailable local and session storage rejects cleanly for UI retry or guest fallback', async () => {
  const f = await fixture();
  f.state.failLocal = f.state.failSession = true;
  await assert.rejects(f.createAuthClient(), { code: 'auth/web-storage-unsupported' });
  assert.equal(f.state.persistence.length, 2);
  assert.deepEqual(f.state.popups, []);
});

test('observer, sign-out and subsequent sign-in reuse initialized authentication', async () => {
  const f = await fixture();
  const client = await f.createAuthClient();
  const next = () => {};
  const error = () => {};
  const unsubscribe = client.observe(next, error);
  assert.deepEqual(f.state.observers, [[f.auth, next, error]]);
  await client.signOut();
  const pending = client.signIn('google');
  assert.equal(f.state.popups.length, 1);
  assert.deepEqual(f.state.signOuts, [f.auth]);
  assert.equal(f.state.initializeApp.length, 1);
  assert.equal(f.state.initializeAuth.length, 1);
  assert.equal(f.state.persistence.length, 1);
  unsubscribe();
  assert.equal(f.state.unsubscribed, 1);
  await pending;
});
