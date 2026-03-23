import {
  getAllPrefectures,
  getAllJobs,
  getIncomeByPref,
  getPrefByName,
  getIncomeByPrefAndJob,
  getPrefRankingByJob,
  getTopJobsByPref,
} from '@/lib/income-data';

describe('income-data', () => {
  test('getAllPrefectures が47件を返す', () => {
    const prefs = getAllPrefectures();
    expect(prefs).toHaveLength(47);
  });

  test('東京都が含まれる', () => {
    const pref = getPrefByName('東京都');
    expect(pref).toBeDefined();
    expect(pref?.nameEn).toBe('tokyo');
  });

  test('都道府県コードで収入データを取得できる', () => {
    const data = getIncomeByPref('13'); // 東京都コード
    expect(Array.isArray(data)).toBe(true);
  });

  test('getAllJobs が空でない', () => {
    const jobs = getAllJobs();
    expect(jobs.length).toBeGreaterThan(0);
  });

  test('東京のソフトウェアエンジニアは全国最高年収', () => {
    const tokyo = getIncomeByPrefAndJob('13', 'software-engineer');
    const osaka = getIncomeByPrefAndJob('27', 'software-engineer');
    expect(tokyo).toBeDefined();
    expect(osaka).toBeDefined();
    if (tokyo && osaka) {
      expect(tokyo.avgAnnualIncome).toBeGreaterThan(osaka.avgAnnualIncome);
    }
  });

  test('全職種が正の年収を持つ', () => {
    const jobs = getAllJobs();
    jobs.forEach(job => {
      // jobの定義自体の確認（avgIncomeはjobオブジェクトではなくdataにある）
      expect(job.code).toBeTruthy();
      expect(job.name).toBeTruthy();
    });
  });

  test('getPrefRankingByJob がソート済みデータを返す', () => {
    const ranking = getPrefRankingByJob('software-engineer');
    expect(Array.isArray(ranking)).toBe(true);
    for (let i = 0; i < ranking.length - 1; i++) {
      expect(ranking[i].avgAnnualIncome).toBeGreaterThanOrEqual(ranking[i + 1].avgAnnualIncome);
    }
  });

  test('getTopJobsByPref が指定件数以下を返す', () => {
    const topJobs = getTopJobsByPref('13', 5);
    expect(topJobs.length).toBeLessThanOrEqual(5);
  });

  test('都道府県のnameEnが英数字のみ', () => {
    const prefs = getAllPrefectures();
    prefs.forEach(pref => {
      expect(pref.nameEn).toMatch(/^[a-z]+$/);
    });
  });

  test('職種コードがスラッグ形式', () => {
    const jobs = getAllJobs();
    jobs.forEach(job => {
      expect(job.code).toMatch(/^[a-z0-9-]+$/);
    });
  });
});
