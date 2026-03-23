import type { PrefectureIncome } from '@/lib/income-data';

interface IncomeCardProps {
  income: PrefectureIncome;
  rank: number;
  totalPrefs: number;
}

export function IncomeCard({ income, rank, totalPrefs }: IncomeCardProps) {
  const rankBadgeClass =
    rank === 1 ? 'rank-badge rank-badge-1' :
    rank === 2 ? 'rank-badge rank-badge-2' :
    rank === 3 ? 'rank-badge rank-badge-3' :
    'rank-badge rank-badge-other';

  return (
    <div className="glass-card p-8" aria-label={`${income.prefName}の${income.jobName}年収データ`}>
      <div className="flex items-center gap-4 mb-6">
        <span className={rankBadgeClass} aria-label={`全国${rank}位`}>
          {rank}
        </span>
        <div>
          <p className="text-blue-200 text-sm">全国{rank}位 / {totalPrefs}都道府県中</p>
          <p className="text-blue-300 text-xs">{income.year}年・政府統計</p>
        </div>
      </div>

      {/* メインの年収表示 */}
      <div className="text-center py-6 border-y border-white/10">
        <p className="text-blue-200 text-sm mb-2">平均年収</p>
        <p className="text-6xl font-bold text-white mb-1" aria-label={`平均年収 ${income.avgAnnualIncome.toFixed(0)}万円`}>
          {income.avgAnnualIncome.toFixed(0)}
          <span className="text-2xl ml-1 text-blue-200">万円</span>
        </p>
        <p className="text-blue-300 text-sm">
          月収換算: 約{(income.avgAnnualIncome / 12).toFixed(0)}万円
        </p>
      </div>

      {/* 詳細情報 */}
      <dl className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <dt className="text-blue-300 text-sm">平均年齢</dt>
          <dd className="text-white font-semibold">
            {income.avgAge > 0 ? `${income.avgAge}歳` : 'データなし'}
          </dd>
        </div>
        <div>
          <dt className="text-blue-300 text-sm">調査年</dt>
          <dd className="text-white font-semibold">{income.year}年</dd>
        </div>
        <div>
          <dt className="text-blue-300 text-sm">都道府県</dt>
          <dd className="text-white font-semibold">{income.prefName}</dd>
        </div>
        <div>
          <dt className="text-blue-300 text-sm">職種</dt>
          <dd className="text-white font-semibold">{income.jobName}</dd>
        </div>
      </dl>
    </div>
  );
}
