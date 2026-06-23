import type { TaskType } from "@/types/sdd";

export interface ExampleIdea {
  title: string;
  idea: string;
  taskType: TaskType;
}

export const EXAMPLE_IDEAS: ReadonlyArray<ExampleIdea> = [
  {
    title: "Google login",
    taskType: "feature",
    idea: "Add Google login to a Next.js app using NextAuth. Logged-out users should not access /dashboard, and the implementation should include acceptance criteria and validation steps.",
  },
  {
    title: "Split component",
    taskType: "refactor",
    idea: "Refactor a large React component that mixes data fetching, form state, and rendering logic. Split it into smaller components without changing behavior.",
  },
  {
    title: "Order total tests",
    taskType: "test",
    idea: "Create unit tests for a function that calculates order totals, including discounts, taxes, empty carts, and invalid input.",
  },
  {
    title: "Double submit bug",
    taskType: "bugfix",
    idea: "Fix a checkout bug where users can submit the payment form twice by double-clicking the submit button.",
  },
];
