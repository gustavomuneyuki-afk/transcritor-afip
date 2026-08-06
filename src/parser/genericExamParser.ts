import type { PdfLine } from "../utils/pdfReader";

import {
  extractExamValue,
  type ExamDefinition,
} from "./parserUtils";

export function parseDefinitions<
  Key extends string,
>(
  lines: PdfLine[],
  definitions: Record<
    Key,
    ExamDefinition<Key>
  >,
): Partial<Record<Key, string>> {
  const result: Partial<
    Record<Key, string>
  > = {};

  const entries = Object.entries(
    definitions,
  ) as Array<
    [
      Key,
      ExamDefinition<Key>,
    ]
  >;

  for (const [key, definition] of entries) {
    const value = extractExamValue(
      lines,
      definition,
    );

    if (value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}