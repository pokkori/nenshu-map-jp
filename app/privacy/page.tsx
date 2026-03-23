import type { Metadata } from 'next';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '年収マップJPのプライバシーポリシー。Google AdSenseによる広告配信に関する説明を含みます。',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <BreadcrumbNav
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'プライバシーポリシー', href: '/privacy/' },
          ]}
        />
        <article aria-label="プライバシーポリシー" className="glass-card p-8 mt-6">
          <h1 className="text-3xl font-bold text-white mb-6">プライバシーポリシー</h1>

          <section aria-labelledby="section-adsense">
            <h2 id="section-adsense" className="text-xl font-bold text-white mb-3">広告の配信について</h2>
            <p className="text-blue-200 mb-4">
              本サイトはGoogle AdSenseを利用しています。Googleはユーザーの興味に基づいて広告を配信するためにCookieを使用することがあります。
              詳細は<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white underline" aria-label="Google プライバシーポリシーを開く（新しいタブ）">Google プライバシーポリシー</a>をご参照ください。
            </p>
          </section>

          <section aria-labelledby="section-analytics" className="mt-6">
            <h2 id="section-analytics" className="text-xl font-bold text-white mb-3">アクセス解析について</h2>
            <p className="text-blue-200">
              本サイトではGoogle Analyticsを使用してアクセス状況を分析しています。収集されるデータは匿名化されており、個人を特定するものではありません。
            </p>
          </section>

          <section aria-labelledby="section-data" className="mt-6">
            <h2 id="section-data" className="text-xl font-bold text-white mb-3">掲載データについて</h2>
            <p className="text-blue-200">
              本サイトに掲載する年収データは、総務省統計局が提供するe-Stat（政府統計の総合窓口）の公開データを使用しています。
              データの正確性・最新性については保証しかねます。
            </p>
          </section>

          <section aria-labelledby="section-cookie" className="mt-6">
            <h2 id="section-cookie" className="text-xl font-bold text-white mb-3">Cookieについて</h2>
            <p className="text-blue-200">
              本サイトではGoogle AdSenseおよびGoogle Analyticsの機能のためにCookieを使用することがあります。
              ブラウザの設定によりCookieを無効にすることができますが、一部の機能が制限される場合があります。
            </p>
          </section>

          <section aria-labelledby="section-contact" className="mt-6">
            <h2 id="section-contact" className="text-xl font-bold text-white mb-3">お問い合わせ</h2>
            <p className="text-blue-200">
              プライバシーポリシーに関するご質問は、サイト内のお問い合わせフォームよりご連絡ください。
            </p>
          </section>

          <p className="text-blue-400 text-sm mt-8">最終更新日: 2026年3月23日</p>
        </article>
      </div>
    </main>
  );
}
