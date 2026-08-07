import type { ExamDefinition } from "../parser/parserUtils";

export const TUMOR_MARKER_DEFINITIONS = {
  afp: {
    key: "afp",
    labels: [
      "Alfa-fetoproteína",
      "Alfa-fetoproteina",
    ],
    strategy: "result",
    maxFollowingLines: 8,
  },

  psaTotal: {
    key: "psaTotal",
    labels: [
      "PSA Total - Antígeno prostático específico total",
      "PSA Total - Antigeno prostatico especifico total",
    ],
    strategy: "result",
    maxFollowingLines: 8,
  },

  psaFree: {
    key: "psaFree",
    labels: [
      "PSA Livre",
    ],
    strategy: "all-matches",
    maxFollowingLines: 8,
  },
} satisfies Record<string, ExamDefinition>;