export type DebugExamStatus = {
  key: string;
  label: string;
  found: boolean;
  value?: string;
  message: string;
};

export type DebugReport = {
  pageCount: number;
  lineCount: number;
  exams: DebugExamStatus[];
};