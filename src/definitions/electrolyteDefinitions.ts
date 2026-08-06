import type { ExamDefinition } from "../parser/parserUtils";
export const ELECTROLYTE_DEFINITIONS = {
  uricAcid: {
    key: "uricAcid",
    labels: [
      "Ácido Úrico",
      "Acido Urico",
      "Ácido úrico",
      "Acido urico",
    ],
    strategy: "inline-or-result",
  },

  sodium: {
    key: "sodium",
    labels: ["Sódio", "Sodio"],
    strategy: "inline-or-result",
  },

  potassium: {
    key: "potassium",
    labels: ["Potássio", "Potassio"],
    strategy: "inline-or-result",
  },

  phosphorus: {
    key: "phosphorus",
    labels: ["Fósforo", "Fosforo"],
    strategy: "inline-or-result",
  },

  magnesium: {
    key: "magnesium",
    labels: ["Magnésio", "Magnesio"],
    strategy: "inline-or-result",
  },

  ionizedCalcium: {
    key: "ionizedCalcium",
    labels: [
      "Cálcio Ionizado",
      "Calcio Ionizado",
      "Cálcio Iônico",
      "Calcio Ionico",
    ],
    strategy: "inline-or-result",
  },
} satisfies Record<string, ExamDefinition>;