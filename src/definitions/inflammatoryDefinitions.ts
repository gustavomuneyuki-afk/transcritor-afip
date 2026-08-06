import type { ExamDefinition } from "../parser/parserUtils";

export const INFLAMMATORY_DEFINITIONS = {
  crp: {
    key: "crp",
    labels: [
      "Proteína C Reativa",
      "Proteina C Reativa",
      "Proteína C-Reativa",
      "Proteina C-Reativa",
      "PCR quantitativa",
      "PCR Quantitativa",
    ],
    strategy: "inline-or-result",
    excludedTerms: [
      "ultrassensível",
      "ultrassensivel",
      "cardiovascular",
    ],
    maxFollowingLines: 8,
  },

  procalcitonin: {
    key: "procalcitonin",
    labels: [
      "Procalcitonina",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  esr: {
    key: "esr",
    labels: [
      "Velocidade de Hemossedimentação",
      "Velocidade de Hemossedimentacao",
      "Hemossedimentação",
      "Hemossedimentacao",
      "VHS",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  ferritin: {
    key: "ferritin",
    labels: [
      "Ferritina",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },
} satisfies Record<string, ExamDefinition>;