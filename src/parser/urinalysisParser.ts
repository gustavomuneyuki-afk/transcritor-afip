import type { UrinalysisData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";
import { normalizeText } from "./parserUtils";

function findUrinalysisSection(
  lines: PdfLine[],
): PdfLine[] {
  const startIndex = lines.findIndex((line) => {
    const text = normalizeText(line.text);

    return text === "urina i";
  });

  if (startIndex === -1) {
    return [];
  }

  const startPage = lines[startIndex].page;
  const section: PdfLine[] = [];

  for (
    let index = startIndex + 1;
    index < lines.length;
    index += 1
  ) {
    const line = lines[index];

    if (line.page !== startPage) {
      break;
    }

    const text = normalizeText(line.text);

    if (
      text.startsWith("liberado por") ||
      text.startsWith("pedido :") ||
      text.startsWith("assinatura digital")
    ) {
      break;
    }

    section.push(line);
  }

  return section;
}

function extractValue(
  lines: PdfLine[],
  labels: string[],
): string | undefined {
  for (const line of lines) {
    const original = line.text.trim();
    const normalized = normalizeText(original);

    for (const label of labels) {
      const normalizedLabel = normalizeText(label);

      if (
        normalized === normalizedLabel ||
        normalized.startsWith(
          `${normalizedLabel} `,
        )
      ) {
        const remainder = original
          .slice(label.length)
          .trim();

        if (!remainder) {
          continue;
        }

        return remainder.split(/\s+/)[0];
      }
    }
  }

  return undefined;
}

export function parseUrinalysis(
  lines: PdfLine[],
): UrinalysisData {
  const section =
    findUrinalysisSection(lines);

  if (section.length === 0) {
    return {};
  }

  return {
    density: extractValue(
      section,
      ["Densidade"],
    ),

    ph: extractValue(
      section,
      ["pH"],
    ),

    protein: extractValue(
      section,
      ["Proteína", "Proteina"],
    ),

    glucose: extractValue(
      section,
      ["Glicose"],
    ),

    bilirubin: extractValue(
      section,
      ["Bilirrubina"],
    ),

    ketones: extractValue(
      section,
      ["Cetona", "Cetonas"],
    ),

    blood: extractValue(
      section,
      ["Sangue"],
    ),

    nitrite: extractValue(
      section,
      ["Nitrito"],
    ),

    urobilinogen: extractValue(
      section,
      [
        "Urobilinogenio",
        "Urobilinogênio",
      ],
    ),

    epithelialCells: extractValue(
      section,
      [
        "Células epiteliais",
        "Celulas epiteliais",
      ],
    ),

    leukocytes: extractValue(
      section,
      ["Leucócitos", "Leucocitos"],
    ),

    redBloodCells: extractValue(
      section,
      ["Hemácias", "Hemacias"],
    ),

    crystals: extractValue(
      section,
      ["Cristais"],
    ),

    casts: extractValue(
      section,
      ["Cilindros"],
    ),

    bacteria: extractValue(
      section,
      ["Bactérias", "Bacterias"],
    ),
  };
}