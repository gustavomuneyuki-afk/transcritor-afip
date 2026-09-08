import type { ImmunologyData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";
import { IMMUNOLOGY_DEFINITIONS } from "../definitions";
import { parseDefinitions } from "./genericExamParser";
import { normalizeText } from "./parserUtils";

function parseTextResult(
  lines: PdfLine[],
  labels: string[],
): string | undefined {
  const headingIndex = lines.findIndex((line) => {
    const normalized = normalizeText(line.text);
    return labels.some((label) =>
      normalized.startsWith(normalizeText(label)),
    );
  });

  if (headingIndex === -1) return undefined;
  const page = lines[headingIndex].page;

  for (let offset = 1; offset <= 8; offset += 1) {
    const candidate = lines[headingIndex + offset];
    if (!candidate || candidate.page !== page) break;

    const normalized = normalizeText(candidate.text);
    if (!normalized.startsWith("resultado")) continue;

    const result = candidate.text.replace(/^Resultado\s*/i, "").trim();
    const normalizedResult = normalizeText(result);

    if (normalizedResult.startsWith("nao reagente")) return "NR";
    if (normalizedResult.startsWith("reagente")) return "R";
    return result || undefined;
  }

  return undefined;
}

export function parseImmunology(lines: PdfLine[]): ImmunologyData {
  const values = parseDefinitions(lines, IMMUNOLOGY_DEFINITIONS);

  return {
    ...values,
    antiSsa: parseTextResult(lines, [
      "Pesquisa sérica de Anticorpos Anti-SSA (RO)",
      "Pesquisa serica de Anticorpos Anti-SSA (RO)",
    ]),
    antiSsb: parseTextResult(lines, [
      "Pesquisa sérica de Anticorpos Anti-SSB (LA)",
      "Pesquisa serica de Anticorpos Anti-SSB (LA)",
    ]),
    antiSm: parseTextResult(lines, ["Anti-SM"]),
  };
}
