import type { SddInput, SddSpec } from "@/types/sdd";

type LocalRecipeId =
  | "auth"
  | "ecommerce"
  | "dashboard"
  | "api"
  | "tests"
  | "refactor"
  | "documentation"
  | "mvp";

interface MicroTask {
  title: string;
  objective: string;
  scope: string;
  outOfScope: string;
  acceptanceCriteria: string[];
}

interface LocalRecipe {
  id: LocalRecipeId;
  label: string;
  summaryFocus: string;
  goals: string[];
  nonGoals: string[];
  microTasks: MicroTask[];
  acceptanceCriteria: string[];
  implementationPlan: string[];
  testChecklist: string[];
  risksAndEdgeCases: string[];
}

const TASK_TYPE_COPY: Record<SddInput["taskType"], string> = {
  feature: "funcionalidade",
  bugfix: "correção de bug",
  refactor: "refatoração",
  test: "tarefa de cobertura de testes",
  documentation: "atualização de documentação",
};

const RECIPE_KEYWORDS: Record<LocalRecipeId, string[]> = {
  auth: [
    "auth",
    "autenticacao",
    "login",
    "logout",
    "senha",
    "sessao",
    "usuario logado",
    "nextauth",
    "oauth",
    "google login",
  ],
  ecommerce: [
    "carrinho",
    "checkout",
    "compra",
    "ecommerce",
    "e-commerce",
    "loja",
    "pagamento",
    "pedido",
    "produto",
    "catalogo",
  ],
  dashboard: [
    "dashboard",
    "relatorio",
    "relatorios",
    "grafico",
    "graficos",
    "metricas",
    "indicador",
    "kpi",
    "analytics",
  ],
  api: [
    "api",
    "backend",
    "endpoint",
    "rota",
    "controller",
    "payload",
    "webhook",
    "servico",
    "database",
    "banco",
  ],
  tests: [
    "teste",
    "testes",
    "unitario",
    "unitarios",
    "integracao",
    "coverage",
    "cobertura",
    "vitest",
    "jest",
  ],
  refactor: [
    "refatorar",
    "refatoracao",
    "separar",
    "simplificar",
    "componentao",
    "responsabilidades",
    "duplicacao",
    "legado",
  ],
  documentation: [
    "documentar",
    "documentacao",
    "readme",
    "docs",
    "guia",
    "tutorial",
    "changelog",
    "manual",
  ],
  mvp: [
    "mvp",
    "projeto",
    "aplicativo",
    "app",
    "sistema",
    "plataforma",
    "produto",
    "do zero",
  ],
};

const LOCAL_RECIPE_IDS: ReadonlyArray<LocalRecipeId> = [
  "auth",
  "ecommerce",
  "dashboard",
  "api",
  "tests",
  "refactor",
  "documentation",
  "mvp",
];

