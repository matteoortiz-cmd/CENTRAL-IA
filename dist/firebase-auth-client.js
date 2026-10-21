import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js';
import {
  initializeAuth, setPersistence, browserLocalPersistence, browserSessionPersistence,
  browserPopupRedirectResolver, GoogleAuthProvider, GithubAuthProvider,
  signInWithPopup, onAuthStateChanged, signOut
} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';

export async function createAuthClient() {
  // Não carregar a janela auxiliar de OAuth ao iniciar no celular: ela pode
  // impedir o primeiro estado de autenticação se o navegador bloquear o iframe.
  const auth = initializeAuth(initializeApp(firebaseConfig), {
    persistence: [browserLocalPersistence, browserSessionPersistence]
  });
  auth.languageCode = 'pt-BR';
  let sessionOnly = false;
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch {
    await setPersistence(auth, browserSessionPersistence);
    sessionOnly = true;
  }
  return {
    sessionOnly,
    observe: (next, error) => onAuthStateChanged(auth, next, error),
    signIn(provider) {
      const selected = provider === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
      if (provider === 'google') selected.setCustomParameters({ prompt: 'select_account' });
      // Somente identificação. Não solicitar acesso ao Drive ou aos repositórios.
      return signInWithPopup(auth, selected, browserPopupRedirectResolver);
    },
    signOut: () => signOut(auth)
  };
}
