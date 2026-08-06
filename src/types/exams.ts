export type HemogramData = {
  hemoglobin?: string;
  hematocrit?: string;

  leukocytes?: number;
  neutrophils?: number;
  lymphocytes?: number;

  platelets?: number;
};

export type GlycemicData = {
  glucose?: string;
  glycatedHemoglobin?: string;
};

export type RenalData = {
  urea?: string;
  creatinine?: string;
  estimatedGfr?: string;
};

/*
 * Preparação para as próximas sprints
 */

export type LipidData = {
  totalCholesterol?: string;
  hdl?: string;
  ldl?: string;
  vldl?: string;
  triglycerides?: string;
};

export type ElectrolyteData = {
  sodium?: string;
  potassium?: string;
  phosphorus?: string;
  magnesium?: string;
  ionizedCalcium?: string;
  uricAcid?: string;
};

export type UrineProteinData = {
  urineCreatinine?: string;
  urineAlbumin?: string;
  proteinCreatinineRatio?: string;
};

export type HormoneData = {
  tsh?: string;
  freeT4?: string;
};

export type UrinalysisData = {
  protein?: string;
  glucose?: string;
  ketones?: string;
  blood?: string;
  leukocytes?: string;
  nitrite?: string;
  summary?: string;
};

/*
 * Resultado completo do parser.
 * Ainda não utilizaremos tudo, mas isso facilitará
 * muito quando adicionarmos os próximos módulos.
 */

export type ExamResult = {
  hemogram: HemogramData;
  glycemic: GlycemicData;
  renal: RenalData;

  lipid?: LipidData;
  electrolytes?: ElectrolyteData;
  urineProtein?: UrineProteinData;
  hormones?: HormoneData;
  urinalysis?: UrinalysisData;
};