import Link from 'next/link';
import { StructuredData } from './StructuredData';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `https://nenshu-map.jp${item.href}`,
    })),
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <nav aria-label="パンくずリスト">
        <ol className="flex flex-wrap gap-1 text-sm text-blue-300" role="list">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true" className="text-blue-500">›</span>}
              {i < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors"
                  aria-label={`${item.label}へ戻る`}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-white font-medium">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
