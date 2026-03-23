import type { Metadata } from 'next';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';

export const metadata: Metadata = {
  title: '利用規約',
  description: '年収マップJPの利用規約。データの利用条件、免責事項について説明します。',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <BreadcrumbNav
          items={[
            { label: 'ホーム', href: '/' },
            { label: '利用規約', href: '/terms/' },
          ]}
        />
        <article aria-label="利用規約" className="glass-card p-8 mt-6">
          <h1 className="text-3xl font-bold text-white mb-6">利用規約</h1>

          <section aria-labelledby="section-use">
            <h2 id="section-use" className="text-xl font-bold text-white mb-3">サービスの利用について</h2>
            <p className="text-blue-200 mb-4">
              年収マップJP（以下「当サイト」）は、政府統計データをもとにした年収情報を無料で提供するWebサービスです。
              当サイトを利用することで、本利用規約に同意したものとみなします。
            </p>
          </section>

          <section aria-labelledby="section-data-use" className="mt-6">
            <h2 id="section-data-use" className="text-xl font-bold text-white mb-3">データの利用条件</h2>
            <p className="text-blue-200 mb-4">
              当サイトのコンテンツは個人的な情報収集目的での閲覧を許可しています。
              コンテンツの無断転載・商用利用は禁止します。
              データ出典として「年収マップJP（nenshu-map.jp）」を明記した引用は許可します。
            </p>
          </section>

          <section aria-labelledby="section-disclaimer" className="mt-6">
            <h2 id="section-disclaimer" className="text-xl font-bold text-white mb-3">免責事項</h2>
            <p className="text-blue-200 mb-4">
              当サイトに掲載する年収データは政府統計（賃金構造基本統計調査）に基づいていますが、
              実際の年収は個人・企業・地域・経験等により大きく異なります。
              当サイトのデータを参考にした意思決定における損害について、当サイトは責任を負いません。
            </p>
          </section>

          <section aria-labelledby="section-changes" className="mt-6">
            <h2 id="section-changes" className="text-xl font-bold text-white mb-3">規約の変更</h2>
            <p className="text-blue-200">
              当サイトは予告なく本利用規約を変更する場合があります。変更後の規約は当ページに掲載された時点で効力を生じます。
            </p>
          </section>

          <p className="text-blue-400 text-sm mt-8">最終更新日: 2026年3月23日</p>
        </article>
      </div>
    </main>
  );
}
