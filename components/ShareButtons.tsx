'use client';

interface ShareButtonsProps {
  text: string;
  url: string;
}

export function ShareButtons({ text, url }: ShareButtonsProps) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: '年収マップJP', text, url });
      } catch {
        // ユーザーがキャンセルした場合は何もしない
      }
    } else {
      // フォールバック: URLをクリップボードにコピー
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
        alert('クリップボードにコピーしました');
      } catch {
        // clipboard API非対応の場合は何もしない
      }
    }
  };

  return (
    <section aria-label="シェア" className="my-8">
      <h3 className="text-lg font-bold text-white mb-4">この情報をシェア</h3>
      <div className="flex flex-wrap gap-3">
        {/* X（旧Twitter）シェア */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-share bg-black text-white"
          aria-label="X（旧Twitter）でシェアする"
        >
          X でシェア
        </a>

        {/* LINEシェア */}
        <a
          href={`https://line.me/R/msg/text/?${encodedText}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-share bg-green-500 text-white"
          aria-label="LINEでシェアする"
        >
          LINE でシェア
        </a>

        {/* ネイティブシェア / クリップボード */}
        <button
          type="button"
          onClick={handleNativeShare}
          className="btn-share bg-blue-600 text-white"
          aria-label="その他の方法でシェアする"
        >
          その他でシェア
        </button>
      </div>
    </section>
  );
}
