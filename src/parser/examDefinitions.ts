import type { ExamDefinition } from "./parserUtils";

export const GLYCEMIC_DEFINITIONS = {
  glucose: {
    key: "glucose",
    labels: [
      "Glicose",
      "Glicemia de jejum",
      "Glicemia",
    ],
    strategy: "inline-or-result",
  },

  glycatedHemoglobin: {
    key: "glycatedHemoglobin",
    labels: [
      "Hemoglobina Glicada",
      "Hemoglobina Glicosilada",
      "HbA1c",
    ],
    strategy: "inline-or-result",
    ignoredPatterns: [
      /\(\s*A1C\s*\)/gi,
      /\bA1C\b/gi,
      /\bHbA1c\b/gi,
    ],
  },
} satisfies Record<
  string,
  ExamDefinition
>;

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

export const LIPID_DEFINITIONS = {
  totalCholesterol: {
    key: "totalCholesterol",
    labels: ["Colesterol Total"],
    strategy: "inline-or-result",
  },

  hdl: {
    key: "hdl",
    labels: [
      "Colesterol HDL",
      "HDL Colesterol",
      "HDL - Colesterol",
    ],
    strategy: "inline-or-result",
  },

  ldl: {
    key: "ldl",
    labels: [
      "Colesterol LDL",
      "LDL Colesterol",
      "LDL - Colesterol",
    ],
    strategy: "inline-or-result",
  },

  vldl: {
    key: "vldl",
    labels: [
      "Colesterol VLDL",
      "VLDL Colesterol",
      "VLDL - Colesterol",
    ],
    strategy: "inline-or-result",
  },

  triglycerides: {
    key: "triglycerides",
    labels: [
      "Triglicérides",
      "Triglicerides",
      "Triglicerídeos",
      "Triglicerideos",
    ],
    strategy: "inline-or-result",
  },
} satisfies Record<
  string,
  ExamDefinition
>;