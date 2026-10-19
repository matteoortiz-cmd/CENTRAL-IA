'use strict';

// Seleção educativa, sem ordem de popularidade. Fundamentos aparecem em categoria própria.
window.PROGRAMMING_LANGUAGES = [
  {
    name: 'Python',
    kind: 'language',
    description: 'Python é uma linguagem usada para automatizar tarefas, analisar dados e criar aplicações. Também aparece em projetos de inteligência artificial e em serviços web.',
    topics: ['Automação', 'Dados', 'Inteligência artificial', 'Web'],
    docsUrl: 'https://docs.python.org/pt-br/3/tutorial/',
    youtubeQuery: 'Python para iniciantes curso básico português'
  },
  {
    name: 'JavaScript',
    kind: 'language',
    description: 'JavaScript permite adicionar interação às páginas, como menus, formulários e respostas a cliques. Também pode ser executado fora do navegador, por exemplo em servidores com Node.js.',
    topics: ['Web', 'Interatividade', 'Servidores'],
    docsUrl: 'https://tc39.es/ecma262/',
    youtubeQuery: 'JavaScript para iniciantes curso básico português'
  },
  {
    name: 'TypeScript',
    kind: 'language',
    description: 'TypeScript acrescenta um sistema de tipos ao JavaScript, ajudando a encontrar certos erros durante o desenvolvimento. Seu código é transformado em JavaScript para executar em navegadores e outros ambientes.',
    topics: ['Web', 'Tipos', 'Aplicações'],
    docsUrl: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    youtubeQuery: 'TypeScript para iniciantes curso básico português'
  },
  {
    name: 'Java',
    kind: 'language',
    description: 'Java é uma linguagem usada em aplicações, serviços web e sistemas de empresas. Seus programas normalmente executam na máquina virtual Java, disponível para diferentes sistemas operacionais.',
    topics: ['Aplicações', 'Servidores', 'Sistemas empresariais'],
    docsUrl: 'https://dev.java/learn/',
    youtubeQuery: 'Java programação para iniciantes curso português'
  },
  {
    name: 'C',
    kind: 'language',
    description: 'C é uma linguagem que permite controlar de perto a memória e os recursos do computador. É usada em sistemas operacionais, dispositivos eletrônicos e programas que precisam de desempenho.',
    topics: ['Sistemas', 'Dispositivos', 'Desempenho'],
    docsUrl: 'https://www.gnu.org/software/c-intro-and-ref/manual/html_node/',
    youtubeQuery: 'linguagem C para iniciantes curso básico português'
  },
  {
    name: 'C++',
    kind: 'language',
    description: 'C++ é uma linguagem usada para construir programas que exigem controle de memória e desempenho. Aparece em jogos, aplicações para computador e sistemas.',
    topics: ['Jogos', 'Aplicações', 'Sistemas', 'Desempenho'],
    docsUrl: 'https://isocpp.org/get-started',
    youtubeQuery: 'C++ para iniciantes curso básico português'
  },
  {
    name: 'C#',
    kind: 'language',
    description: 'C# é uma linguagem da plataforma .NET usada para criar aplicações e serviços web. Também é utilizada no desenvolvimento de jogos com ferramentas como Unity.',
    topics: ['Aplicações', 'Web', 'Jogos', '.NET'],
    docsUrl: 'https://learn.microsoft.com/pt-br/dotnet/csharp/',
    youtubeQuery: 'C# para iniciantes curso básico português'
  },
  {
    name: 'PHP',
    kind: 'language',
    description: 'PHP é uma linguagem usada principalmente no servidor para criar páginas e aplicações web. Pode processar formulários, consultar bancos de dados e gerar o conteúdo enviado ao navegador.',
    topics: ['Web', 'Servidores', 'Bancos de dados'],
    docsUrl: 'https://www.php.net/manual/pt_BR/',
    youtubeQuery: 'PHP para iniciantes curso básico português'
  },
  {
    name: 'Go',
    kind: 'language',
    description: 'Go é uma linguagem usada para criar serviços, APIs e ferramentas de linha de comando. Ela oferece recursos para executar várias tarefas de forma concorrente.',
    topics: ['APIs', 'Servidores', 'Ferramentas de terminal'],
    docsUrl: 'https://go.dev/doc/',
    youtubeQuery: 'Go Golang para iniciantes curso português'
  },
  {
    name: 'Rust',
    kind: 'language',
    description: 'Rust é uma linguagem que combina desempenho com regras para prevenir muitos erros de uso da memória. Pode ser usada em sistemas, ferramentas de terminal e serviços.',
    topics: ['Sistemas', 'Memória', 'Ferramentas de terminal'],
    docsUrl: 'https://doc.rust-lang.org/book/',
    youtubeQuery: 'Rust para iniciantes curso básico português'
  },
  {
    name: 'Ruby',
    kind: 'language',
    description: 'Ruby é uma linguagem usada para automatizar tarefas e criar aplicações web. O framework Ruby on Rails é uma das ferramentas usadas para desenvolver sites e serviços com ela.',
    topics: ['Web', 'Automação', 'Serviços'],
    docsUrl: 'https://www.ruby-lang.org/pt/documentation/',
    youtubeQuery: 'Ruby para iniciantes curso básico português'
  },
  {
    name: 'Kotlin',
    kind: 'language',
    description: 'Kotlin é uma linguagem usada no desenvolvimento de aplicativos Android e serviços. Com Kotlin Multiplatform, também permite compartilhar partes do código entre diferentes plataformas.',
    topics: ['Android', 'Servidores', 'Multiplataforma'],
    docsUrl: 'https://kotlinlang.org/docs/home.html',
    youtubeQuery: 'Kotlin para iniciantes curso básico português'
  },
  {
    name: 'Swift',
    kind: 'language',
    description: 'Swift é uma linguagem usada para desenvolver aplicativos para iPhone, iPad e Mac. Também pode ser utilizada em ferramentas de linha de comando e aplicações no servidor.',
    topics: ['Aplicativos Apple', 'Servidores', 'Ferramentas de terminal'],
    docsUrl: 'https://www.swift.org/documentation/',
    youtubeQuery: 'Swift para iniciantes curso básico português'
  },
  {
    name: 'Dart',
    kind: 'language',
    description: 'Dart é uma linguagem usada para construir aplicações. Com o framework Flutter, permite desenvolver interfaces para celular, web e computador a partir de uma base de código.',
    topics: ['Flutter', 'Aplicativos', 'Web', 'Multiplataforma'],
    docsUrl: 'https://dart.dev/language',
    youtubeQuery: 'Dart para iniciantes curso básico português'
  },
  {
    name: 'R',
    kind: 'language',
    description: 'R é uma linguagem voltada à análise de dados e à computação estatística. É usada para explorar informações, realizar cálculos estatísticos e criar gráficos.',
    topics: ['Dados', 'Estatística', 'Gráficos'],
    docsUrl: 'https://cran.r-project.org/doc/manuals/r-release/R-intro.html',
    youtubeQuery: 'linguagem R para iniciantes análise de dados português'
  },
  {
    name: 'SQL',
    kind: 'language',
    description: 'SQL é uma linguagem para consultar e organizar dados em bancos relacionais. É usada em relatórios, análises e sistemas que armazenam informações; alguns comandos variam conforme o banco.',
    topics: ['Bancos de dados', 'Consultas', 'Relatórios'],
    docsUrl: 'https://www.postgresql.org/docs/current/tutorial-sql.html',
    youtubeQuery: 'SQL para iniciantes curso básico português'
  },
  {
    name: 'Bash',
    kind: 'language',
    description: 'Bash é um interpretador de comandos e uma linguagem de scripts usada em terminais. Permite combinar comandos e automatizar tarefas, especialmente em sistemas Linux e outros ambientes compatíveis.',
    topics: ['Terminal', 'Automação', 'Linux'],
    docsUrl: 'https://www.gnu.org/software/bash/manual/bash.html',
    youtubeQuery: 'Bash shell script para iniciantes português'
  },
  {
    name: 'Lua',
    kind: 'language',
    description: 'Lua é uma linguagem que pode ser incorporada a outros programas para adicionar scripts e personalizações. É usada em jogos, ferramentas e aplicações que precisam desse tipo de extensão.',
    topics: ['Jogos', 'Scripts', 'Extensões'],
    docsUrl: 'https://www.lua.org/manual/',
    youtubeQuery: 'Lua programação para iniciantes curso português'
  },
  {
    name: 'HTML',
    kind: 'foundation',
    description: 'HTML é uma linguagem de marcação que organiza o conteúdo das páginas, como títulos, textos, imagens e links. Define a estrutura do documento; não é uma linguagem de programação.',
    topics: ['Estrutura de páginas', 'Conteúdo', 'Web'],
    docsUrl: 'https://html.spec.whatwg.org/multipage/',
    youtubeQuery: 'HTML para iniciantes curso básico português'
  },
  {
    name: 'CSS',
    kind: 'foundation',
    description: 'CSS é uma linguagem de estilos que define a aparência e o layout das páginas, incluindo cores, fontes e espaçamento. Trabalha com o HTML para adaptar a apresentação a diferentes telas; não é uma linguagem de programação.',
    topics: ['Estilos', 'Layout', 'Telas responsivas'],
    docsUrl: 'https://www.w3.org/Style/CSS/',
    youtubeQuery: 'CSS para iniciantes curso básico português'
  },
  {
    name: 'JSON',
    kind: 'foundation',
    description: 'JSON é um formato de texto para representar e trocar dados, como listas, objetos e configurações. É usado em APIs e arquivos de dados; não é uma linguagem de programação.',
    topics: ['Dados', 'APIs', 'Configurações'],
    docsUrl: 'https://www.json.org/json-pt.html',
    youtubeQuery: 'JSON para iniciantes explicação português'
  }
];
