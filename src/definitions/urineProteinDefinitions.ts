import type { ExamDefinition } from "../parser/parserUtils";

export const URINE_PROTEIN_DEFINITIONS = {
  urineProtein: {
    key: "urineProtein",
    labels: [
      "Proteína, urina",
      "Proteina, urina",
    ],
    strategy: "result",
    maxFollowingLines: 8,
  },
} satisfies Record<string, ExamDefinition>;