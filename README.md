# CENTRAL-IA

Repositório de destino: https://github.com/matteoortiz-cmd/CENTRAL-IA

Código-fonte do site Central IA, pronto para abrir no VS Code, editar no computador e guardar em um repositório do GitHub. O site usa HTML, CSS e JavaScript, sem framework, dependências de npm ou etapa de compilação.

## 1. Abrir no VS Code

1. Extraia **todo o ZIP** para uma pasta no computador. Não trabalhe dentro do arquivo compactado.
2. No VS Code, escolha **Arquivo → Abrir Pasta** e selecione a pasta que contém este `README.md`, o `package.json` e a pasta `dist`.
3. Abra **Terminal → Novo Terminal**. O terminal deve estar na pasta principal do projeto.

Para usar o servidor incluído, instale o **Node.js 20 ou superior**. O npm acompanha a instalação do Node.js. Você pode conferir a versão com `node --version`.

## 2. Rodar no computador

No terminal do VS Code, execute:

```bash
npm start
```

Depois, abra no navegador:

**http://127.0.0.1:3000**

Não é necessário executar `npm install`. O servidor usa apenas recursos que já acompanham o Node.js. Para parar, volte ao terminal e pressione **Ctrl+C**.

Mantenha o terminal aberto enquanto estiver usando o site. Ao editar e salvar um arquivo, atualize a página do navegador para ver a mudança. Se a porta estiver ocupada, encerre outra cópia do servidor antes de iniciar novamente.

### Alternativa com Python

Se você já tem Python 3 instalado, também pode executar este comando na pasta principal do projeto:

```bash
python -m http.server 3000 --bind 127.0.0.1 --directory dist
```

No Linux ou macOS, o comando pode ser `python3`:

```bash
python3 -m http.server 3000 --bind 127.0.0.1 --directory dist
```

Abra o mesmo endereço no navegador e use **Ctrl+C** para parar. Escolha apenas um dos servidores por vez.

**A pasta `dist` precisa ser a raiz do servidor.** Alguns links começam com `/`, como os caminhos dos ícones e da página Android. Abrir o HTML com dois cliques ou servir a pasta principal como raiz pode quebrar esses links. Os comandos acima já usam a pasta correta.

## 3. Onde editar

Apesar do nome, **`dist` contém o código editável do site**. Você pode alterar os arquivos diretamente; não há comando de build.

| Arquivo ou pasta | Conteúdo |
| --- | --- |
| `dist/index.html` | Estrutura e textos da página principal. |
| `dist/style.css` | Cores, layout e aparência. |
| `dist/app.js` | Laboratório, projetos locais, prévia e exportação. |
| `dist/programming-languages.js` | Informações do catálogo de linguagens. |
| `dist/language-videos.js` | Vídeos indicados no catálogo. |
| `dist/language-catalog.js` | Exibição, busca e filtros desse catálogo. |
| `dist/prompt-library.js`, `dist/official-commands.js` e `dist/catalog-search.js` | Conteúdo e busca de tutoriais e instruções. |
| `dist/assets/` | Imagens e ícone de estrela azul. |
| `dist/android.html` e `dist/downloads/` | Página de download e APKs Android. |
| `android-preview/` | Fonte Android preservada para reconstruir a tela nativa. |
| `docs/language-video-sources.json` | Registro das fontes dos links de vídeos. |
| `tools/serve.mjs` | Servidor local usado por `npm start`. |
| `.vscode/` | Configurações do VS Code. |
| `ESCOPO.md` | Histórico de requisitos e decisões do projeto. |
| `.openai/hosting.json` | Configuração existente da hospedagem Sites. Não é necessária para rodar localmente e não é uma credencial secreta. |

O histórico em `ESCOPO.md` também menciona ideias para etapas futuras. Confira abaixo o que esta versão já oferece.

## O que já funciona

- Interface em português, com azul, branco, preto e cinza e ícone de estrela correspondente.
- Tutoriais e orientações para usar ferramentas de IA com a sua própria conta.
- Laboratório com HTML, CSS, JavaScript e JSON opcional, prévia isolada e visualização de desktop ou celular.
- Criação, edição, importação de HTML e salvamento de projetos no navegador.
- Exportação dos projetos do laboratório em ZIP.
- Preparação de um pedido de revisão para copiar e enviar manualmente a uma IA. O aplicativo não faz chamadas às APIs de IA.
- Catálogo separado de 18 linguagens, mais HTML, CSS e JSON como fundamentos, com pelo menos cinco vídeos do YouTube por item.

