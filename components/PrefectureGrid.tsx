import Link from 'next/link';
import type { Prefecture } from '@/lib/income-data';

interface PrefectureGridProps {
  prefectures: Prefecture[];
}

// 地方区分
const REGIONS: { name: string; prefs: string[] }[] = [
  { name: '北海道・東北', prefs: ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'] },
  { name: '関東', prefs: ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'] },
  { name: '中部', prefs: ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'] },
  { name: '近畿', prefs: ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'] },
  { name: '中国・四国', prefs: ['鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県'] },
  { name: '九州・沖縄', prefs: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'] },
];

export function PrefectureGrid({ prefectures }: PrefectureGridProps) {
  return (
    <div className="space-y-6">
      {REGIONS.map(region => (
        <div key={region.name}>
          <h3 className="text-blue-300 text-sm font-semibold mb-3">{region.name}</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {region.prefs.map(prefName => {
              const pref = prefectures.find(p => p.name === prefName);
              if (!pref) return null;
              return (
                <Link
                  key={pref.code}
                  href={`/income/${pref.nameEn}/`}
                  className="glass-card px-3 py-2 text-center text-white text-sm hover:bg-white/20 transition-colors min-h-[44px] flex items-center justify-center"
                  aria-label={`${pref.name}の年収情報を見る`}
                >
                  {pref.name.replace(/[都道府県]$/, '')}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
