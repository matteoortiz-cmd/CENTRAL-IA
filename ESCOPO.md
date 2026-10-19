# Central de ferramentas de IA

Aplicativo web em português para ensinar e permitir o uso de ferramentas de IA.

## Requisitos confirmados
- Seções por provedor: ChatGPT, Claude e Gemini, extensíveis a outros.
- Catálogo de funções com tutoriais de configuração e uso.
- Criar um site dentro do aplicativo ou conectar um projeto existente.
- Executar projetos em ambiente de teste nos servidores.
- Fornecer à IA capturas da página renderizada e registros de erros.
- Aplicar alterações no código, repetir a análise e conferir o resultado.
- Publicar o projeto após a verificação.

## Fluxo de implementação
1. Selecionar provedor e configurar acesso ao serviço.
2. Criar projeto ou importar código existente.
3. Executar em ambiente isolado, com limites de recursos.
4. Capturar a página e erros de execução.
5. Solicitar diagnóstico e proposta de alteração à IA.
6. Registrar e aplicar alteração recuperável, executar novamente e verificar.
7. Publicar a versão selecionada.

## Dependências ainda não configuradas
- Serviço de execução isolada de projetos e automação de navegador.
- Acesso às APIs dos provedores de IA, com credenciais mantidas no servidor.
- Armazenamento de projetos, histórico de versões e conexão com repositórios.
- Serviço de publicação dos projetos criados pelos usuários.

Sites pode hospedar o aplicativo, mas não substitui o serviço de execução isolada de projetos. Nenhuma integração ou publicação foi realizada neste momento.

## Modelo de acesso confirmado
O aplicativo fornecerá acesso às IAs. O responsável pelo aplicativo configurará contas de API dos provedores e assumirá o custo de uso. As credenciais permanecerão no servidor, fora do navegador dos usuários. Uma assinatura de interface de chat não deve ser tratada como autorização de uso de API.

## Configuração ainda necessária
Contas de API com faturamento habilitado para os provedores escolhidos. Não solicitar chaves secretas por mensagem; usar configuração segura do servidor.

## Revisão de escopo confirmada
A primeira versão não terá integração paga nem chaves de API. Cada pessoa usa sua própria conta de IA. O app fornece tutoriais e um laboratório de HTML estático com criação, importação, edição, prévia isolada, salvamento local, exportação e geração de pedidos para revisão manual. A análise visual automática, execução em servidor, conexão com repositórios e publicação de projetos dos usuários ficam para uma próxima etapa.

## Atualização autorizada
Rodapé: Central Lab e Matheo da Silva. Laboratório com abas HTML, CSS e JavaScript, prévia combinada, salvamento dos três códigos e exportação ZIP. Tornar público após a atualização. Domínio personalizado depende de registro e configuração ainda não realizados.

## JSON no laboratório
Aba JSON opcional com validação de sintaxe, salvamento local e revisão manual com IA. Quando preenchido, exporta data.json junto aos demais arquivos. JSON válido fica disponível na prévia como dados inertes no elemento centralia-project-data. Projetos anteriores continuam funcionando sem JSON.

## Catálogo de linguagens
Aba separada Linguagens de Programação entre Ferramentas & tutoriais e Meus projetos. Seleção educativa de 18 linguagens e HTML, CSS e JSON como fundamentos. Cada card explica usos, oferece documentação de referência e abre pelo menos cinco vídeos em português no YouTube. Inclui busca por nome/área e filtro entre linguagens e fundamentos. Evidências dos links e títulos estão em docs/language-video-sources.json; reprodução dos vídeos não foi verificada automaticamente.
