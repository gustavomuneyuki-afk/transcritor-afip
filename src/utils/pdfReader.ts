import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export type PdfTextItem = {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PdfLine = {
  page: number;
  y: number;
  text: string;
  items: PdfTextItem[];
};

export type ParsedPdf = {
  fileName: string;
  pageCount: number;
  lines: PdfLine[];
  fullText: string;
};

/**
 * Agrupa itens que estão aproximadamente na mesma altura.
 *
 * PDFs raramente armazenam duas palavras da mesma linha com o valor Y
 * exatamente igual. Por isso, usamos uma tolerância.
 */
function groupItemsIntoLines(
  items: PdfTextItem[],
  pageNumber: number,
  tolerance = 2.5,
): PdfLine[] {
  const sortedItems = [...items].sort((a, b) => {
    const verticalDifference = Math.abs(a.y - b.y);

    if (verticalDifference > tolerance) {
      return b.y - a.y;
    }

    return a.x - b.x;
  });

  const lines: PdfLine[] = [];

  for (const item of sortedItems) {
    const existingLine = lines.find(
      (line) => Math.abs(line.y - item.y) <= tolerance,
    );

    if (existingLine) {
      existingLine.items.push(item);

      // Mantém os elementos da linha da esquerda para a direita.
      existingLine.items.sort((a, b) => a.x - b.x);
    } else {
      lines.push({
        page: pageNumber,
        y: item.y,
        text: "",
        items: [item],
      });
    }
  }

  return lines
    .sort((a, b) => b.y - a.y)
    .map((line) => {
      const orderedItems = [...line.items].sort((a, b) => a.x - b.x);

      return {
        ...line,
        items: orderedItems,
        text: buildLineText(orderedItems),
      };
    })
    .filter((line) => line.text.length > 0);
}

/**
 * Reconstrói uma linha, acrescentando espaços maiores quando existe
 * uma distância relevante entre dois elementos.
 */
function buildLineText(items: PdfTextItem[]): string {
  let result = "";
  let previousRightEdge: number | null = null;

  for (const item of items) {
    const currentText = item.text.trim();

    if (!currentText) {
      continue;
    }

    if (previousRightEdge !== null) {
      const gap = item.x - previousRightEdge;

      if (gap > 20) {
        result += "    ";
      } else if (gap > 2) {
        result += " ";
      }
    }

    result += currentText;
    previousRightEdge = item.x + item.width;
  }

  return result.trim();
}

export async function readPdf(file: File): Promise<ParsedPdf> {
  if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
    throw new Error("O arquivo selecionado não é um PDF.");
  }

  const arrayBuffer = await file.arrayBuffer();

  const loadingTask = pdfjsLib.getDocument({
    data: arrayBuffer,
  });

  const pdf = await loadingTask.promise;
  const allLines: PdfLine[] = [];

  try {
    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber += 1
    ) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      const pageItems: PdfTextItem[] = content.items.flatMap((item) => {
  // Alguns elementos retornados pelo PDF.js são apenas marcações
  // estruturais e não possuem texto.
  if (!("str" in item)) {
    return [];
  }

  return [
    {
      text: item.str,
      x: item.transform[4],
      y: item.transform[5],
      width: item.width,
      height: item.height,
    },
  ];
}).filter((item) => item.text.trim().length > 0);

      const pageLines = groupItemsIntoLines(pageItems, pageNumber);

      allLines.push(...pageLines);
      page.cleanup();
    }

    const fullText = allLines
      .map((line, index) => {
        const previousPage = allLines[index - 1]?.page;

        if (previousPage && previousPage !== line.page) {
          return `\n--- Página ${line.page} ---\n${line.text}`;
        }

        return line.text;
      })
      .join("\n");

        return {
      fileName: file.name,
      pageCount: pdf.numPages,
      lines: allLines,
      fullText,
    };
  } finally {
    await loadingTask.destroy();
  }
}