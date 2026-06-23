import type { SddInput, SddSpec } from "@/types/sdd";

const TASK_TYPE_COPY: Record<SddInput["taskType"], string> = {
  feature: "funcionalidade",
  bugfix: "correção de bug",
  refactor: "refatoração",
  test: "tarefa de cobertura de testes",
  documentation: "atualização de documentação",
};

function normalizeIdea(idea: string): string {
  return idea.trim().replace(/\s+/g, " ");
}

function makeTitle(idea: string): string {
  const compactIdea = idea.length > 72 ? `${idea.slice(0, 69)}...` : idea;
  return `Spec SDD: ${compactIdea}`;
}

export function generateMockSddSpec(input: SddInput): SddSpec {
  const idea = normalizeIdea(input.idea);
  const taskType = TASK_TYPE_COPY[input.taskType];

  return {
    title: makeTitle(idea),
    taskType: input.taskType,
    summary: `Criar uma ${taskType} focada para esta ideia do usuário: "${idea}". Esta spec simulada mantém o escopo local e concreto para validar o fluxo do produto antes de qualquer integração com IA.`,
    goals: [
      "Transformar a ideia bruta em um alvo de implementação pequeno e revisável.",
      "Manter a primeira iteração estreita o bastante para um agente de código concluir com segurança.",
      "Tornar o comportamento esperado observável por critérios de aceite e testes claros.",
    ],
    nonGoals: [
      "Não chamar um provedor externo de IA nesta etapa.",
      "Não adicionar rotas de API, autenticação ou persistência em banco de dados.",
      "Não expandir além da ideia informada pelo usuário até que o fluxo seja validado.",
    ],
    acceptanceCriteria: [
      {
        id: "AC-1",
        description: `O trabalho implementado atende diretamente à ideia: "${idea}".`,
      },
      {
        id: "AC-2",
        description:
          "A mudança pode ser verificada localmente sem serviços externos ou credenciais.",
      },
      {
        id: "AC-3",
        description:
          "O comportamento final é documentado com um checklist de testes conciso.",
      },
    ],
    implementationPlan: [
      "Identificar o menor comportamento visível ao usuário sugerido pela ideia.",
      "Atualizar apenas os arquivos necessários para esse comportamento.",
      "Manter dados locais e determinísticos na primeira validação.",
      "Rodar verificação de tipos e uma verificação rápida no servidor local de desenvolvimento.",
    ],
    suggestedAgentPrompts: [
      `Implemente a menor ${taskType} local para: "${idea}". Não adicione serviços externos.`,
      "Revise os arquivos alterados em busca de segurança de tipos, expansão de escopo desnecessária e testes ausentes.",
      "Produza um resumo de verificação conciso que relacione as mudanças aos critérios de aceite.",
    ],
    testChecklist: [
      "Rodar npm run typecheck.",
      "Iniciar a aplicação com npm run dev.",
      "Exercitar o fluxo principal do formulário no navegador.",
      "Confirmar que o estado resultante da interface atende aos critérios de aceite.",
    ],
    risksAndEdgeCases: [
      "A ideia pode ser ampla demais e exigir um primeiro recorte menor.",
      "Uma versão futura com IA pode gerar uma estrutura diferente deste resultado simulado.",
      "Entradas muito longas do usuário devem permanecer legíveis nas seções geradas.",
    ],
  };
}
