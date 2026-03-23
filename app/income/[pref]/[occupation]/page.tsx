import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllPrefectures,
  getAllJobs,
  getIncomeByPrefAndJob,
  getPrefRankingByJob,
  getTopJobsByPref,
} from '@/lib/income-data';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { IncomeCard } from '@/components/IncomeCard';
import { ComparisonChart } from '@/components/ComparisonChart';
import { RelatedLinks } from '@/components/RelatedLinks';
import { AdSenseBanner } from '@/components/AdSenseBanner';
import { ShareButtons } from '@/components/ShareButtons';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ pref: string; occupation: string }>;
}

export async function generateStaticParams(): Promise<{ pref: string; occupation: string }[]> {
  const prefs = getAllPrefectures();
  const jobs = getAllJobs();
  const params: { pref: string; occupation: string }[] = [];
  for (const pref of prefs) {
    for (const job of jobs) {
      params.push({ pref: pref.nameEn, occupation: job.code });
    }
  }
  return params;
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const prefs = getAllPrefectures();
  const jobs = getAllJobs();
  const pref = prefs.find(p => p.nameEn === params.pref);
  const job = jobs.find(j => j.code === params.occupation);
  if (!pref || !job) return { title: 'ページが見つかりません' };

  const income = getIncomeByPrefAndJob(pref.code, job.code);
  const incomeStr = income ? `平均年収${income.avgAnnualIncome.toFixed(0)}万円` : '年収データ';

  const title = `${job.name}の年収 ${pref.name}版 | ${incomeStr}`;
  const description = `${pref.name}の${job.name}の平均年収は${incomeStr}（${income?.year ?? 2022}年・政府統計）。都道府県別ランキングや他職種との比較も掲載。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://nenshu-map.jp/income/${params.pref}/${params.occupation}/`,
      siteName: '年収マップJP',
      images: [
        {
          url: `https://nenshu-map.jp/api/og?pref=${encodeURIComponent(pref.name)}&job=${encodeURIComponent(job.name)}&income=${income?.avgAnnualIncome ?? 0}`,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'ja_JP',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://nenshu-map.jp/api/og?pref=${encodeURIComponent(pref.name)}&job=${encodeURIComponent(job.name)}&income=${income?.avgAnnualIncome ?? 0}`],
    },
    alternates: { canonical: `https://nenshu-map.jp/income/${params.pref}/${params.occupation}/` },
  };
}

export default async function IncomeDetailPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const prefs = getAllPrefectures();
  const jobs = getAllJobs();
  const pref = prefs.find(p => p.nameEn === params.pref);
  const job = jobs.find(j => j.code === params.occupation);
  if (!pref || !job) notFound();

  const income = getIncomeByPrefAndJob(pref.code, job.code);
  const prefRanking = getPrefRankingByJob(job.code);
  const topJobsInPref = getTopJobsByPref(pref.code, 10);
  const myRank = prefRanking.findIndex(d => d.prefCode === pref.code) + 1;

  const shareText = income
    ? `${pref.name}の${job.name}の平均年収は${income.avgAnnualIncome.toFixed(0)}万円（全国${myRank}位）。あなたの年収と比較してみよう #年収マップJP`
    : `${pref.name}の${job.name}の年収を調べてみた #年収マップJP`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${pref.name}の${job.name}平均年収`,
    description: `${pref.name}における${job.name}の平均年収データ（政府統計・賃金構造基本統計調査）`,
    url: `https://nenshu-map.jp/income/${params.pref}/${params.occupation}/`,
    creator: { '@type': 'Organization', name: '年収マップJP' },
    dateModified: new Date().toISOString().split('T')[0],
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* パンくずリスト */}
          <BreadcrumbNav
            items={[
              { label: 'ホーム', href: '/' },
              { label: pref.name, href: `/income/${pref.nameEn}/` },
              { label: job.name, href: `/income/${params.pref}/${params.occupation}/` },
            ]}
          />

          {/* メインカード */}
          <section aria-label={`${pref.name}の${job.name}年収データ`} className="mt-6">
            <h1 className="text-3xl font-bold text-white mb-6">
              {pref.name}の{job.name}の平均年収
            </h1>
            {income ? (
              <IncomeCard
                income={income}
                rank={myRank || 1}
                totalPrefs={prefRanking.length || 1}
              />
            ) : (
              <div className="glass-card p-8 text-center">
                <p className="text-blue-200 text-lg mb-2">データ取得中</p>
                <p className="text-blue-300 text-sm">このデータは現在取得中です。</p>
              </div>
            )}
          </section>

          {/* AdSense中間バナー */}
          <AdSenseBanner slot="2345678901" format="rectangle" className="my-8" />

          {/* 都道府県別ランキング */}
          {prefRanking.length > 0 && (
            <section aria-label="都道府県別年収ランキング" className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                {job.name}の都道府県別年収ランキング
              </h2>
              <ComparisonChart data={prefRanking} highlightCode={pref.code} />
            </section>
          )}

          {/* シェアボタン */}
          <ShareButtons
            text={shareText}
            url={`https://nenshu-map.jp/income/${params.pref}/${params.occupation}/`}
          />

          {/* 関連ページリンク */}
          <RelatedLinks
            prefCode={pref.code}
            prefName={pref.name}
            prefNameEn={pref.nameEn}
            jobCode={job.code}
            jobName={job.name}
            topJobs={topJobsInPref}
          />

          {/* AdSenseフッターバナー */}
          <AdSenseBanner slot="3456789012" format="horizontal" className="mt-8" />
        </div>
      </main>
    </>
  );
}
