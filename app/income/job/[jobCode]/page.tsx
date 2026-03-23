import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllJobs, getPrefRankingByJob } from '@/lib/income-data';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { ComparisonChart } from '@/components/ComparisonChart';
import { AdSenseBanner } from '@/components/AdSenseBanner';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: { jobCode: string };
}

export async function generateStaticParams(): Promise<{ jobCode: string }[]> {
  return getAllJobs().map(j => ({ jobCode: j.code }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const job = getAllJobs().find(j => j.code === params.jobCode);
  if (!job) return { title: 'ページが見つかりません' };

  const title = `${job.name}の年収 都道府県別ランキング`;
  const description = `${job.name}の都道府県別平均年収ランキング。どの都道府県が年収が高いか、政府統計データで比較できます。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://nenshu-map.jp/income/job/${params.jobCode}/`,
      siteName: '年収マップJP',
      images: [{ url: 'https://nenshu-map.jp/og-image.png', width: 1200, height: 630 }],
      locale: 'ja_JP',
      type: 'website',
    },
    alternates: { canonical: `https://nenshu-map.jp/income/job/${params.jobCode}/` },
  };
}

export default function JobRankingPage({ params }: PageProps) {
  const job = getAllJobs().find(j => j.code === params.jobCode);
  if (!job) notFound();

  const ranking = getPrefRankingByJob(job.code);
  const topPref = ranking[0];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${job.name}の都道府県別年収ランキング`,
    url: `https://nenshu-map.jp/income/job/${params.jobCode}/`,
    numberOfItems: ranking.length,
    itemListElement: ranking.slice(0, 10).map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${d.prefName} - ${d.avgAnnualIncome.toFixed(0)}万円`,
    })),
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav
            items={[
              { label: 'ホーム', href: '/' },
              { label: `${job.name}年収ランキング`, href: `/income/job/${params.jobCode}/` },
            ]}
          />
          <h1 className="text-3xl font-bold text-white mt-6 mb-2">
            {job.name}の都道府県別年収ランキング
          </h1>
          {topPref && (
            <p className="text-blue-200 mb-6">
              1位: {topPref.prefName}（平均{topPref.avgAnnualIncome.toFixed(0)}万円）
            </p>
          )}
          <AdSenseBanner slot="6789012345" format="horizontal" className="mb-8" />
          {ranking.length > 0 ? (
            <ComparisonChart data={ranking} highlightCode="" />
          ) : (
            <div className="glass-card p-8 text-center">
              <p className="text-blue-200">現在、{job.name}の都道府県別データを取得中です。</p>
            </div>
          )}
          <AdSenseBanner slot="7890123456" format="rectangle" className="mt-8" />
        </div>
      </main>
    </>
  );
}
