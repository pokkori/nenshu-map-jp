import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPrefectures, getTopJobsByPref } from '@/lib/income-data';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { JobRankingTable } from '@/components/JobRankingTable';
import { AdSenseBanner } from '@/components/AdSenseBanner';
import { StructuredData } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ pref: string }>;
}

export async function generateStaticParams(): Promise<{ pref: string }[]> {
  return getAllPrefectures().map(p => ({ pref: p.nameEn }));
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const pref = getAllPrefectures().find(p => p.nameEn === params.pref);
  if (!pref) return { title: 'ページが見つかりません' };

  const title = `${pref.name}の平均年収ランキング | 職種別一覧`;
  const description = `${pref.name}の職種別平均年収ランキング。政府統計（賃金構造基本統計調査）をもとに、${pref.name}で年収が高い職種・低い職種を一覧で確認できます。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://nenshu-map.jp/income/${pref.nameEn}/`,
      siteName: '年収マップJP',
      images: [{ url: 'https://nenshu-map.jp/og-image.png', width: 1200, height: 630 }],
      locale: 'ja_JP',
      type: 'website',
    },
    alternates: { canonical: `https://nenshu-map.jp/income/${pref.nameEn}/` },
  };
}

export default async function PrefTopPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const pref = getAllPrefectures().find(p => p.nameEn === params.pref);
  if (!pref) notFound();

  const topJobs = getTopJobsByPref(pref.code, 50);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${pref.name}の職種別平均年収ランキング`,
    url: `https://nenshu-map.jp/income/${pref.nameEn}/`,
    numberOfItems: topJobs.length,
    itemListElement: topJobs.slice(0, 10).map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: d.jobName,
      url: `https://nenshu-map.jp/income/${pref.nameEn}/${d.jobCode}/`,
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
              { label: pref.name, href: `/income/${pref.nameEn}/` },
            ]}
          />
          <h1 className="text-3xl font-bold text-white mt-6 mb-2">
            {pref.name}の平均年収ランキング
          </h1>
          <p className="text-blue-200 mb-6">
            政府統計（賃金構造基本統計調査）をもとにした職種別年収データ
          </p>
          <AdSenseBanner slot="4567890123" format="horizontal" className="mb-8" />
          {topJobs.length > 0 ? (
            <JobRankingTable jobs={topJobs} prefNameEn={pref.nameEn} />
          ) : (
            <div className="glass-card p-8 text-center">
              <p className="text-blue-200">現在、{pref.name}の年収データを取得中です。</p>
            </div>
          )}
          <AdSenseBanner slot="5678901234" format="rectangle" className="mt-8" />
        </div>
      </main>
    </>
  );
}
