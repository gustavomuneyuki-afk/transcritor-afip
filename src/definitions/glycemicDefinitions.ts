import type { ExamDefinition } from "../parser/parserUtils";

export const GLYCEMIC_DEFINITIONS = {
  glucose: {
    key: "glucose",
    labels: [
      "Glicose",
      "Glicemia de jejum",
    ],
    strategy: "result",
    maxFollowingLines: 8,
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
    maxFollowingLines: 8,
  },
} satisfies Record<string, ExamDefinition>;