Os links dos vídeos têm fontes registradas, mas a reprodução de todos os vídeos não foi testada. A página local e o laboratório podem funcionar sem internet; vídeos, documentação externa, ferramentas de IA e outros links externos precisam de conexão.

### Seus projetos do laboratório

Os projetos criados no laboratório ficam no **`localStorage` do navegador**, associados ao endereço usado para abrir o site. Eles **não estão incluídos neste ZIP de código-fonte** e não serão enviados ao GitHub junto com estes arquivos.

Para guardar esse trabalho, abra cada projeto no laboratório e use **Exportar projeto → Baixar ZIP**. Trocar de navegador, de perfil ou de endereço pode mostrar uma lista diferente de projetos; limpar os dados do navegador pode apagá-los. Os projetos salvos no site hospedado também não aparecem automaticamente no servidor local.

## O que ainda não está integrado

Login com Google ou GitHub, salvamento direto no Google Drive ou GitHub e banco de dados na nuvem ainda não estão conectados. O envio desses arquivos é manual. Houve apenas uma configuração externa parcial de Firebase; este pacote não contém credenciais de Firebase nem um serviço Firebase integrado.

A revisão automática por IA, execução de projetos com servidor ou dependências e publicação automática dos projetos dos usuários também dependem de implementação futura.

## 4. Alterar e sincronizar com o GitHub

Este projeto está em **https://github.com/matteoortiz-cmd/CENTRAL-IA**. Guardar o código no GitHub não publica o site automaticamente.

O ZIP contém os arquivos do projeto, sem a pasta interna `.git`. Você pode extrair, abrir no VS Code e editar normalmente. Para manter as alterações sincronizadas, clone o repositório pelo VS Code: use **Controle do Código-Fonte → Clonar Repositório**, informe a URL acima e entre na sua conta GitHub. Abra a pasta clonada, edite os arquivos, faça um commit e use **Sincronizar Alterações**.

Se você já editou a cópia extraída do ZIP, guarde essa pasta e copie os arquivos que alterou para a pasta clonada antes de fazer o commit.

Pelo terminal, uma cópia conectada ao GitHub pode ser obtida assim:

```bash
git clone https://github.com/matteoortiz-cmd/CENTRAL-IA.git
cd CENTRAL-IA
```

Depois de editar, use o Controle do Código-Fonte do VS Code ou estes comandos dentro da pasta clonada:

```bash
git add .
git commit -m "Atualiza Central IA"
git push
```

O Git pode pedir seu nome e e-mail no primeiro commit, e o GitHub pode pedir autenticação. Use os fluxos do Git ou do VS Code. Não coloque senhas, tokens, chaves de API ou chaves de assinatura nos arquivos do projeto.

### Sobre publicar com GitHub Pages

Este código contém caminhos absolutos iniciados por `/`. Em um GitHub Pages publicado dentro do caminho de um repositório, esses links precisam ser ajustados para esse caminho, e a publicação precisa usar o conteúdo de `dist` como site. Apenas enviar o repositório não resolve essa configuração.

## Android: o que acompanha o pacote

O APK é uma tela de entrada nativa que abre a **URL já hospedada** do Central IA no navegador. Ele não aponta para o servidor do seu computador e não carrega automaticamente suas alterações locais.

- Alterações nos arquivos do site aparecem no teste local; para aparecerem na URL hospedada, precisam ser publicadas nessa hospedagem.
- Alterações na tela de entrada nativa, no ícone nativo ou no destino do APK exigem reconstruir e assinar o APK.
- `android-preview` contém código **smali e recursos binários preservados para Apktool**. Não é o projeto original em Java/Kotlin com Android Studio e Gradle.
- A chave de assinatura da primeira prévia roxa não está disponível. A prévia atual usa um certificado de desenvolvimento e serve para testes.
- O APK antigo de visual roxo tem outra assinatura. Para trocar por esta prévia, é necessário desinstalar o aplicativo antigo antes de instalar o novo. Guarde seus projetos exportando-os antes dessa troca.
- A prévia não foi testada em um aparelho físico e não está preparada para publicação na Play Store.

Os detalhes da reconstrução e assinatura estão em [`android-preview/README.md`](android-preview/README.md).

Este pacote permite editar e versionar o site e preservar a fonte Android disponível. Extrair ou executar estes arquivos não publica novas alterações no site. O repositório acima guarda o código para edição e versionamento.
