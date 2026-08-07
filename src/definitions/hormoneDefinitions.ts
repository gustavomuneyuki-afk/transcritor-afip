import type { ExamDefinition } from "../parser/parserUtils";

export const HORMONE_DEFINITIONS = {
  tsh: {
    key: "tsh",
    labels: [
      "TSH",
      "Hormônio Tireoestimulante",
      "Hormonio Tireoestimulante",
      "Tireotrofina",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  freeT4: {
    key: "freeT4",
    labels: [
      "T4 Livre",
      "Tiroxina Livre",
      "Tiroxina livre",
      "T4L",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  acth: {
    key: "acth",
    labels: [
      "ACTH",
      "Hormônio Adrenocorticotrófico",
      "Hormonio Adrenocorticotrofico",
      "Corticotrofina",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  cortisol: {
    key: "cortisol",
    labels: [
      "Cortisol",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  pth: {
    key: "pth",
    labels: [
      "PTH",
      "Paratormônio",
      "Paratormonio",
      "Hormônio Paratireoidiano",
      "Hormonio Paratireoidiano",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },
} satisfies Record<string, ExamDefinition>;