const LOCAL_RECIPES: Record<LocalRecipeId, LocalRecipe> = {
  auth: {
    id: "auth",
    label: "autenticação e login",
    summaryFocus:
      "transformar a ideia em um recorte de autenticação verificável, com fluxo de login, proteção de rotas e validação de estados",
    goals: [
      "Definir o menor fluxo de autenticação que prova valor para o usuário.",
      "Proteger apenas as rotas ou telas necessárias para a primeira validação.",
      "Documentar estados de sucesso, erro, carregamento e usuário deslogado.",
    ],
    nonGoals: [
      "Não implementar múltiplos provedores de login na primeira etapa.",
      "Não criar painel administrativo completo de usuários.",
      "Não mudar regras de negócio fora do fluxo de autenticação.",
    ],
    microTasks: [
      {
        title: "Mapear fluxo de login",
        objective:
          "definir entrada, saída e estados visíveis do login antes de alterar código",
        scope:
          "identificar telas, botões, mensagens e redirecionamentos mínimos para login e logout",
        outOfScope:
          "cadastro avançado, recuperação de senha e múltiplos provedores",
        acceptanceCriteria: [
          "Existe uma descrição clara do caminho deslogado, logado e erro de autenticação.",
          "O destino após login e logout está definido.",
        ],
      },
      {
        title: "Proteger rotas privadas",
        objective:
          "bloquear acesso às rotas privadas quando o usuário não estiver autenticado",
        scope:
          "aplicar guarda apenas nas rotas essenciais e redirecionar para login quando necessário",
        outOfScope: "perfis, permissões granulares e regras administrativas",
        acceptanceCriteria: [
          "Usuário deslogado não acessa a rota protegida.",
          "Usuário autenticado mantém acesso ao fluxo principal.",
        ],
      },
      {
        title: "Validar estados de autenticação",
        objective:
          "garantir que carregamento, erro e sessão expirada tenham comportamento previsível",
        scope:
          "adicionar tratamento visual e testes para estados críticos do login",
        outOfScope: "observabilidade completa ou auditoria de segurança",
        acceptanceCriteria: [
          "Falha de login exibe mensagem clara.",
          "Sessão inválida retorna o usuário para um estado seguro.",
        ],
      },
    ],
    acceptanceCriteria: [
      "O usuário consegue identificar claramente quando está logado, deslogado ou em erro.",
      "Rotas privadas rejeitam acesso sem autenticação e preservam acesso autenticado.",
      "O fluxo pode ser validado localmente com pelo menos um cenário de sucesso e um de falha.",
    ],
    implementationPlan: [
      "Listar telas e rotas que participam do fluxo de autenticação.",
      "Implementar primeiro o caminho feliz de login/logout com estado local ou integração já existente.",
      "Adicionar proteção apenas nas rotas privadas do primeiro recorte.",
      "Cobrir estados de erro, carregamento e sessão ausente.",
      "Executar testes de regressão no fluxo público e no fluxo protegido.",
    ],
    testChecklist: [
      "Testar acesso deslogado à rota protegida.",
      "Testar login bem-sucedido e redirecionamento esperado.",
      "Testar logout e remoção do acesso privado.",
      "Testar mensagem de erro para credenciais ou provedor indisponível.",
      "Rodar npm run typecheck e npm run test.",
    ],
    risksAndEdgeCases: [
      "Redirecionamentos podem criar loop entre login e área privada.",
      "Sessão expirada pode deixar a UI em estado inconsistente.",
      "Mensagens de erro não devem expor detalhes sensíveis.",
    ],
  },
  ecommerce: {
    id: "ecommerce",
    label: "e-commerce",
    summaryFocus:
      "quebrar a ideia em catálogo, carrinho e checkout, evitando tentar resolver toda a operação de loja em uma única entrega",
    goals: [
      "Definir um fluxo mínimo de compra com catálogo, carrinho e fechamento.",
      "Manter cada etapa verificável de forma independente.",
      "Evitar acoplar pagamento real antes de validar o comportamento local.",
    ],
    nonGoals: [
      "Não integrar gateway de pagamento real na primeira etapa.",
      "Não implementar estoque, cupom, frete e antifraude juntos.",
      "Não criar painel administrativo completo de produtos.",
    ],
    microTasks: [
      {
        title: "Estruturar catálogo de produtos",
        objective:
          "mostrar produtos com dados mínimos para o usuário decidir o que adicionar ao carrinho",
        scope:
          "listar nome, preço, disponibilidade simples e ação de adicionar ao carrinho",
        outOfScope: "busca avançada, recomendações e gestão de estoque",
        acceptanceCriteria: [
          "Produtos aparecem com preço e ação clara.",
          "Produto indisponível não pode ser adicionado sem feedback.",
        ],
      },
      {
        title: "Implementar carrinho mínimo",
        objective:
          "permitir adicionar, remover e revisar itens antes do checkout",
        scope:
          "controlar quantidade, subtotal e estado vazio do carrinho",
        outOfScope: "frete, cupom, persistência cross-device e login",
        acceptanceCriteria: [
          "Adicionar e remover itens atualiza subtotal.",
          "Carrinho vazio mostra um estado claro para continuar comprando.",
        ],
      },
      {
        title: "Validar checkout local",
        objective:
          "criar uma etapa final verificável sem processar pagamento real",
        scope:
          "validar dados mínimos, impedir envio duplicado e exibir confirmação simulada",
        outOfScope: "gateway real, antifraude, emissão fiscal e e-mails transacionais",
        acceptanceCriteria: [
          "Checkout bloqueia envio incompleto.",
          "Clique duplo não cria dois pedidos simulados.",
        ],
      },
    ],
    acceptanceCriteria: [
      "O usuário consegue sair de catálogo para carrinho e checkout sem perder os itens selecionados.",
      "Subtotal e quantidade refletem as ações de adicionar, remover e alterar itens.",
      "Checkout local valida campos obrigatórios e impede envio duplicado.",
    ],
    implementationPlan: [
      "Definir o modelo mínimo de produto e item de carrinho.",
      "Criar ou ajustar a listagem de catálogo com ação de adicionar.",
      "Implementar estado de carrinho com adicionar, remover e atualizar quantidade.",
      "Adicionar validações do checkout local e estado de confirmação.",
      "Cobrir casos de carrinho vazio, item indisponível e envio duplicado.",
    ],
    testChecklist: [
      "Adicionar um produto ao carrinho e conferir subtotal.",
      "Remover item e validar estado vazio.",
      "Alterar quantidade e conferir total.",
      "Tentar finalizar checkout incompleto.",
      "Tentar duplo clique no envio do checkout.",
      "Rodar npm run typecheck e npm run test.",
    ],
    risksAndEdgeCases: [
      "Cálculo de total pode divergir entre UI e lógica de domínio.",
      "Itens removidos ou indisponíveis podem permanecer no carrinho.",
      "Envio duplicado pode criar pedidos simulados inconsistentes.",
    ],
  },
  dashboard: {
    id: "dashboard",
    label: "dashboard e relatórios",
    summaryFocus:
      "transformar a ideia em uma primeira tela de leitura, com métricas claras, filtros mínimos e estados de dados previsíveis",
    goals: [
      "Definir quais métricas respondem à pergunta principal do usuário.",
      "Criar uma primeira visualização escaneável e testável.",
      "Tratar estados de vazio, carregamento e erro.",
    ],
    nonGoals: [
      "Não criar todos os relatórios possíveis na primeira entrega.",
      "Não adicionar exportações, permissões ou agendamentos ainda.",
      "Não otimizar performance antes de limitar volume e filtros.",
    ],
    microTasks: [
      {
        title: "Definir métricas principais",
        objective:
          "escolher os indicadores mínimos que respondem à necessidade da ideia",
        scope: "nomear métricas, fonte dos dados e formato visual esperado",
        outOfScope: "métricas secundárias, drill-down e comparação histórica completa",
        acceptanceCriteria: [
          "Cada métrica tem significado e formato definidos.",
          "Métricas sem dados exibem estado vazio legível.",
        ],
      },
      {
        title: "Implementar filtros mínimos",
        objective:
          "permitir que o usuário restrinja os dados sem criar uma tela complexa",
        scope: "adicionar filtros essenciais, como período, status ou categoria",
        outOfScope: "filtros avançados salvos e query builder",
        acceptanceCriteria: [
          "Alterar filtro atualiza os dados exibidos.",
          "Filtro inválido ou sem resultado mostra feedback claro.",
        ],
      },
      {
        title: "Validar visualização e estados",
        objective:
          "garantir que cards, tabelas ou gráficos comuniquem os dados corretamente",
        scope: "testar carregamento, erro, vazio e dados preenchidos",
        outOfScope: "biblioteca nova de gráficos se a UI atual já resolver",
        acceptanceCriteria: [
          "Usuário entende a métrica sem ler documentação externa.",
          "Estados de erro e vazio não quebram o layout.",
        ],
      },
    ],
    acceptanceCriteria: [
      "Dashboard exibe as métricas principais com rótulos e formatos claros.",
      "Filtros mínimos alteram os dados exibidos sem recarregar fluxos desnecessários.",
      "Estados vazio, carregando e erro são verificáveis localmente.",
    ],
    implementationPlan: [
      "Listar pergunta principal que o dashboard precisa responder.",
      "Definir métricas e fontes de dados mínimas.",
      "Implementar layout com cards, tabela ou gráfico conforme o dado.",
      "Adicionar filtros essenciais e estados derivados.",
      "Validar cenários com dados completos, vazios e com erro.",
    ],
    testChecklist: [
      "Renderizar dashboard com dados de exemplo.",
      "Aplicar filtros e conferir alteração dos dados.",
      "Validar estado sem resultados.",
      "Validar erro de carregamento ou dados inválidos.",
      "Rodar npm run typecheck e npm run test.",
    ],
    risksAndEdgeCases: [
      "Métrica sem definição pode induzir decisão errada.",
      "Filtros combinados podem retornar vazio sem explicação.",
      "Gráficos podem ocultar valores importantes em telas pequenas.",
    ],
  },
  api: {
    id: "api",
    label: "API e backend",
    summaryFocus:
      "preparar um contrato de backend pequeno, com endpoint, validação de entrada, resposta previsível e testes",
    goals: [
      "Definir contrato de entrada e saída antes de implementar.",
      "Criar um endpoint pequeno com validações explícitas.",
      "Cobrir sucesso, erro de validação e falha controlada.",
    ],
    nonGoals: [
      "Não criar múltiplos endpoints no mesmo primeiro recorte.",
      "Não adicionar autenticação, filas ou cache se a ideia não pedir.",
      "Não mudar schema de banco além do mínimo necessário.",
    ],
    microTasks: [
      {
        title: "Definir contrato do endpoint",
        objective:
          "documentar método, rota, payload, resposta de sucesso e erros esperados",
        scope: "um endpoint principal com exemplos de request e response",
        outOfScope: "versionamento público de API e múltiplos recursos",
        acceptanceCriteria: [
          "Contrato lista campos obrigatórios e opcionais.",
          "Códigos de erro esperados estão definidos.",
        ],
      },
      {
        title: "Implementar validação e handler",
        objective:
          "criar o endpoint com validação de entrada e resposta determinística",
        scope:
          "validar payload, chamar a lógica de domínio e retornar JSON consistente",
        outOfScope: "autenticação, rate limit e integrações externas novas",
        acceptanceCriteria: [
          "Payload inválido retorna 400 com mensagem clara.",
          "Caminho feliz retorna o formato documentado.",
        ],
      },
      {
        title: "Adicionar testes de contrato",
        objective:
          "provar que o endpoint respeita entrada, saída e erros principais",
        scope: "testes para sucesso, validação e erro controlado",
        outOfScope: "testes de carga ou ambientes externos",
        acceptanceCriteria: [
          "Teste cobre request válido e inválido.",
          "Nenhum teste depende de serviço externo real.",
        ],
      },
    ],
    acceptanceCriteria: [
      "Contrato do endpoint descreve método, rota, payload, resposta e erros.",
      "Entrada inválida retorna erro claro sem executar a ação principal.",
      "Testes cobrem caminho feliz e pelo menos um erro de validação.",
    ],
    implementationPlan: [
      "Escrever o contrato mínimo do endpoint antes do código.",
      "Criar schema de validação para o body ou query params.",
      "Implementar handler pequeno chamando uma função de domínio pura quando possível.",
      "Padronizar respostas JSON de sucesso e erro.",
      "Adicionar testes sem chamadas externas.",
    ],
    testChecklist: [
      "Enviar request válido e conferir status e JSON.",
      "Enviar payload ausente ou inválido e conferir 400.",
      "Simular falha controlada da camada de domínio.",
      "Verificar que nenhum segredo é exposto no retorno.",
      "Rodar npm run typecheck e npm run test.",
    ],
    risksAndEdgeCases: [
      "Contrato frouxo pode aceitar dados inválidos silenciosamente.",
      "Erro interno pode vazar detalhes sensíveis.",
      "Endpoint pode misturar validação, domínio e integração em uma função grande.",
    ],
  },
  tests: {
    id: "tests",
    label: "testes",
    summaryFocus:
      "transformar a ideia em uma estratégia de testes pequena, priorizando comportamento observável e regressões prováveis",
    goals: [
      "Escolher os cenários de maior risco para testar primeiro.",
      "Escrever testes focados em comportamento, não em implementação interna.",
      "Manter a suíte rápida e determinística.",
    ],
    nonGoals: [
      "Não tentar atingir cobertura total em uma primeira etapa.",
      "Não criar testes frágeis acoplados a detalhes internos.",
      "Não depender de serviços externos reais.",
    ],
    microTasks: [
      {
        title: "Mapear cenários críticos",
        objective:
          "listar caminho feliz, erro principal e caso de borda mais provável",
        scope: "selecionar poucos cenários com alto valor de regressão",
        outOfScope: "matriz completa de todos os inputs possíveis",
        acceptanceCriteria: [
          "Cenários têm entrada, ação e resultado esperado.",
          "Pelo menos um caso de erro está descrito.",
        ],
      },
      {
        title: "Implementar testes do caminho feliz",
        objective:
          "garantir que o comportamento principal continue funcionando",
        scope: "testar a unidade ou fluxo mínimo com dados representativos",
        outOfScope: "mocks complexos e snapshot amplo",
        acceptanceCriteria: [
          "Teste falha se o resultado principal mudar.",
          "Teste não depende de ordem ou tempo externo.",
        ],
      },
      {
        title: "Cobrir erros e regressões",
        objective:
          "adicionar testes para entradas inválidas e bordas que já causaram risco",
        scope: "um erro principal e um caso de borda por vez",
        outOfScope: "testes end-to-end se não houver setup pronto",
        acceptanceCriteria: [
          "Erro esperado retorna mensagem ou estado verificável.",
          "Caso de borda não quebra a função ou fluxo.",
        ],
      },
    ],
    acceptanceCriteria: [
      "A suíte cobre caminho feliz, erro principal e pelo menos um caso de borda.",
      "Os testes são determinísticos e não fazem chamadas externas reais.",
      "Falhas de teste apontam claramente qual comportamento regrediu.",
    ],
    implementationPlan: [
      "Identificar função, componente ou rota sob teste.",
      "Mapear cenários por risco e valor de regressão.",
      "Adicionar teste do caminho feliz com dados mínimos.",
      "Adicionar teste de erro e caso de borda.",
      "Rodar a suíte e remover acoplamentos frágeis.",
    ],
    testChecklist: [
      "Rodar apenas o arquivo de teste novo ou alterado.",
      "Rodar npm run test completo.",
      "Garantir que nenhum teste chama rede real.",
      "Verificar mensagens de erro e nomes de teste.",
    ],
    risksAndEdgeCases: [
      "Testes podem validar detalhes internos em vez de comportamento.",
      "Mocks excessivos podem esconder regressões reais.",
      "Cobertura numérica pode subir sem proteger o fluxo crítico.",
    ],
  },
  refactor: {
    id: "refactor",
    label: "refatoração",
    summaryFocus:
      "dividir a mudança em etapas que preservam comportamento, separam responsabilidades e reduzem risco de regressão",
    goals: [
      "Preservar comportamento externo antes de mexer na estrutura.",
      "Separar responsabilidades sem expandir escopo funcional.",
      "Validar regressões com testes ou checklist manual claro.",
    ],
    nonGoals: [
      "Não mudar regra de negócio durante a refatoração.",
      "Não trocar biblioteca ou arquitetura sem necessidade direta.",
      "Não fazer limpeza ampla fora do módulo-alvo.",
    ],
    microTasks: [
      {
        title: "Congelar comportamento atual",
        objective:
          "registrar entradas, saídas e fluxos que não podem mudar",
        scope: "adicionar testes ou checklist para o comportamento existente",
        outOfScope: "corrigir bugs ou redesenhar a experiência",
        acceptanceCriteria: [
          "Existe teste ou checklist antes da alteração estrutural.",
          "Comportamentos preservados estão explícitos.",
        ],
      },
      {
        title: "Separar responsabilidades",
        objective:
          "extrair partes coesas mantendo a mesma interface externa",
        scope: "separar estado, transformação de dados e renderização quando aplicável",
        outOfScope: "renomeações amplas e mudança de contrato público",
        acceptanceCriteria: [
          "Arquivos extraídos têm responsabilidade clara.",
          "Chamadores continuam usando o mesmo contrato ou migração mínima.",
        ],
      },
      {
        title: "Validar regressões",
        objective:
          "comparar comportamento antes e depois da refatoração",
        scope: "rodar testes e validar manualmente o fluxo principal",
        outOfScope: "otimização de performance sem medição",
        acceptanceCriteria: [
          "Testes existentes continuam passando.",
          "Fluxo principal mantém resultado visual ou funcional equivalente.",
        ],
      },
    ],
    acceptanceCriteria: [
      "A refatoração preserva comportamento observável do usuário ou consumidor.",
      "Responsabilidades ficam separadas em funções ou componentes menores.",
      "A validação de regressão é documentada com testes ou checklist executado.",
    ],
    implementationPlan: [
      "Mapear o comportamento atual e os pontos de entrada públicos.",
      "Adicionar ou revisar testes que congelam o comportamento existente.",
      "Extrair uma responsabilidade por vez mantendo contratos estáveis.",
      "Remover duplicação apenas depois que a extração estiver validada.",
      "Rodar testes e revisar diff para evitar mudança funcional acidental.",
    ],
    testChecklist: [
      "Executar testes existentes antes e depois da refatoração.",
      "Validar manualmente o fluxo principal impactado.",
      "Conferir que nenhum contrato público mudou sem necessidade.",
      "Revisar imports e nomes para evitar abstrações vagas.",
      "Rodar npm run typecheck e npm run test.",
    ],
    risksAndEdgeCases: [
      "Refatoração pode introduzir mudança funcional não planejada.",
      "Extrações pequenas demais podem aumentar complexidade acidental.",
      "Testes ausentes podem esconder regressão em fluxos antigos.",
    ],
  },
  documentation: {
    id: "documentation",
    label: "documentação",
    summaryFocus:
      "transformar a ideia em documentação prática, orientada a uso, exemplos e manutenção futura",
    goals: [
      "Explicar o fluxo ou módulo de forma útil para quem vai usar ou manter.",
      "Adicionar exemplos concretos em vez de texto genérico.",
      "Manter documentação alinhada ao comportamento real do projeto.",
    ],
    nonGoals: [
      "Não reescrever toda a documentação do projeto.",
      "Não documentar funcionalidades inexistentes.",
      "Não criar material de marketing no lugar de instruções práticas.",
    ],
    microTasks: [
      {
        title: "Mapear público e objetivo",
        objective:
          "definir quem lê a documentação e qual ação precisa conseguir executar",
        scope: "identificar pré-requisitos, fluxo principal e resultado esperado",
        outOfScope: "guia completo para todos os casos possíveis",
        acceptanceCriteria: [
          "Documento declara o público e a tarefa principal.",
          "Pré-requisitos ficam claros antes do passo a passo.",
        ],
      },
      {
        title: "Escrever passo a passo verificável",
        objective:
          "documentar comandos, entradas e saídas esperadas sem ambiguidades",
        scope: "incluir exemplos pequenos e comandos reais do projeto",
        outOfScope: "explicações longas de conceitos externos",
        acceptanceCriteria: [
          "Leitor consegue seguir o passo a passo do início ao fim.",
          "Comandos e caminhos citados existem no projeto.",
        ],
      },
      {
        title: "Revisar precisão e manutenção",
        objective:
          "garantir que a documentação não prometa comportamento inexistente",
        scope: "conferir nomes, comandos, arquivos e limitações conhecidas",
        outOfScope: "reescrever seções não relacionadas",
        acceptanceCriteria: [
          "Limitações atuais estão explícitas.",
          "Links, comandos e nomes batem com o código.",
        ],
      },
    ],
    acceptanceCriteria: [
      "A documentação informa público, objetivo, pré-requisitos e passos verificáveis.",
      "Exemplos usam comandos, arquivos ou fluxos reais do projeto.",
      "Limitações e itens fora de escopo ficam explícitos.",
    ],
    implementationPlan: [
      "Identificar a seção ou arquivo de documentação mais adequado.",
      "Listar o fluxo principal que o leitor precisa executar.",
      "Adicionar exemplos curtos com comandos ou caminhos reais.",
      "Revisar se o texto descreve apenas o que existe hoje.",
      "Rodar testes ou comandos citados quando aplicável.",
    ],
    testChecklist: [
      "Executar comandos documentados, quando forem locais e seguros.",
      "Conferir links e caminhos citados.",
      "Validar que limitações estão claras.",
      "Pedir revisão de alguém que não conhece o fluxo, se possível.",
    ],
    risksAndEdgeCases: [
      "Documentação pode ficar à frente do código e confundir usuários.",
      "Exemplos genéricos podem não ajudar no uso real.",
      "Comandos sem contexto podem ser executados no ambiente errado.",
    ],
  },
  mvp: {
    id: "mvp",
    label: "projeto genérico ou MVP",
    summaryFocus:
      "reduzir a ideia a um primeiro recorte de produto que possa ser implementado, testado e copiado para uma IA externa",
    goals: [
      "Escolher uma jornada principal em vez de tentar construir o produto inteiro.",
      "Definir dados mínimos, telas mínimas e critérios verificáveis.",
      "Gerar prompts que possam ser executados um por vez.",
    ],
    nonGoals: [
      "Não construir todos os módulos do produto no primeiro recorte.",
      "Não adicionar login, pagamento ou banco se não forem essenciais ao fluxo.",
      "Não criar arquitetura definitiva antes de validar o comportamento central.",
    ],
    microTasks: [
      {
        title: "Definir jornada principal",
        objective:
          "escolher o fluxo mínimo que prova a utilidade da ideia",
        scope: "identificar ator, entrada, ação principal e resultado esperado",
        outOfScope: "múltiplos perfis, automações e integrações secundárias",
        acceptanceCriteria: [
          "Jornada cabe em poucos passos claros.",
          "Resultado final é observável sem depender de serviços externos novos.",
        ],
      },
      {
        title: "Modelar dados mínimos",
        objective:
          "definir quais campos e estados são necessários para a primeira versão",
        scope: "criar estrutura local ou contrato simples para a jornada principal",
        outOfScope: "modelo completo de domínio e otimizações futuras",
        acceptanceCriteria: [
          "Dados mínimos cobrem criação, leitura e estado vazio.",
          "Campos obrigatórios e opcionais estão claros.",
        ],
      },
      {
        title: "Implementar fluxo vertical pequeno",
        objective:
          "entregar uma fatia fim a fim sem expandir para recursos laterais",
        scope: "UI, lógica local e validação básica do primeiro fluxo",
        outOfScope: "integrações externas, autenticação e persistência complexa",
        acceptanceCriteria: [
          "Usuário completa a jornada principal.",
          "Erro básico e estado vazio são tratados.",
        ],
      },
    ],
    acceptanceCriteria: [
      "A spec reduz a ideia a uma jornada principal executável.",
      "Cada prompt sugerido implementa uma etapa pequena e independente.",
      "O resultado pode ser validado localmente antes de adicionar integrações.",
    ],
    implementationPlan: [
      "Nomear o usuário principal e a ação que gera valor.",
      "Cortar integrações e módulos secundários do primeiro recorte.",
      "Definir dados mínimos e estados de UI.",
      "Implementar uma fatia vertical pequena.",
      "Validar fluxo feliz, erro básico e estado vazio.",
    ],
    testChecklist: [
      "Executar a jornada principal do início ao fim.",
      "Testar estado inicial ou vazio.",
      "Testar entrada inválida ou incompleta.",
      "Copiar cada prompt sugerido e conferir se pede apenas uma etapa.",
      "Rodar npm run typecheck e npm run test quando houver código.",
    ],
    risksAndEdgeCases: [
      "Ideia ampla pode virar planejamento grande demais.",
      "Falta de ator principal pode gerar telas sem fluxo claro.",
      "Adicionar integrações cedo demais pode travar a validação local.",
    ],
  },
};

