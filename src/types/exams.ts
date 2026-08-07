export type HemogramData = {
  hemoglobin?: string;
  hematocrit?: string;

  leukocytes?: number;
  neutrophils?: number;
  lymphocytes?: number;

  platelets?: number;

  reticulocytesAbsolute?: number;
  reticulocytesRelative?: string;
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

export type LiverData = {
  ast?: string;
  alt?: string;
  ggt?: string;
  alkalinePhosphatase?: string;
  totalBilirubin?: string;
  directBilirubin?: string;
  indirectBilirubin?: string;
  albumin?: string;
  totalProtein?: string;
};

export type UrineProteinData = {
  urineCreatinine?: string;
  urineAlbumin?: string;
  proteinCreatinineRatio?: string;
  albuminCreatinineRatio?: string;
};

export type HormoneData = {
  tsh?: string;
  freeT4?: string;
  acth?: string;
  cortisol?: string;
  pth?: string;
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
export type InflammatoryData = {
  crp?: string;
  procalcitonin?: string;
  esr?: string;
  ferritin?: string;
};
export type VitaminMetabolismData = {
  iron?: string;
  transferrin?: string;
  transferrinSaturation?: string;
  vitaminB12?: string;
  folate?: string;
  vitaminD?: string;
  zinc?: string;
};
export type ExamResult = {
  hemogram: HemogramData;
  glycemic: GlycemicData;
  renal: RenalData;
  lipid: LipidData;
  electrolytes: ElectrolyteData;
  liver: LiverData;
  inflammatory: InflammatoryData;
  hormones: HormoneData;
  vitaminMetabolism: VitaminMetabolismData;
  urineProtein?: UrineProteinData;
  urinalysis?: UrinalysisData;
  
};