import type { ExamDefinition } from "../parser/parserUtils";

export const LIVER_DEFINITIONS = {
  ast: {
  key: "ast",
  labels: [
    "TGO/AST",
    "TGO - AST",
    "TGO",
    "Aspartato Aminotransferase",
    "Transaminase Oxalacética",
    "Transaminase Oxalacetica",
  ],
  strategy: "inline-or-result",
  maxFollowingLines: 8,
},

  alt: {
  key: "alt",
  labels: [
    "TGP/ALT",
    "TGP - ALT",
    "TGP",
    "Alanina Aminotransferase",
    "Transaminase Pirúvica",
    "Transaminase Piruvica",
  ],
  strategy: "inline-or-result",
  maxFollowingLines: 8,
},

  ggt: {
    key: "ggt",
    labels: [
      "Gama Glutamil Transferase - GGT",
      "Gama Glutamil Transferase",
      "Gama-GT",
      "GGT",
    ],
    strategy: "inline-or-result",
  },

  alkalinePhosphatase: {
    key: "alkalinePhosphatase",
    labels: [
      "Fosfatase Alcalina",
    ],
    strategy: "inline-or-result",
  },

  totalBilirubin: {
    key: "totalBilirubin",
    labels: [
      "Bilirrubina Total",
    ],
    strategy: "inline-or-result",
  },

  directBilirubin: {
    key: "directBilirubin",
    labels: [
      "Bilirrubina Direta",
    ],
    strategy: "inline-or-result",
  },

  indirectBilirubin: {
    key: "indirectBilirubin",
    labels: [
      "Bilirrubina Indireta",
    ],
    strategy: "inline-or-result",
  },

  albumin: {
    key: "albumin",
    labels: ["Albumina"],
    strategy: "all-matches",
    excludedTerms: [
      "urina",
      "urinária",
      "urinaria",
      "relação",
      "relacao",
    ],
  },

  totalProtein: {
    key: "totalProtein",
    labels: [
      "Proteínas",
      "Proteinas",
      "Proteína Total",
      "Proteina Total",
    ],
    strategy: "all-matches",
  },
} satisfies Record<string, ExamDefinition>;