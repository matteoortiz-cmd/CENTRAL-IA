# Login do Central IA com Firebase

O cliente do site usa Firebase Authentication com Google e GitHub. A tela inicial permite entrar, ver a conta conectada, sair ou continuar sem login. As senhas são digitadas nas páginas dos provedores. O site não solicita acesso ao Drive ou aos repositórios e não guarda tokens OAuth do GitHub para outras operações.

## Estado verificado em 21 de outubro de 2026

O domínio atual está autorizado, e os provedores Google e GitHub geram URLs de autorização corretamente. O usuário confirmou que o login funciona no computador. As etapas abaixo ficam como referência de configuração.

## Configuração no console

1. Abra o projeto **Central IA** no [console Firebase](https://console.firebase.google.com/).
2. Em **Authentication → Configurações → Domínios autorizados**, adicione somente:

   ```text
   central-ia-lab.jazzy-corgi-7876.chatgpt.site
   ```

   Sem `https://`, sem `#` e sem barras. A consulta de 21 de outubro confirmou esse domínio na lista. Não remova os domínios Firebase existentes.
3. Em **Authentication → Método de login**, confirme que **Google** está habilitado, com o nome público e o e-mail de suporte preenchidos.
4. Para **GitHub**, habilite o provedor e preencha o Client ID e o Client Secret do aplicativo OAuth no próprio console Firebase. Não coloque o segredo no código do site nem o envie no chat.
5. No aplicativo OAuth do GitHub, use a página inicial do Central IA e este **Authorization callback URL**, que também aparece no formulário do Firebase:

   ```text
   https://centralai-fbf14.firebaseapp.com/__/auth/handler
   ```

6. Salve as configurações de ambos os lados. Atualize o site e teste uma entrada com cada provedor. O login GitHub, sozinho, não autoriza gravação de arquivos em repositórios.

## Teste no VS Code e no celular

- Inicie o servidor com `npm start`; não abra o HTML com dois cliques.
- Para o endereço local incluído no projeto, autorize **127.0.0.1** no Firebase. Se preferir usar `localhost`, esse nome precisa estar autorizado também. A lista consultada já continha `localhost`, mas não `127.0.0.1`.
- O login exige internet e permissão para abrir a janela do provedor. Se o navegador bloquear a janela, permita pop-ups para o site e clique novamente. No Android, também é possível abrir o endereço do Central IA diretamente no navegador.
- O fluxo usa pop-up, sem redirecionamento automático: o site atual e o domínio de autenticação Firebase são diferentes. Antes de mudar para redirecionamento, revise os requisitos oficiais sobre armazenamento entre origens.
- Ao testar, confirme que a conta aparece no botão superior, atualize a página e veja se a sessão foi mantida; depois saia e confirme que os projetos locais continuam disponíveis.
- Os testes automatizados verificam a interface e o cliente com dependências simuladas, inclusive carregamento travado, recuperação e troca de conta. Eles não substituem um teste no aparelho Android.

## Carregamento e troca de conta no celular

A inicialização usa `initializeAuth` com persistência local/sessão, sem preparar a janela auxiliar de OAuth antes do clique. No SDK Firebase, preparar essa janela automaticamente no celular pode atrasar o primeiro estado da conta e deixar os botões desativados. O resolvedor de pop-up é fornecido explicitamente ao clicar para entrar.

O carregamento inicial possui um limite de 15 segundos, incluindo a primeira atualização de conta. Em caso de demora, a interface mostra uma mensagem e permite tentar novamente ou continuar sem login. Respostas de tentativas antigas são ignoradas. Esse limite é uma recuperação de falha; não é uma espera adicionada ao login ou à saída.

Sair da conta não recria o cliente, não apaga os projetos e não acrescenta espera fixa. As opções Google e GitHub são liberadas assim que o Firebase confirma a saída. O objetivo é uma troca imediata, mas o tempo real precisa ser medido no aparelho do usuário. A nova correção ainda requer essa confirmação no Android.

## O que o login não faz nesta etapa

O salvamento continua no `localStorage` do navegador, sem banco de dados nem sincronização em nuvem. Todos que usam o mesmo perfil do navegador podem acessar a mesma lista de projetos. Sair da conta não apaga essa lista e não a torna privada. Exporte um ZIP antes de limpar os dados do navegador ou trocar de aparelho.

Acesso ao Drive, gravação de repositórios e conexão com contas de IA são integrações separadas. A tela de login não concede esses acessos. Não foram implementadas coleta de senha, solicitação de permissão `repo`, permissões Drive ou vinculação automática de contas com o mesmo e-mail.

## Arquivos e configuração

- `dist/firebase-config.js`: configuração pública web fornecida pelo proprietário; não é uma credencial administrativa. Proteja recursos futuros com regras de autorização adequadas no Firebase.
- `dist/firebase-auth-client.js`: SDK modular, persistência, Google/GitHub e saída. Usa o SDK oficial carregado da CDN; não inicializa Analytics.
- `dist/auth-ui.js`: tela de conta, acesso sem login e mensagens de erro. A indisponibilidade do SDK não impede o uso do laboratório.

## Referências oficiais

- [Login com Google](https://firebase.google.com/docs/auth/web/google-signin)
- [Login com GitHub](https://firebase.google.com/docs/auth/web/github-auth)
- [Persistência da sessão](https://firebase.google.com/docs/auth/web/auth-state-persistence)
- [Cuidados com redirecionamento e armazenamento](https://firebase.google.com/docs/auth/web/redirect-best-practices)
- [SDK via CDN](https://firebase.google.com/docs/web/alt-setup)
