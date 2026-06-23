import type { TaskType, UserProfile } from "@/types/sdd";

export interface ExampleIdea {
  title: string;
  idea: string;
  taskType: TaskType;
  userProfile: UserProfile;
}

export const EXAMPLE_IDEAS: ReadonlyArray<ExampleIdea> = [
  {
    title: "Primeira tela de login",
    taskType: "feature",
    userProfile: "beginner",
    idea: "Quero criar minha primeira tela de login em React, com email, senha e uma mensagem de erro simples quando os campos estiverem vazios.",
  },
  {
    title: "Refatorar componente React",
    taskType: "refactor",
    userProfile: "experienced",
    idea: "Quero refatorar um componente React grande que mistura fetch, estado de formulário e renderização, sem alterar o comportamento atual.",
  },
  {
    title: "Controle de gastos",
    taskType: "feature",
    userProfile: "common",
    idea: "Quero criar um app simples para controlar meus gastos do mês, com cadastro de despesas, categorias e um resumo mensal.",
  },
];
