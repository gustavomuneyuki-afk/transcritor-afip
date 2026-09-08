import type { ExamDefinition } from "../parser/parserUtils";

export const IMMUNOLOGY_DEFINITIONS = {
  igG: {
    key: "igG",
    labels: ["Imunoglobulina G (IgG)"],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },
  igA: {
    key: "igA",
    labels: ["Imunoglobulina A (IgA)"],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },
  igM: {
    key: "igM",
    labels: ["Imunoglobulina M (IgM)"],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },
  igE: {
    key: "igE",
    labels: ["IgE - Imunoglobulina E, sérico", "IgE - Imunoglobulina E, serico"],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },
  c3: {
    key: "c3",
    labels: ["C3 - Fração do complemento", "C3 - Fracao do complemento"],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },
  c4: {
    key: "c4",
    labels: ["C4 - Fração do complemento", "C4 - Fracao do complemento"],
    strategy: "inline-or-result",
    maxFollowingLines: 8,
  },
} satisfies Record<string, ExamDefinition>;
