import type { ExamDefinition } from "../parser/parserUtils";

export const COAGULATION_DEFINITIONS = {
  fibrinogen: {
    key: "fibrinogen",
    labels: [
      "Dosagem de Fibrinogênio",
      "Dosagem de Fibrinogenio",
      "Fibrinogênio",
      "Fibrinogenio",
    ],
    strategy: "result",
    maxFollowingLines: 8,
  },

  dDimer: {
    key: "dDimer",
    labels: [
      "D-Dímero",
      "D-Dimero",
      "D Dímero",
      "D Dimero",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },
} satisfies Record<string, ExamDefinition>;