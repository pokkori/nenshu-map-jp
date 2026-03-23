'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Prefecture, Job } from '@/lib/income-data';

interface SearchBoxProps {
  prefectures: Prefecture[];
  jobs: Job[];
}

export function SearchBox({ prefectures, jobs }: SearchBoxProps) {
  const router = useRouter();
  const [selectedPref, setSelectedPref] = useState('');
  const [selectedJob, setSelectedJob] = useState('');

  const handleSearch = () => {
    if (!selectedPref || !selectedJob) {
      alert('都道府県と職種の両方を選択してください');
      return;
    }
    const pref = prefectures.find(p => p.code === selectedPref);
    if (!pref) return;
    router.push(`/income/${pref.nameEn}/${selectedJob}/`);
  };

  return (
    <div
      className="glass-card p-6 max-w-2xl mx-auto"
      role="search"
      aria-label="年収検索フォーム"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* 都道府県選択 */}
        <div className="flex-1">
          <label htmlFor="pref-select" className="block text-blue-200 text-sm mb-2 font-medium">
            都道府県
          </label>
          <select
            id="pref-select"
            value={selectedPref}
            onChange={e => setSelectedPref(e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[44px]"
            aria-label="都道府県を選択"
            aria-required="true"
          >
            <option value="" className="bg-gray-900">都道府県を選択</option>
            {prefectures.map(p => (
              <option key={p.code} value={p.code} className="bg-gray-900">
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* 職種選択 */}
        <div className="flex-1">
          <label htmlFor="job-select" className="block text-blue-200 text-sm mb-2 font-medium">
            職種
          </label>
          <select
            id="job-select"
            value={selectedJob}
            onChange={e => setSelectedJob(e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[44px]"
            aria-label="職種を選択"
            aria-required="true"
          >
            <option value="" className="bg-gray-900">職種を選択</option>
            {jobs.map(j => (
              <option key={j.code} value={j.code} className="bg-gray-900">
                {j.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 検索ボタン */}
      <button
        type="button"
        onClick={handleSearch}
        className="btn-primary w-full mt-4"
        aria-label="年収を検索する"
        disabled={!selectedPref || !selectedJob}
      >
        年収を調べる
      </button>
    </div>
  );
}
