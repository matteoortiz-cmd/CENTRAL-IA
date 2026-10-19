# Central IA — resumo para retomar

Atualizado em 14 de outubro de 2026.

## Endereços

- Site: https://central-ia-lab.jazzy-corgi-7876.chatgpt.site
- Catálogo de linguagens: https://central-ia-lab.jazzy-corgi-7876.chatgpt.site/#linguagens
- Página Android: https://central-ia-lab.jazzy-corgi-7876.chatgpt.site/android.html
- APK azul: https://central-ia-lab.jazzy-corgi-7876.chatgpt.site/downloads/central-ia-azul-0.2.apk

## O que está publicado

- Visual com azul, branco, preto e cinza.
- Logo web com a mesma estrela branca pontuda sobre fundo azul do APK.
- APK de teste com tela inicial, ícone e destaques na nova paleta. Ele abre a versão web em uma janela do navegador; precisa de internet e navegador instalado.
- Laboratório com abas HTML, CSS, JavaScript e JSON. JSON é opcional, tem validação, é salvo junto ao projeto e entra na exportação como data.json quando preenchido.
- Prévia isolada do site criado no Lab.
- Revisão manual com IA: o Central IA monta um pedido a partir dos arquivos e do problema informado. A pessoa copia, envia à IA escolhida e traz as correções para as abas. Não há chamada automática a uma IA nem IA embutida.
- Aba Linguagens de Programação entre Ferramentas & tutoriais e Meus projetos.
- Cards de Python, JavaScript, TypeScript, Java, C, C++, C#, PHP, Go, Rust, Ruby, Kotlin, Swift, Dart, R, SQL, Bash e Lua. HTML, CSS e JSON aparecem separadamente como fundamentos.
- Cada card contém explicação, usos, documentação de referência e acesso a pelo menos cinco vídeos em português. O catálogo possui 109 links de vídeos. Títulos e links foram pesquisados em fontes públicas; a reprodução de todos não foi testada.

## Salvamento de projetos

Meus projetos salva os códigos no navegador do aparelho. Não existe sincronização em nuvem integrada. Limpar os dados do navegador pode apagar esses projetos. O botão Salvar mantém a versão local; Exportar projeto gera um ZIP para guardar uma cópia. O ZIP pode ser enviado manualmente ao Drive ou ao GitHub.

## Login e integrações ainda pendentes

O objetivo é ter uma tela inicial de login, mostrar as contas conectadas e permitir salvar no Google Drive ou enviar arquivos corrigidos ao GitHub.

O usuário criou um projeto Firebase chamado Central IA e relatou ter habilitado o provedor Google. A configuração do provedor GitHub começou, mas ficou pendente na etapa de copiar a URL de retorno do Firebase para Authorization callback URL no formulário OAuth do GitHub. A conclusão não foi confirmada. O login não foi integrado ao site.

A URL de retorno fica em Firebase > Authentication > Método de login > GitHub. Client ID e Client Secret devem ser configurados no Firebase; a chave secreta não deve ser compartilhada em mensagens.

Login no Central IA, autorização do Drive e autorização de escrita em repositórios GitHub são etapas separadas. O login não conecta automaticamente as contas de ChatGPT, Claude ou Gemini.

A ideia de migrar para Firebase Hosting foi pausada. O endereço atual em chatgpt.site permanece.

## Limitações do APK

É um protótipo para Android 6 ou superior, sem publicação na Play Store. Compilação, assinatura e alinhamento foram verificados; não houve teste em aparelho físico pelo executor. A versão azul usa uma assinatura de teste diferente da versão roxa, exigindo desinstalar o APK anterior antes da instalação. Os projetos ficam no navegador usado, não no aplicativo que apenas abre o site.

Alterações publicadas no site aparecem ao recarregar a página aberta pelo app. Alterações na tela inicial nativa ou no ícone instalado exigem outro APK.

## Localização no pacote exportado

Os arquivos editáveis do site ficam em dist/. A prévia Android está em android-preview/. As fontes da seleção dos vídeos estão em docs/language-video-sources.json. O README.md da pasta principal explica como abrir no VS Code e iniciar o servidor local.

O estado funcional descrito neste resumo corresponde à versão publicada em 14 de outubro de 2026 e exportada em 19 de outubro de 2026.

## Repositório do projeto

A cópia do código para edição no VS Code e versionamento está em https://github.com/matteoortiz-cmd/CENTRAL-IA. O README principal explica como clonar e sincronizar alterações. A publicação do site hospedado continua sendo uma etapa separada.
