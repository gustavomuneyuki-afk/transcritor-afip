import type {
  CoagulationData,
} from "../types/exams";

import type {
  PdfLine,
} from "../utils/pdfReader";

import {
  COAGULATION_DEFINITIONS,
} from "../definitions";

import {
  parseDefinitions,
} from "./genericExamParser";

import {
  extractFirstValueAfterLabel,
  findLine,
  normalizeText,
} from "./parserUtils";

const PROTHROMBIN_HEADING_LABELS = [
  "Tempo e atividade Protrombina",
  "Tempo e atividade de Protrombina",
];

const APTT_HEADING_LABELS = [
  "TTPA - Tempo de Tromboplastina Parcial Ativada",
  "TTPA - Tempo de Tromboplastina Parcial Ativada",
];

const TIME_LABELS = [
  "Tempo",
];

const INR_LABELS = [
  "RNI",
  "INR",
];

function findSection(
  lines: PdfLine[],
  headingLabels: string[],
): PdfLine[] {
  const headingIndex = lines.findIndex(
    (line) => {
      const normalizedLine =
        normalizeText(line.text);

      return headingLabels.some(
        (label) =>
          normalizedLine.includes(
            normalizeText(label),
          ),
      );
    },
  );

  if (headingIndex === -1) {
    return [];
  }

  const headingLine = lines[headingIndex];

  const sectionLines: PdfLine[] = [];

  for (
    let index = headingIndex + 1;
    index < lines.length;
    index += 1
  ) {
    const line = lines[index];

    /*
     * Os campos relevantes aparecem na mesma
     * página do título.
     */
    if (line.page !== headingLine.page) {
      break;
    }

    const normalizedLine =
      normalizeText(line.text);

    /*
     * "Liberado por" marca o final dos dados
     * atuais do exame e evita entrar no gráfico
     * com resultados históricos.
     */
    if (
      normalizedLine.startsWith(
        "liberado por",
      )
    ) {
      break;
    }

    sectionLines.push(line);
  }

  return sectionLines;
}

function parseProthrombinTime(
  lines: PdfLine[],
): {
  prothrombinTime?: string;
  inr?: string;
} {
  const sectionLines = findSection(
    lines,
    PROTHROMBIN_HEADING_LABELS,
  );

  if (sectionLines.length === 0) {
    return {};
  }

  const timeLine = findLine(
    sectionLines,
    TIME_LABELS,
  );

  const inrLine = findLine(
    sectionLines,
    INR_LABELS,
  );

  const prothrombinTime =
    extractFirstValueAfterLabel(
      timeLine,
      TIME_LABELS,
    );

  const inr =
    extractFirstValueAfterLabel(
      inrLine,
      INR_LABELS,
    );

  return {
    prothrombinTime,
    inr,
  };
}

function parseAptt(
  lines: PdfLine[],
): string | undefined {
  const sectionLines = findSection(
    lines,
    APTT_HEADING_LABELS,
  );

  if (sectionLines.length === 0) {
    return undefined;
  }

  const timeLine = findLine(
    sectionLines,
    TIME_LABELS,
  );

  return extractFirstValueAfterLabel(
    timeLine,
    TIME_LABELS,
  );
}

export function parseCoagulation(
  lines: PdfLine[],
): CoagulationData {
  const genericValues = parseDefinitions(
    lines,
    COAGULATION_DEFINITIONS,
  );

  const prothrombin =
    parseProthrombinTime(lines);

  const aptt =
    parseAptt(lines);

  return {
    prothrombinTime:
      prothrombin.prothrombinTime,

    inr:
      prothrombin.inr,

    aptt,

    fibrinogen:
      genericValues.fibrinogen,

    dDimer:
      genericValues.dDimer,
  };
}