const providerNames = { 'google.com': 'Google', 'github.com': 'GitHub' };

export function authErrorMessage(error) {
  switch (error?.code) {
    case 'auth/unauthorized-domain':
      return 'Este endereço ainda precisa ser autorizado no Firebase. Em Authentication → Configurações → Domínios autorizados, adicione o endereço deste site, sem https e sem barras.';
    case 'auth/operation-not-allowed':
      return 'Este provedor de login ainda precisa ser habilitado em Authentication → Método de login, no Firebase.';
    case 'auth/popup-blocked':
      return 'O navegador bloqueou a janela de login. Permita pop-ups para este site e tente novamente. No celular, você também pode abrir o Central IA diretamente no navegador.';
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Login cancelado. Você pode tentar novamente ou continuar sem entrar.';
    case 'auth/account-exists-with-different-credential':
      return 'Este e-mail já usa outro método de login. Entre com o provedor usado anteriormente; as contas não são vinculadas automaticamente.';
    case 'auth/network-request-failed':
      return 'Não foi possível conectar ao login. Confira sua internet e tente novamente.';
    case 'centralia/login-timeout':
      return 'O login demorou para carregar. Confira sua conexão e toque em “Tentar conectar novamente”. Você também pode continuar sem entrar.';
    case 'auth/web-storage-unsupported':
      return 'O navegador bloqueou o armazenamento necessário ao login. Permita os dados do site ou use outro navegador.';
    case 'auth/invalid-api-key':
    case 'auth/app-not-authorized':
    case 'auth/invalid-oauth-client-id':
    case 'auth/invalid-credential':
    case 'auth/configuration-not-found':
      return 'A configuração deste login precisa ser revisada no Firebase. Você pode continuar sem entrar enquanto isso.';
    case 'auth/user-disabled':
      return 'O acesso desta conta foi desativado. Entre em contato com o responsável pelo Central IA.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas de login. Aguarde um pouco e tente novamente.';
    default:
      return 'O login está indisponível agora. Tente novamente ou continue sem entrar; seus projetos locais continuam disponíveis.';
  }
}

export function mountAuth({ document: doc = document, storage,
  loadClient = () => import('./firebase-auth-client.js').then(module => module.createAuthClient()),
  loadTimeoutMs = 15000 } = {}) {
  const dialog = doc.querySelector('#account-dialog');
  if (!dialog) return;
  const get = selector => doc.querySelector(selector);
  const controls = [...doc.querySelectorAll('[data-sign-in]')];
  const status = get('#auth-status');
  const accountButton = get('#account-button');
  const guestButton = get('#auth-guest');
  const retryButton = get('#auth-retry');
  const signOutButton = get('#auth-sign-out');
  let client, user = null, busy = false, ready = false, disposed = false, unsubscribe;
  let generation = 0, loadTimer;
  let guestChosen = false;
  try {
    if (storage === undefined) storage = globalThis.sessionStorage;
    guestChosen = storage?.getItem('centralia-guest-session') === 'yes';
  } catch { storage = null; /* guest still works */ }

  function message(value) { status.textContent = value; }
  function clearLoadTimer() { clearTimeout(loadTimer); loadTimer = undefined; }
  function failedAttempt(error, attempt) {
    if (disposed || attempt !== generation) return;
    generation++;
    clearLoadTimer();
    unsubscribe?.();
    unsubscribe = undefined;
    ready = false;
    busy = false;
    message(authErrorMessage(error));
    render();
  }
  function close() { if (dialog.open) dialog.close(); }
  function open() { if (!dialog.open) dialog.showModal(); }
  function chooseGuest() {
    guestChosen = true;
    try { storage?.setItem('centralia-guest-session', 'yes'); } catch { /* optional preference */ }
    close();
  }
  function render() {
    accountButton.textContent = user ? (user.displayName || user.email || 'Minha conta') : 'Entrar';
    accountButton.setAttribute('aria-label', user ? 'Abrir minha conta' : 'Entrar no Central IA');
    get('#auth-signed-out').hidden = !!user;
    get('#auth-signed-in').hidden = !user;
    get('#account-title').textContent = user ? 'Sua conta no Central IA' : 'Suas ideias começam aqui.';
    get('#auth-name').textContent = user?.displayName || 'Conta conectada';
    get('#auth-email').textContent = user?.email || 'Este provedor não informou um e-mail.';
    get('#auth-providers').textContent = [...new Set((user?.providerData || []).map(item => providerNames[item.providerId]).filter(Boolean))].join(' · ') || 'Conta Firebase';
    controls.forEach(button => { button.disabled = busy || !ready; });
    signOutButton.disabled = busy || !ready;
    retryButton.hidden = ready || busy;
    guestButton.textContent = user ? 'Voltar ao Central IA' : 'Continuar sem entrar';
    dialog.setAttribute('aria-busy', busy ? 'true' : 'false');
  }
  async function connect() {
    if (busy || disposed) return;
    const attempt = ++generation;
    clearLoadTimer();
    unsubscribe?.();
    unsubscribe = undefined;
    ready = false;
    busy = true;
    message('Preparando o login… Você já pode continuar sem entrar.');
    render();
    loadTimer = setTimeout(() => failedAttempt({ code: 'centralia/login-timeout' }, attempt), loadTimeoutMs);
    try {
      const loaded = await loadClient();
      if (disposed || attempt !== generation) return;
      client = loaded;
      const stopObserving = client.observe(current => {
        if (disposed || attempt !== generation) return;
        clearLoadTimer();
        user = current;
        ready = true;
        busy = false;
        message(user ? 'Conta conectada. Seus projetos continuam salvos neste navegador.' : 'Escolha sua conta para entrar no Central IA.');
        get('#auth-persistence').hidden = !client.sessionOnly;
        render();
        if (user) close();
      }, error => {
        failedAttempt(error, attempt);
      });
      if (disposed || attempt !== generation) stopObserving?.();
      else unsubscribe = stopObserving;
    } catch (error) {
      failedAttempt(error, attempt);
    }
  }
  controls.forEach(button => button.addEventListener('click', async () => {
    if (busy || !ready) return;
    busy = true;
    message('Conclua o login na janela do provedor.');
    render();
    try {
      // Invocar no clique, antes de qualquer await, para preservar a abertura do pop-up.
      await client.signIn(button.dataset.signIn);
    } catch (error) {
      message(authErrorMessage(error));
    } finally {
      busy = false;
      render();
    }
  }));
  signOutButton.addEventListener('click', async () => {
    if (busy || !ready) return;
    busy = true;
    message('Saindo da conta…');
    render();
    try {
      await client.signOut();
      message('Você saiu da conta. Os projetos deste navegador continuam disponíveis.');
    } catch (error) { message(authErrorMessage(error)); }
    finally { busy = false; render(); }
  });
  accountButton.addEventListener('click', open);
  guestButton.addEventListener('click', chooseGuest);
  retryButton.addEventListener('click', connect);
  dialog.addEventListener('cancel', () => {
    guestChosen = true;
    try { storage?.setItem('centralia-guest-session', 'yes'); } catch { /* optional preference */ }
  });
  render();
  if (!guestChosen) open();
  connect();
  return { destroy() { disposed = true; generation++; clearLoadTimer(); unsubscribe?.(); } };
}

if (typeof document !== 'undefined') mountAuth();
