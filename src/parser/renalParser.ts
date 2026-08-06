import type { RenalData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import {
  extractFirstValueAfterLabel,
  extractResultAfterHeading,
  findLine,
} from "./parserUtils";

const UREA_LABELS = ["Ureia"];

const CREATININE_LABELS = ["Creatinina"];

const GFR_LABELS = [
  "TFG - Taxa de Filtração Glomerular",
  "TFG - Taxa de Filtracao Glomerular",
  "Taxa de Filtração Glomerular estimada",
  "Taxa de Filtracao Glomerular estimada",
  "Filtração Glomerular estimada",
  "Filtracao Glomerular estimada",
  "TFG estimada",
  "TFG",
  "eGFR",
];

const URINARY_TERMS = [
  "urina",
  "urinária",
  "urinaria",
  "amostra isolada",
  "relação albumina",
  "relacao albumina",
  "relação proteína",
  "relacao proteina",
];

function findSerumCreatinineLine(
  lines: PdfLine[],
): PdfLine | undefined {
  return findLine(
    lines,
    CREATININE_LABELS,
    URINARY_TERMS,
  );
}

export function parseRenal(
  lines: PdfLine[],
): RenalData {
  const ureaLine = findLine(
    lines,
    UREA_LABELS,
    URINARY_TERMS,
  );

  const creatinineLine =
    findSerumCreatinineLine(lines);

  return {
    urea: extractFirstValueAfterLabel(
      ureaLine,
      UREA_LABELS,
    ),

    creatinine: extractFirstValueAfterLabel(
      creatinineLine,
      CREATININE_LABELS,
    ),

    estimatedGfr: extractResultAfterHeading(
      lines,
      GFR_LABELS,
    ),
  };
}