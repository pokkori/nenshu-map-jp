import { render, screen } from '@testing-library/react';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';

describe('BreadcrumbNav', () => {
  const items = [
    { label: 'ホーム', href: '/' },
    { label: '東京都', href: '/income/tokyo/' },
    { label: 'システムエンジニア', href: '/income/tokyo-se/' },
  ];

  test('全パンくずアイテムが表示される', () => {
    render(<BreadcrumbNav items={items} />);
    expect(screen.getByText('ホーム')).toBeInTheDocument();
    expect(screen.getByText('東京都')).toBeInTheDocument();
    expect(screen.getByText('システムエンジニア')).toBeInTheDocument();
  });

  test('最後のアイテムにaria-current="page"が付く', () => {
    render(<BreadcrumbNav items={items} />);
    const current = screen.getByText('システムエンジニア');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  test('nav要素にaria-labelが付く', () => {
    render(<BreadcrumbNav items={items} />);
    expect(screen.getByRole('navigation', { name: 'パンくずリスト' })).toBeInTheDocument();
  });

  test('最後以外のアイテムはリンクとして表示される', () => {
    render(<BreadcrumbNav items={items} />);
    const homeLink = screen.getByRole('link', { name: 'ホームへ戻る' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
