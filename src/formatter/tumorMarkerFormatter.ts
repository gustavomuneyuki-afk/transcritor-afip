import type {
  TumorMarkerData,
} from "../types/exams";

export function formatTumorMarkers(
  data: TumorMarkerData,
): string {
  const parts: string[] = [];

  if (data.afp) {
    parts.push(
      `AFP ${data.afp}`,
    );
  }

  if (data.psaTotal) {
    parts.push(
      `PSA ${data.psaTotal}`,
    );
  }

  if (data.psaFree) {
    parts.push(
      `PSA-L ${data.psaFree}`,
    );
  }

  if (data.psaFreeTotalRatio) {
    parts.push(
      `L/T ${data.psaFreeTotalRatio}`,
    );
  }

  return parts.join(" / ");
}