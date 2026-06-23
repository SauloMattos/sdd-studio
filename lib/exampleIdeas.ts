import type { TaskType } from "@/types/sdd";

export interface ExampleIdea {
  title: string;
  idea: string;
  taskType: TaskType;
}

export const EXAMPLE_IDEAS: ReadonlyArray<ExampleIdea> = [
  {
    title: "Login com Google",
    taskType: "feature",
    idea: "Adicionar login com Google a um app Next.js usando NextAuth. Usuários deslogados não devem acessar /dashboard, e a implementação deve incluir critérios de aceite e passos de validação.",
  },
  {
    title: "Separar componente",
    taskType: "refactor",
    idea: "Refatorar um componente React grande que mistura busca de dados, estado de formulário e lógica de renderização. Separar em componentes menores sem alterar o comportamento.",
  },
  {
    title: "Testes de total do pedido",
    taskType: "test",
    idea: "Criar testes unitários para uma função que calcula totais de pedidos, incluindo descontos, impostos, carrinhos vazios e entradas inválidas.",
  },
  {
    title: "Bug de envio duplo",
    taskType: "bugfix",
    idea: "Corrigir um bug no checkout em que usuários conseguem enviar o formulário de pagamento duas vezes ao clicar duas vezes no botão de envio.",
  },
];
