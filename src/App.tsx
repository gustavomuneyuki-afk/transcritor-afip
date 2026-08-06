import {
  useState,
  type ChangeEvent,
} from "react";

import {
  Check,
  Copy,
  FileText,
  LoaderCircle,
} from "lucide-react";

import "./App.css";

import { DeveloperPanel } from "./components/DeveloperPanel";
import { formatAllExams } from "./formatter/formatAllExams";
import { createDebugReport } from "./parser/createDebugReport";
import { parseAllExams } from "./parser/parseAllExams";
import type { DebugReport } from "./types/debug";
import { readPdf } from "./utils/pdfReader";

function App() {
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [developerMode, setDeveloperMode] =
    useState(false);

  const [debugReport, setDebugReport] =
    useState<DebugReport | null>(null);

  async function handleFile(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFileName(file.name);
    setResult("");
    setStatus("");
    setError("");
    setCopied(false);
    setDebugReport(null);
    setIsReading(true);

    try {
      const parsedPdf = await readPdf(file);
      const exams = parseAllExams(parsedPdf.lines);
      const formattedResult =
        formatAllExams(exams);

      if (!formattedResult) {
        throw new Error(
          "Não foi possível identificar exames compatíveis neste PDF.",
        );
      }

      const report = createDebugReport(
        exams,
        parsedPdf.pageCount,
        parsedPdf.lines.length,
      );

      setResult(formattedResult);
      setDebugReport(report);

      setStatus(
        `PDF lido: ${parsedPdf.pageCount} página${
          parsedPdf.pageCount === 1 ? "" : "s"
        }. Transcrição gerada.`,
      );
    } catch (unknownError) {
      const message =
        unknownError instanceof Error
          ? unknownError.message
          : "Não foi possível processar o PDF.";

      setError(message);
    } finally {
      setIsReading(false);
      event.target.value = "";
    }
  }

  async function handleCopy() {
    if (!result) {
      return;
    }

    setError("");

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setError(
        "O navegador não permitiu copiar o resultado.",
      );
    }
  }

  return (
    <main className="app">
      <section className="card">
        <header className="header">
          <div className="logo">
            <FileText
              size={30}
              aria-hidden="true"
            />
          </div>

          <div>
            <h1>Transcritor AFIP</h1>

            <p>
              Selecione um PDF da AFIP para gerar a
              transcrição.
            </p>
          </div>
        </header>

        <label className="filePicker">
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFile}
            disabled={isReading}
          />

          <span className="fileButton">
            Selecionar PDF
          </span>

          <span className="fileName">
            {fileName ||
              "Nenhum arquivo selecionado"}
          </span>
        </label>

        <div
          className="status"
          aria-live="polite"
        >
          {isReading && (
            <>
              <LoaderCircle
                className="spinner"
                size={18}
                aria-hidden="true"
              />

              Lendo e processando o PDF...
            </>
          )}

          {!isReading && status && status}
        </div>

        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}

        <label
          className="resultLabel"
          htmlFor="result"
        >
          Transcrição
        </label>

        <textarea
          id="result"
          value={result}
          placeholder="A transcrição aparecerá aqui..."
          readOnly
        />

        <button
          className="copyButton"
          type="button"
          onClick={handleCopy}
          disabled={!result || isReading}
        >
          {copied ? (
            <Check
              size={18}
              aria-hidden="true"
            />
          ) : (
            <Copy
              size={18}
              aria-hidden="true"
            />
          )}

          {copied ? "Copiado!" : "Copiar"}
        </button>

        <label className="developerToggle">
          <input
            type="checkbox"
            checked={developerMode}
            onChange={(event) =>
              setDeveloperMode(
                event.target.checked,
              )
            }
          />

          <span>Modo desenvolvedor</span>
        </label>

        {developerMode && (
          <DeveloperPanel
            report={debugReport}
          />
        )}
      </section>
    </main>
  );
}

export default App;