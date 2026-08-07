import type { ExamDefinition } from "../parser/parserUtils";

export const CARDIAC_MUSCLE_DEFINITIONS = {
  cpk: {
    key: "cpk",
    labels: [
      "CK - Creatinofosfoquinase",
      "CK - Creatino Fosfoquinase",
      "Creatinofosfoquinase",
      "Creatino Fosfoquinase",
      "Creatina Quinase",
      "Creatina-quinase",
      "CPK",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  ckmb: {
    key: "ckmb",
    labels: [
      "CK-MB",
      "CK MB",
      "CKMB",
      "CK-MB massa",
      "CK MB massa",
      "Creatinoquinase MB",
      "Creatino Quinase MB",
      "Creatina Quinase MB",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  troponin: {
    key: "troponin",
    labels: [
      "Troponina I ultrassensível",
      "Troponina I ultrassensivel",
      "Troponina T ultrassensível",
      "Troponina T ultrassensivel",
      "Troponina I",
      "Troponina T",
      "Troponina",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },

  proBnp: {
    key: "proBnp",
    labels: [
      "Pro Peptídeo Natriurético Tipo B",
      "Pro Peptideo Natriuretico Tipo B",
      "NT-proBNP",
      "NT proBNP",
      "NT Pro BNP",
      "proBNP",
      "Pro BNP",
    ],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },
} satisfies Record<string, ExamDefinition>;