import type { Metadata } from 'next';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';

export const metadata: Metadata = {
  title: 'このサイトについて',
  description: '年収マップJPは政府統計（e-Stat）をもとに47都道府県×職種別の平均年収データを提供するサービスです。',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <BreadcrumbNav
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'このサイトについて', href: '/about/' },
          ]}
        />
        <article aria-label="サイト概要" className="glass-card p-8 mt-6">
          <h1 className="text-3xl font-bold text-white mb-6">年収マップJPについて</h1>

          <section aria-labelledby="section-about">
            <h2 id="section-about" className="text-xl font-bold text-white mb-3">サービス概要</h2>
            <p className="text-blue-200 mb-4">
              年収マップJPは、総務省統計局が提供する政府統計（賃金構造基本統計調査）のデータをもとに、
              47都道府県×職種別の平均年収情報をわかりやすく提供するサービスです。
            </p>
            <p className="text-blue-200 mb-4">
              転職・就活・キャリア検討の際に、自分の職種の相場年収を都道府県別に確認できます。
              会員登録不要・無料でご利用いただけます。
            </p>
          </section>

          <section aria-labelledby="section-data-source" className="mt-6">
            <h2 id="section-data-source" className="text-xl font-bold text-white mb-3">データソース</h2>
            <p className="text-blue-200 mb-4">
              掲載データは以下の政府統計を使用しています：
            </p>
            <ul className="text-blue-200 list-disc list-inside space-y-2 mb-4">
              <li>賃金構造基本統計調査（厚生労働省・最新版）</li>
              <li>e-Stat 政府統計の総合窓口（総務省統計局）</li>
            </ul>
            <p className="text-blue-300 text-sm">
              データは定期的に更新されます。最新の数値は各官公庁の公式サイトをご確認ください。
            </p>
          </section>

          <section aria-labelledby="section-features" className="mt-6">
            <h2 id="section-features" className="text-xl font-bold text-white mb-3">主な機能</h2>
            <ul className="text-blue-200 list-disc list-inside space-y-2">
              <li>都道府県×職種の組み合わせで平均年収を検索</li>
              <li>都道府県別年収ランキング（全47都道府県）</li>
              <li>職種別全国年収ランキング</li>
              <li>X・LINEへのシェア機能</li>
              <li>政府統計に基づく信頼性の高いデータ</li>
            </ul>
          </section>

          <p className="text-blue-400 text-sm mt-8">最終更新日: 2026年3月23日</p>
        </article>
      </div>
    </main>
  );
}
