import {
  AlertTriangle,
  CheckCircle2,
  Code2,
} from "lucide-react";

import type { DebugReport } from "../types/debug";

type DeveloperPanelProps = {
  report: DebugReport | null;
};

export function DeveloperPanel({
  report,
}: DeveloperPanelProps) {
  if (!report) {
    return (
      <section className="developerPanel">
        <div className="developerPanelHeader">
          <Code2 size={19} aria-hidden="true" />
          <h2>Diagnóstico da extração</h2>
        </div>

        <p className="developerEmpty">
          Selecione um PDF para gerar o relatório.
        </p>
      </section>
    );
  }

  const foundCount = report.exams.filter(
    (exam) => exam.found,
  ).length;

  return (
    <section className="developerPanel">
      <div className="developerPanelHeader">
        <Code2 size={19} aria-hidden="true" />
        <h2>Diagnóstico da extração</h2>
      </div>

      <div className="developerSummary">
        <span>
          Páginas: <strong>{report.pageCount}</strong>
        </span>

        <span>
          Linhas: <strong>{report.lineCount}</strong>
        </span>

        <span>
          Encontrados:{" "}
          <strong>
            {foundCount}/{report.exams.length}
          </strong>
        </span>
      </div>

      <div className="developerList">
        {report.exams.map((exam) => (
          <div
            className={
              exam.found
                ? "developerItem developerItemFound"
                : "developerItem developerItemMissing"
            }
            key={exam.key}
          >
            {exam.found ? (
              <CheckCircle2
                size={17}
                aria-hidden="true"
              />
            ) : (
              <AlertTriangle
                size={17}
                aria-hidden="true"
              />
            )}

            <span>{exam.message}</span>
          </div>
        ))}
      </div>
    </section>
  );
}