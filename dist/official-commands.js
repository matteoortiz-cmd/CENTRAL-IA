'use strict';
window.OFFICIAL_COMMANDS=[];
function registerCommands(provider,product,source,entries){for(const [shortcut,title,description]of entries){window.OFFICIAL_COMMANDS.push({provider,product,source,shortcut,title,description,type:'official',category:'Comandos oficiais',checked:'13 de outubro de 2026'});}}
registerCommands('ChatGPT','ChatGPT / Codex CLI (OpenAI)','https://developers.openai.com/codex/cli/slash-commands',[
['/model','Escolher modelo','Abre a seleção de modelos disponíveis para sua conta.'],
['/review','Revisar alterações','Solicita uma revisão das mudanças no projeto atual.'],
['/diff','Ver mudanças','Mostra diferenças nos arquivos do projeto.'],
['/compact','Resumir o contexto','Resume a conversa para liberar espaço no contexto.'],
['/new','Iniciar conversa','Começa uma nova conversa na sessão.'],
['/mcp','Consultar ferramentas','Lista os servidores e ferramentas MCP configurados.']]);
registerCommands('ChatGPT','ChatGPT / Classic no macOS','https://help.openai.com/en/articles/9703738-chatgpt-macos-app-release-notes',[
['/','Menu de ferramentas no Mac','A documentação do app para macOS registra um menu de comandos com barra. Escolha uma ferramenta disponível no menu; não é uma instrução geral para colar no chat.']]);
registerCommands('Claude','Claude / Claude Code','https://code.claude.com/docs/en/commands',[
['/help','Consultar ajuda','Mostra a ajuda e os comandos disponíveis.'],
['/compact','Resumir o contexto','Resume a conversa para liberar espaço.'],
['/context','Examinar o contexto','Mostra como o espaço de contexto está sendo utilizado.'],
['/init','Preparar instruções do projeto','Gera um guia CLAUDE.md para o projeto.'],
['/model','Escolher modelo','Abre a seleção de modelo para a sessão.'],
['/export','Exportar conversa','Permite guardar a conversa como texto.']]);
registerCommands('Gemini','Gemini / Gemini CLI','https://geminicli.com/docs/reference/commands/',[
['/help','Consultar ajuda','Mostra comandos disponíveis e orientações de uso.'],
['/compress','Resumir o contexto','Substitui o contexto da conversa por um resumo.'],
['/copy','Copiar a resposta','Copia a última saída; depende do suporte de clipboard.'],
['/init','Preparar instruções do projeto','Gera um arquivo GEMINI.md para orientar o trabalho no projeto.'],
['/stats','Consultar estatísticas','Mostra dados de uso da sessão atual.'],
['/docs','Abrir documentação','Abre a documentação do Gemini CLI no navegador.']]);
window.PRODUCT_GUIDES={
 Claude:{url:'https://code.claude.com/docs/en/quickstart',steps:[
 'Este guia usa Claude Code no terminal do computador, não o chat comum do Claude. Terminal é o programa onde você digita comandos para iniciar ferramentas.',
 'Abra o guia oficial de início abaixo. Confira o acesso necessário e siga a instalação indicada para seu sistema.',
 'Abra o terminal na pasta do seu projeto e execute claude para iniciar uma sessão.',
 'Entre com uma conta que tenha acesso ao Claude Code, seguindo a autenticação mostrada. Plano, créditos e permissões dependem da conta.',
 'Dentro da sessão do Claude Code, digite /help para conferir os comandos disponíveis. Depois cole o comando deste cartão no início da mensagem e confirme.'
 ]},
 Gemini:{url:'https://geminicli.com/docs/get-started/',steps:[
 'Este guia usa Gemini CLI no terminal do computador. Não cole estes comandos esperando o mesmo comportamento no chat comum do Gemini.',
 'Abra o guia oficial de início abaixo e siga os requisitos e a instalação para seu sistema.',
 'Abra o terminal na pasta do projeto e execute gemini para iniciar o programa.',
 'Escolha uma forma de autenticação suportada e siga as instruções de entrada. Confira limites e condições da sua conta.',
 'Na sessão interativa do Gemini CLI, digite /help para consultar os comandos e depois use o comando deste cartão.'
 ]},
 ChatGPT:{url:'https://developers.openai.com/codex/cli',steps:[
 'Este guia usa Codex CLI, o produto de programação da OpenAI, no terminal do computador. Estes comandos não são instruções para o chat comum do ChatGPT.',
 'Abra o guia oficial de início abaixo e siga os requisitos e a instalação para seu sistema.',
 'Abra o terminal na pasta do projeto e execute codex para iniciar uma sessão.',
 'Siga a autenticação indicada e confira o acesso disponível para sua conta. O método de entrada e as condições de uso dependem da conta.',
 'No campo de mensagem do Codex CLI, digite / para ver os comandos. Cole o comando deste cartão e confirme com Enter.'
 ]}
};
for(const command of window.OFFICIAL_COMMANDS){
 if(command.shortcut==='/'&&command.provider==='ChatGPT'){
 command.guide={url:command.source,steps:[
 'Este cartão descreve o menu documentado do ChatGPT Classic para macOS. Não é um comando de terminal nem uma garantia de suporte no celular.',
 'No Mac, abra o aplicativo correspondente e entre na sua conta.',
 'Digite / no campo de mensagem e confira as ferramentas que aparecem na sua versão.',
 'Escolha uma ferramenta disponível no menu, escreva o pedido e envie. Se o menu não aparecer, confira a documentação da sua versão.'
 ]};
 }else command.guide=window.PRODUCT_GUIDES[command.provider];
}
