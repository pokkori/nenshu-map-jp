import Link from 'next/link';
import { getAllPrefectures } from '@/lib/income-data';
import type { PrefectureIncome } from '@/lib/income-data';

interface ComparisonChartProps {
  data: PrefectureIncome[];
  highlightCode: string;
}

export function ComparisonChart({ data, highlightCode }: ComparisonChartProps) {
  const prefs = getAllPrefectures();
  const maxIncome = Math.max(...data.map(d => d.avgAnnualIncome), 1);

  return (
    <div className="glass-card backdrop-blur-sm p-6" aria-label="都道府県別年収ランキングチャート">
      <ol className="space-y-2" role="list" aria-label="年収ランキング">
        {data.map((d, i) => {
          const pref = prefs.find(p => p.code === d.prefCode);
          const barWidth = (d.avgAnnualIncome / maxIncome) * 100;
          const isHighlight = d.prefCode === highlightCode;

          return (
            <li
              key={d.prefCode}
              className={`flex items-center gap-3 ${isHighlight ? 'bg-white/10 rounded-lg px-3 py-2' : 'px-3 py-1'}`}
              aria-label={`${i + 1}位 ${d.prefName} ${d.avgAnnualIncome.toFixed(0)}万円`}
            >
              {/* 順位 */}
              <span className="text-blue-300 text-sm w-6 text-right flex-shrink-0" aria-hidden="true">
                {i + 1}
              </span>

              {/* 都道府県名リンク */}
              <Link
                href={pref ? `/income/${pref.nameEn}/${d.jobCode}/` : '#'}
                className="text-white text-sm w-20 flex-shrink-0 hover:underline"
                aria-label={`${d.prefName}の${d.jobName}年収ページへ`}
              >
                {d.prefName}
              </Link>

              {/* バー */}
              <div className="flex-1 bg-white/10 rounded-full h-2" role="presentation">
                <div
                  className={`income-bar ${isHighlight ? 'bg-gradient-to-r from-cyan-400 to-blue-400' : ''}`}
                  style={{ width: `${barWidth}%` }}
                  role="presentation"
                />
              </div>

              {/* 年収値 */}
              <span className="text-white text-sm w-16 text-right flex-shrink-0">
                {d.avgAnnualIncome.toFixed(0)}万円
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
