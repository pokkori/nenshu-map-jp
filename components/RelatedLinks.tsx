import Link from 'next/link';
import type { PrefectureIncome } from '@/lib/income-data';

interface RelatedLinksProps {
  prefCode: string;
  prefName: string;
  prefNameEn: string;
  jobCode: string;
  jobName: string;
  topJobs: PrefectureIncome[];
}

export function RelatedLinks({
  prefName,
  prefNameEn,
  jobName,
  jobCode,
  topJobs,
}: RelatedLinksProps) {
  return (
    <section aria-label="関連ページ" className="mt-8">
      <h2 className="text-xl font-bold text-white mb-4">関連ページ</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* 同じ都道府県の他職種 */}
        <div className="glass-card backdrop-blur-sm p-4">
          <h3 className="text-blue-200 font-semibold mb-3">{prefName}の他の職種</h3>
          <ul className="space-y-2 list-none" role="list">
            {topJobs.filter(j => j.jobCode !== jobCode).slice(0, 6).map(j => (
              <li key={j.jobCode}>
                <Link
                  href={`/income/${prefNameEn}/${j.jobCode}/`}
                  className="text-blue-300 hover:text-white text-sm transition-colors"
                  aria-label={`${prefName}の${j.jobName}年収を見る`}
                >
                  {j.jobName} - {j.avgAnnualIncome.toFixed(0)}万円
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/income/${prefNameEn}/`}
            className="text-blue-400 hover:text-white text-sm mt-3 inline-block"
            aria-label={`${prefName}の全職種年収一覧を見る`}
          >
            {prefName}の全職種を見る
          </Link>
        </div>

        {/* CTAカード */}
        <div className="glass-card backdrop-blur-sm p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-blue-200 font-semibold mb-3">他の地域の{jobName}</h3>
            <p className="text-blue-300 text-sm">
              全国47都道府県の{jobName}年収を比較できます。
            </p>
          </div>
          <Link
            href={`/income/job/${jobCode}/`}
            className="btn-primary text-center mt-4 inline-block"
            aria-label={`${jobName}の全国年収ランキングを見る`}
          >
            全国ランキングを見る
          </Link>
        </div>
      </div>
    </section>
  );
}
