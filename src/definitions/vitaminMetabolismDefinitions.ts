import type { ExamDefinition } from "../parser/parserUtils";

export const VITAMIN_METABOLISM_DEFINITIONS = {
  iron: {
    key: "iron",
    labels: [
      "Ferro",
      "Ferro sérico",
      "Ferro serico",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  transferrin: {
    key: "transferrin",
    labels: [
      "Transferrina",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  transferrinSaturation: {
    key: "transferrinSaturation",
    labels: [
      "Saturação da Transferrina",
      "Saturacao da Transferrina",
      "Índice de Saturação da Transferrina",
      "Indice de Saturacao da Transferrina",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  vitaminB12: {
    key: "vitaminB12",
    labels: [
      "Vitamina B12",
      "Cobalamina",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  folate: {
    key: "folate",
    labels: [
      "Ácido Fólico",
      "Acido Folico",
      "Folato",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  vitaminD: {
  key: "vitaminD",
  labels: [
    "Vitamina D Total 25 OH",
    "Vitamina D Total 25-OH",
    "Vitamina D 25 OH",
    "Vitamina D 25-OH",
    "25-OH Vitamina D",
    "25 OH Vitamina D",
    "Vitamina D - 25 OH",
    "25-Hidroxivitamina D",
    "25 Hidroxivitamina D",
  ],
  strategy: "inline-or-result",
  maxFollowingLines: 8,
},

  zinc: {
    key: "zinc",
    labels: [
      "Zinco",
      "Zinco sérico",
      "Zinco serico",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },
} satisfies Record<string, ExamDefinition>;