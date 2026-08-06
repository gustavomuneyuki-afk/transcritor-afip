import type { ExamDefinition } from "../parser/parserUtils";
export const RENAL_DEFINITIONS = {
  urea: {
    key: "urea",
    labels: ["Ureia"],
    strategy: "inline-or-result",
    excludedTerms: [
      "urina",
      "urinária",
      "urinaria",
    ],
  },

  creatinine: {
    key: "creatinine",
    labels: ["Creatinina"],
    strategy: "inline-or-result",
    excludedTerms: [
      "urina",
      "urinária",
      "urinaria",
      "amostra isolada",
      "relação albumina",
      "relacao albumina",
      "relação proteína",
      "relacao proteina",
    ],
  },

  estimatedGfr: {
    key: "estimatedGfr",
    labels: [
      "TFG - Taxa de Filtração Glomerular",
      "TFG - Taxa de Filtracao Glomerular",
      "Taxa de Filtração Glomerular estimada",
      "Taxa de Filtracao Glomerular estimada",
      "Filtração Glomerular estimada",
      "Filtracao Glomerular estimada",
      "TFG estimada",
      "TFG",
      "eGFR",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },
} satisfies Record<
  string,
  ExamDefinition
>;