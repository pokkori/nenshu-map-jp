'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';

interface AdSenseBannerProps {
  /** AdSense広告スロットID（本番取得後に差し替え） */
  slot: string;
  /** レイアウト形式 */
  format: 'horizontal' | 'rectangle' | 'vertical';
  /** 追加CSSクラス */
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSenseBanner({ slot, format, className }: AdSenseBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSenseが未ロードの場合は無視
    }
  }, []);

  const adStyle: Record<string, string> = {
    horizontal: 'display:block',
    rectangle: 'display:inline-block;width:300px;height:250px',
    vertical: 'display:block',
  };

  const dataAdFormat: Record<string, string> = {
    horizontal: 'auto',
    rectangle: 'rectangle',
    vertical: 'auto',
  };

  return (
    <div
      className={clsx('adsense-wrapper', className)}
      aria-label="広告"
      role="complementary"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: adStyle[format] as 'block' | 'inline-block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'}
        data-ad-slot={slot}
        data-ad-format={dataAdFormat[format]}
        data-full-width-responsive="true"
      />
    </div>
  );
}
