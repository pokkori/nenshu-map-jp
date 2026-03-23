import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPrefectures, getAllJobs } from '@/lib/income-data';
import { SearchBox } from '@/components/SearchBox';
import { PrefectureGrid } from '@/components/PrefectureGrid';
import { AdSenseBanner } from '@/components/AdSenseBanner';
import { StreakBadge } from '@/components/StreakBadge';

export const metadata: Metadata = {
  title: '年収マップJP | 都道府県×職種別 平均年収データベース',
  description:
    '都道府県と職種で絞り込める日本の年収データベース。政府統計（e-Stat）をもとに、47都道府県・職種の平均年収をひとめでわかる形で提供します。',
  openGraph: {
    title: '年収マップJP | 都道府県×職種別 平均年収データベース',
    description:
      '政府統計（賃金構造基本統計調査）をもとに47都道府県×職種の平均年収を提供。',
    url: 'https://nenshu-map.jp/',
    siteName: '年収マップJP',
    images: [{ url: 'https://nenshu-map.jp/og-image.png', width: 1200, height: 630 }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '年収マップJP | 都道府県×職種別 平均年収',
    description: '政府統計から47都道府県×職種の平均年収を検索',
    images: ['https://nenshu-map.jp/og-image.png'],
  },
  alternates: { canonical: 'https://nenshu-map.jp/' },
};

const CATEGORIES = ['技術系', '医療系', '事務系', '営業系', '製造系', 'サービス系', '教育系', '建設系'];

export default function HomePage() {
  const prefectures = getAllPrefectures();
  const jobs = getAllJobs();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
      {/* ヒーローセクション */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          年収マップJP
        </h1>
        <StreakBadge eventKey="nenshu_map" />
        <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
          政府統計から47都道府県×職種の平均年収を検索
        </p>
        <SearchBox prefectures={prefectures} jobs={jobs} />
      </section>

      {/* 上部AdSenseバナー */}
      <div className="container mx-auto px-4 mb-8">
        <AdSenseBanner slot="1234567890" format="horizontal" />
      </div>

      {/* 都道府県グリッド */}
      <section className="container mx-auto px-4 pb-16" aria-label="都道府県一覧">
        <h2 className="text-2xl font-bold text-white mb-6">都道府県から探す</h2>
        <PrefectureGrid prefectures={prefectures} />
      </section>

      {/* 職種カテゴリ一覧 */}
      <section className="container mx-auto px-4 pb-16" aria-label="職種カテゴリ一覧">
        <h2 className="text-2xl font-bold text-white mb-6">職種カテゴリから探す</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              href={`/income/category/${encodeURIComponent(cat)}/`}
              className="glass-card p-4 text-center text-white hover:bg-white/20 transition-colors min-h-[44px] flex items-center justify-center"
              aria-label={`${cat}の職種一覧を見る`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* 人気ページへのリンク */}
      <section className="container mx-auto px-4 pb-16" aria-label="人気の年収ページ">
        <h2 className="text-2xl font-bold text-white mb-6">人気の年収ページ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: '東京都のソフトウェアエンジニア', href: '/income/tokyo/software-engineer/' },
            { label: '東京都の医師', href: '/income/tokyo/doctor/' },
            { label: '大阪府のシステムエンジニア', href: '/income/osaka/system-engineer/' },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="glass-card p-4 text-blue-200 hover:text-white transition-colors min-h-[44px] flex items-center"
              aria-label={`${link.label}の年収を見る`}
            >
              {link.label}の年収
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
