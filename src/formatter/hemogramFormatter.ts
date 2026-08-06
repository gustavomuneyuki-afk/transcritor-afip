import type { HemogramData } from "../types/exams";

function formatInteger(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatHemogram(data: HemogramData): string {
  const parts: string[] = [];

  if (data.hemoglobin) {
    parts.push(`Hb ${data.hemoglobin}`);
  }

  if (data.hematocrit) {
    parts.push(`Ht ${data.hematocrit}%`);
  }

  if (data.leukocytes !== undefined) {
    let leukocyteText = `Leuco ${formatInteger(data.leukocytes)}`;

    const differential: string[] = [];

    if (data.neutrophils !== undefined) {
      differential.push(`N ${formatInteger(data.neutrophils)}`);
    }

    if (data.lymphocytes !== undefined) {
      differential.push(`Linf ${formatInteger(data.lymphocytes)}`);
    }

    if (differential.length > 0) {
      leukocyteText += ` (${differential.join(" / ")})`;
    }

    parts.push(leukocyteText);
  }

  if (data.platelets !== undefined) {
    parts.push(`Plaq ${formatInteger(data.platelets)}`);
  }

  return parts.join(" / ");
}