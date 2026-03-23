import incomeJson from '../data/income.json';

export interface PrefectureIncome {
  prefCode: string;
  prefName: string;
  jobCode: string;
  jobName: string;
  avgAnnualIncome: number;
  avgAge: number;
  sampleCount: number;
  year: number;
}

export interface Prefecture {
  code: string;
  name: string;
  nameEn: string;
}

export interface Job {
  code: string;
  name: string;
  category: string;
}

interface IncomeDataStore {
  updatedAt: string;
  data: PrefectureIncome[];
  prefectures: Prefecture[];
  jobs: Job[];
}

const store = incomeJson as IncomeDataStore;

/** 全都道府県を返す */
export function getAllPrefectures(): Prefecture[] {
  return store.prefectures;
}

/** 全職種を返す */
export function getAllJobs(): Job[] {
  return store.jobs;
}

/** 都道府県コード → PrefectureIncome[] */
export function getIncomeByPref(prefCode: string): PrefectureIncome[] {
  return store.data.filter(d => d.prefCode === prefCode);
}

/** 職種コード → PrefectureIncome[] */
export function getIncomeByJob(jobCode: string): PrefectureIncome[] {
  return store.data.filter(d => d.jobCode === jobCode);
}

/** 都道府県コード + 職種コード → PrefectureIncome | undefined */
export function getIncomeByPrefAndJob(
  prefCode: string,
  jobCode: string
): PrefectureIncome | undefined {
  return store.data.find(d => d.prefCode === prefCode && d.jobCode === jobCode);
}

/** 都道府県名（日本語）→ Prefecture | undefined */
export function getPrefByName(name: string): Prefecture | undefined {
  return store.prefectures.find(p => p.name === name || p.name.replace(/[都道府県]$/, '') === name);
}

/** 職種名（日本語）→ Job | undefined */
export function getJobByName(name: string): Job | undefined {
  return store.jobs.find(j => j.name === name);
}

/** 都道府県内の最高年収職種トップN件 */
export function getTopJobsByPref(prefCode: string, limit = 10): PrefectureIncome[] {
  return getIncomeByPref(prefCode)
    .sort((a, b) => b.avgAnnualIncome - a.avgAnnualIncome)
    .slice(0, limit);
}

/** 職種内の年収都道府県ランキング */
export function getPrefRankingByJob(jobCode: string): PrefectureIncome[] {
  return getIncomeByJob(jobCode)
    .sort((a, b) => b.avgAnnualIncome - a.avgAnnualIncome);
}

/** データ更新日時を返す */
export function getDataUpdatedAt(): string {
  return store.updatedAt;
}
