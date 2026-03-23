/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // 画像最適化
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // TypeScript・ESLintエラーでビルド失敗させる
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // 静的生成ページ数が多いためタイムアウトを延長
  staticPageGenerationTimeout: 300,
};

export default nextConfig;
