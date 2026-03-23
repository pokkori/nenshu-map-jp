import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pref = searchParams.get('pref') ?? '東京都';
  const job = searchParams.get('job') ?? 'システムエンジニア';
  const income = parseFloat(searchParams.get('income') ?? '500');

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 50%, #312e81 100%)',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: '32px',
            color: '#93c5fd',
            marginBottom: '16px',
            fontWeight: '600',
          }}
        >
          年収マップJP
        </div>
        <div
          style={{
            fontSize: '48px',
            color: 'white',
            fontWeight: '700',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          {pref}の{job}
        </div>
        <div
          style={{
            fontSize: '80px',
            color: '#34d399',
            fontWeight: '700',
            marginBottom: '16px',
          }}
        >
          平均年収 {income.toFixed(0)}万円
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#bfdbfe',
          }}
        >
          政府統計（賃金構造基本統計調査）より
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
