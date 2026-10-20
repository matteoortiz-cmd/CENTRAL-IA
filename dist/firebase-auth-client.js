import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js';
import {
  getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence,
  GoogleAuthProvider, GithubAuthProvider, signInWithPopup, onAuthStateChanged, signOut
} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';

export async function createAuthClient() {
  const auth = getAuth(initializeApp(firebaseConfig));
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
      return signInWithPopup(auth, selected);
    },
    signOut: () => signOut(auth)
  };
}
