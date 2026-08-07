import type {
  UrineProteinData,
} from "../types/exams";

export function formatUrineProtein(
  data: UrineProteinData,
): string {
  const parts: string[] = [];

  if (data.urineProtein) {
    parts.push(
      `Ptn urina ${data.urineProtein}`,
    );
  }

  if (data.urineCreatinine) {
    parts.push(
      `Cr urina ${data.urineCreatinine}`,
    );
  }

  if (data.urineAlbumin) {
    parts.push(
      `Alb urina ${data.urineAlbumin}`,
    );
  }

  if (data.proteinCreatinineRatio) {
    parts.push(
      `P/C ${data.proteinCreatinineRatio}`,
    );
  }

  if (data.albuminCreatinineRatio) {
    parts.push(
      `A/C ${data.albuminCreatinineRatio}`,
    );
  }

  return parts.join(" / ");
}