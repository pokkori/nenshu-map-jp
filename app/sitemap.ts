import { MetadataRoute } from 'next';
import { getAllPrefectures, getAllJobs } from '@/lib/income-data';

const BASE_URL = 'https://nenshu-map.jp';

export default function sitemap(): MetadataRoute.Sitemap {
  const prefs = getAllPrefectures();
  const jobs = getAllJobs();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy/`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms/`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const prefPages: MetadataRoute.Sitemap = prefs.map(pref => ({
    url: `${BASE_URL}/income/${pref.nameEn}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const jobPages: MetadataRoute.Sitemap = jobs.map(job => ({
    url: `${BASE_URL}/income/job/${job.code}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const detailPages: MetadataRoute.Sitemap = prefs.flatMap(pref =>
    jobs.map(job => ({
      url: `${BASE_URL}/income/${pref.nameEn}/${job.code}/`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...prefPages, ...jobPages, ...detailPages];
}
