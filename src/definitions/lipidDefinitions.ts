import type { ExamDefinition } from "../parser/parserUtils";
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
  ExamDefinition>