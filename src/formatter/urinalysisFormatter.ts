import type {
  UrinalysisData,
} from "../types/exams";

function parseNumber(
  value?: string,
): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(
    value.replace(",", "."),
  );

  return Number.isNaN(parsed)
    ? undefined
    : parsed;
}

function normalize(
  value?: string,
): string {
  return value
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase() ?? "";
}

export function formatUrinalysis(
  data: UrinalysisData,
): string {
  const parts: string[] = [];

  /*
   * Leucócitos e hemácias:
   * sempre transcrever quando encontrados.
   */

  if (data.leukocytes) {
    parts.push(
      `Leuco ${data.leukocytes}`,
    );
  }

  if (data.redBloodCells) {
    parts.push(
      `Hem ${data.redBloodCells}`,
    );
  }

  /*
   * Densidade:
   * referência AFIP 1005–1030.
   */

  const density =
    parseNumber(data.density);

  if (
    data.density &&
    density !== undefined &&
    (density < 1005 || density > 1030)
  ) {
    parts.push(
      `Dens ${data.density}`,
    );
  }

  /*
   * pH:
   * referência AFIP 5,0–6,0
   * nos laudos validados.
   */

  const ph =
    parseNumber(data.ph);

  if (
    data.ph &&
    ph !== undefined &&
    (ph < 5 || ph > 6)
  ) {
    parts.push(
      `pH ${data.ph}`,
    );
  }

  if (
    data.protein &&
    normalize(data.protein) !==
      "negativo"
  ) {
    parts.push(
      `Ptn ${data.protein}`,
    );
  }

  if (
    data.glucose &&
    normalize(data.glucose) !==
      "negativo"
  ) {
    parts.push(
      `Gli ${data.glucose}`,
    );
  }

  if (
    data.bilirubin &&
    normalize(data.bilirubin) !==
      "negativo"
  ) {
    parts.push(
      `Bil ${data.bilirubin}`,
    );
  }

  if (
    data.ketones &&
    normalize(data.ketones) !==
      "negativo"
  ) {
    parts.push(
      `Cet ${data.ketones}`,
    );
  }

  if (
    data.blood &&
    normalize(data.blood) !==
      "negativo"
  ) {
    parts.push(
      `Sangue ${data.blood}`,
    );
  }

  if (
    data.nitrite &&
    normalize(data.nitrite) !==
      "negativo"
  ) {
    parts.push(
      `Nit ${data.nitrite}`,
    );
  }

  if (
    data.urobilinogen &&
    normalize(
      data.urobilinogen,
    ) !== "normal"
  ) {
    parts.push(
      `Urob ${data.urobilinogen}`,
    );
  }

  if (
    data.epithelialCells &&
    normalize(
      data.epithelialCells,
    ) !== "raras"
  ) {
    parts.push(
      `Cel ep ${data.epithelialCells}`,
    );
  }

  if (
    data.crystals &&
    normalize(data.crystals) !==
      "ausentes"
  ) {
    parts.push(
      `Cristais ${data.crystals}`,
    );
  }

  if (
    data.casts &&
    normalize(data.casts) !==
      "ausentes"
  ) {
    parts.push(
      `Cil ${data.casts}`,
    );
  }

  /*
   * No parser atual, "Inferior a 1,0"
   * aparece inicialmente como "Inferior".
   * Portanto isso é considerado normal.
   */

  if (
    data.bacteria &&
    !normalize(
      data.bacteria,
    ).startsWith("inferior")
  ) {
    parts.push(
      `Bact ${data.bacteria}`,
    );
  }

  if (parts.length === 0) {
    return "";
  }

  return `U1: ${parts.join(" / ")}`;
}