function normalizeIdeaText(idea: string): string {
  return idea.trim().replace(/\s+/g, " ");
}

function normalizeForSearch(text: string): string {
  return normalizeIdeaText(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function makeTitle(idea: string, recipe: LocalRecipe): string {
  const compactIdea = idea.length > 72 ? `${idea.slice(0, 69)}...` : idea;
  return `Spec SDD local (${recipe.label}): ${compactIdea}`;
}

function countMatches(text: string, keywords: string[]): number {
  return keywords.filter((keyword) => text.includes(keyword)).length;
}

function isLargeIdea(normalizedIdea: string, wordCount: number): boolean {
  return (
    wordCount >= 26 ||
    normalizedIdea.includes("plataforma") ||
    normalizedIdea.includes("sistema completo") ||
    normalizedIdea.includes("mvp") ||
    normalizedIdea.includes("do zero") ||
    normalizedIdea.includes("todos os") ||
    normalizedIdea.includes("tudo")
  );
}

function detectLocalRecipe(input: SddInput, idea: string): LocalRecipe {
  const normalizedIdea = normalizeForSearch(idea);

  if (input.taskType === "test") {
    return LOCAL_RECIPES.tests;
  }

  if (input.taskType === "refactor") {
    return LOCAL_RECIPES.refactor;
  }

  if (input.taskType === "documentation") {
    return LOCAL_RECIPES.documentation;
  }

  const recipeScores: Array<{ id: LocalRecipeId; score: number }> =
    LOCAL_RECIPE_IDS.map((id) => ({
    id,
    score: countMatches(normalizedIdea, RECIPE_KEYWORDS[id]),
  }));
  const bestRecipe = recipeScores.sort((a, b) => b.score - a.score)[0];

  if (bestRecipe && bestRecipe.score > 0) {
    return LOCAL_RECIPES[bestRecipe.id];
  }

  return LOCAL_RECIPES.mvp;
}

function buildAcceptanceCriteria(
  idea: string,
  recipe: LocalRecipe,
): SddSpec["acceptanceCriteria"] {
  return [
    {
      id: "AC-1",
      description: `A primeira entrega responde diretamente à ideia do usuário: "${idea}".`,
    },
    ...recipe.acceptanceCriteria.map((description, index) => ({
      id: `AC-${index + 2}`,
      description,
    })),
  ];
}

function buildImplementationPlan(
  recipe: LocalRecipe,
  isLargeScope: boolean,
): string[] {
  const plan = [...recipe.implementationPlan];

  if (isLargeScope) {
    return [
      "Tratar esta ideia como ampla: executar um prompt sugerido por vez e validar antes de avançar.",
      ...plan,
    ];
  }

  return plan;
}

function buildGoals(recipe: LocalRecipe, isLargeScope: boolean): string[] {
  if (!isLargeScope) {
    return recipe.goals;
  }

  return [
    ...recipe.goals,
    "Executar a spec em microtarefas sequenciais, copiando um prompt por vez para a IA externa.",
  ];
}

function buildNonGoals(recipe: LocalRecipe, isLargeScope: boolean): string[] {
  if (!isLargeScope) {
    return recipe.nonGoals;
  }

  return [
    ...recipe.nonGoals,
    "Não pedir para a IA implementar toda a ideia em um único prompt.",
  ];
}

function buildAgentPrompt(idea: string, recipe: LocalRecipe, task: MicroTask): string {
  return [
    `Contexto: estou usando o SDD Studio em modo local para transformar esta ideia em uma etapa pequena: "${idea}". Domínio detectado: ${recipe.label}.`,
    `Objetivo: ${task.objective}.`,
    `Escopo: ${task.scope}.`,
    `Fora de escopo: ${task.outOfScope}.`,
    `Critérios de aceite: ${task.acceptanceCriteria.join(" ")}`,
    `Instrução final: implemente apenas a etapa "${task.title}" e pare. Ao final, explique rapidamente o que mudou e como validar.`,
  ].join("\n");
}

function buildSuggestedAgentPrompts(
  idea: string,
  recipe: LocalRecipe,
  isLargeScope: boolean,
): string[] {
  const prompts = recipe.microTasks.map((task) =>
    buildAgentPrompt(idea, recipe, task),
  );

  if (!isLargeScope) {
    return prompts;
  }

  return prompts.map(
    (prompt) =>
      `${prompt}\nObservação: a ideia parece ampla; execute este prompt sozinho antes de passar para o próximo.`,
  );
}

function buildTestChecklist(recipe: LocalRecipe, isLargeScope: boolean): string[] {
  if (!isLargeScope) {
    return recipe.testChecklist;
  }

  return [
    "Validar cada microtarefa separadamente antes de iniciar a próxima.",
    ...recipe.testChecklist,
  ];
}

function buildRisks(recipe: LocalRecipe, isLargeScope: boolean): string[] {
  if (!isLargeScope) {
    return recipe.risksAndEdgeCases;
  }

  return [
    "Pedir tudo em um único prompt pode gerar implementação grande, cara e difícil de revisar.",
    ...recipe.risksAndEdgeCases,
  ];
}

export function generateLocalSddSpec(input: SddInput): SddSpec {
  const idea = normalizeIdeaText(input.idea);
  const taskType = TASK_TYPE_COPY[input.taskType];
  const wordCount = idea.split(/\s+/).filter(Boolean).length;
  const recipe = detectLocalRecipe(input, idea);
  const largeScope = isLargeIdea(normalizeForSearch(idea), wordCount);

  return {
    title: makeTitle(idea, recipe),
    taskType: input.taskType,
    summary: `Gerar uma ${taskType} local-first para esta ideia: "${idea}". Receita detectada: ${recipe.label}. O objetivo é ${recipe.summaryFocus}, mantendo tudo determinístico, copiável e sem chamadas externas.`,
    goals: buildGoals(recipe, largeScope),
    nonGoals: buildNonGoals(recipe, largeScope),
    acceptanceCriteria: buildAcceptanceCriteria(idea, recipe),
    implementationPlan: buildImplementationPlan(recipe, largeScope),
    suggestedAgentPrompts: buildSuggestedAgentPrompts(idea, recipe, largeScope),
    testChecklist: buildTestChecklist(recipe, largeScope),
    risksAndEdgeCases: buildRisks(recipe, largeScope),
  };
}

export function generateMockSddSpec(input: SddInput): SddSpec {
  return generateLocalSddSpec(input);
}
