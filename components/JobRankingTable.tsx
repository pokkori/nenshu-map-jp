import Link from 'next/link';
import type { PrefectureIncome } from '@/lib/income-data';

interface JobRankingTableProps {
  jobs: PrefectureIncome[];
  prefNameEn: string;
}

export function JobRankingTable({ jobs, prefNameEn }: JobRankingTableProps) {
  return (
    <div className="glass-card backdrop-blur-sm overflow-hidden" aria-label="職種別年収ランキングテーブル">
      <table className="w-full" role="table" aria-label="職種別平均年収一覧">
        <thead>
          <tr className="border-b border-white/10">
            <th scope="col" className="px-4 py-3 text-left text-blue-200 font-semibold text-sm">順位</th>
            <th scope="col" className="px-4 py-3 text-left text-blue-200 font-semibold text-sm">職種</th>
            <th scope="col" className="px-4 py-3 text-right text-blue-200 font-semibold text-sm">平均年収</th>
            <th scope="col" className="px-4 py-3 text-right text-blue-200 font-semibold text-sm sr-only">詳細</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, i) => (
            <tr
              key={job.jobCode}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="px-4 py-3 text-blue-300 text-sm">{i + 1}</td>
              <td className="px-4 py-3">
                <Link
                  href={`/income/${prefNameEn}/${job.jobCode}/`}
                  className="text-white hover:text-blue-300 transition-colors"
                  aria-label={`${job.jobName}の年収詳細ページへ`}
                >
                  {job.jobName}
                </Link>
              </td>
              <td className="px-4 py-3 text-right text-white font-semibold">
                {job.avgAnnualIncome.toFixed(0)}万円
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/income/${prefNameEn}/${job.jobCode}/`}
                  className="text-blue-400 hover:text-white text-sm min-h-[44px] inline-flex items-center"
                  aria-label={`${job.jobName}の詳細を見る`}
                >
                  詳細
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
