import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://nenshu-map-jp.vercel.app'),
  title: {
    default: '年収マップJP | 都道府県×職種別 平均年収データベース',
    template: '%s | 年収マップJP',
  },
  description: '政府統計（e-Stat）から47都道府県×職種の平均年収を検索。無料・登録不要。',
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "年収マップJPのデータはどこから取得していますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "政府の統計データベース「e-Stat（政府統計の総合窓口）」から取得した47都道府県×職種別の平均年収データを使用しています。信頼性の高い公式統計データをもとに作成しています。"
      }
    },
    {
      "@type": "Question",
      "name": "無料で利用できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、完全無料・登録不要でご利用いただけます。全機能を無償で提供しています。"
      }
    },
    {
      "@type": "Question",
      "name": "どの都道府県・職種のデータが調べられますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "北海道から沖縄まで全47都道府県のデータに対応しています。職種はIT・医療・教育・建設・製造・サービス業など主要職種を網羅しています。"
      }
    },
    {
      "@type": "Question",
      "name": "データの更新頻度はどのくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "政府統計（e-Stat）の更新タイミングに合わせて年次更新しています。最新の統計年度のデータを掲載しています。"
      }
    },
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        {/* Google AdSense（本番ID取得後にdata-ad-client値を差し替え） */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'}`}
          crossOrigin="anonymous"
        />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* ナビゲーション */}
        <header role="banner" className="glass-card backdrop-blur-sm mx-4 mt-4 px-6 py-3 sticky top-4 z-50">
          <nav aria-label="メインナビゲーション" className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-white"
              aria-label="年収マップJP トップページへ"
            >
              年収マップJP
            </Link>
            <ul className="flex gap-4 list-none" role="list">
              <li>
                <Link
                  href="/income/"
                  className="text-blue-200 hover:text-white transition-colors text-sm"
                  aria-label="年収一覧を見る"
                >
                  年収一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/about/"
                  className="text-blue-200 hover:text-white transition-colors text-sm"
                  aria-label="サイトについて"
                >
                  このサイトについて
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* メインコンテンツ */}
        {children}

        {/* フッター */}
        <footer role="contentinfo" className="mt-16 py-8 border-t border-white/10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-blue-300 text-sm mb-2">
              データ出典: 総務省統計局 e-Stat（賃金構造基本統計調査）
            </p>
            <p className="text-blue-400 text-xs mb-4">
              掲載データは政府統計をもとに作成しています。実際の年収は個人差があります。
            </p>
            <nav aria-label="フッターナビゲーション">
              <ul className="flex justify-center gap-4 list-none flex-wrap">
                <li>
                  <Link href="/privacy/" className="text-blue-300 hover:text-white text-sm" aria-label="プライバシーポリシー">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link href="/terms/" className="text-blue-300 hover:text-white text-sm" aria-label="利用規約">
                    利用規約
                  </Link>
                </li>
                <li>
                  <Link href="/about/" className="text-blue-300 hover:text-white text-sm" aria-label="このサイトについて">
                    このサイトについて
                  </Link>
                </li>
              </ul>
            </nav>
            <p className="text-blue-400 text-xs mt-4">
              Copyright 2026 年収マップJP. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
