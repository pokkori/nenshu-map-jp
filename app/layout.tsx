import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nenshu-map.jp'),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
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
        <header role="banner" className="glass-card mx-4 mt-4 px-6 py-3 sticky top-4 z-50">
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
