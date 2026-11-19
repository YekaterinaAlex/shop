// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest';
import { CatalogPage } from './CatalogPage';

vi.mock('../../components/sidebar/Sidebar', () => ({
  Sidebar: () => {
    const aside = document.createElement('aside');
    aside.className = 'sidebar';
    return aside;
  },
}));

vi.mock('../../components/product-card/ProductCard', () => ({
  ProductCard: (product: { name: string }) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.textContent = product.name;
    return card;
  },
}));

describe('CatalogPage', () => {
  it('renders the hero title', () => {
    const page = CatalogPage();

    const title = page.querySelector('h1');

    expect(title?.textContent).toBe('Shop Candles');
  });

  it('renders the search input', () => {
    const page = CatalogPage();

    const search = page.querySelector<HTMLInputElement>('.catalog-search');

    expect(search).not.toBeNull();
    expect(search?.placeholder).toBe('Search candles...');
  });

  it('renders the sidebar', () => {
    const page = CatalogPage();

    expect(page.querySelector('.sidebar')).not.toBeNull();
  });

  it('renders product cards', () => {
    const page = CatalogPage();

    const cards = page.querySelectorAll('.product-card');

    expect(cards).toHaveLength(12);
  });

  it('filters cards when user types in search', () => {
    const page = CatalogPage();

    const search = page.querySelector<HTMLInputElement>('.catalog-search');

    if (!search) {
      throw new Error('Search input not found');
    }

    search.value = 'cloud';
    search.dispatchEvent(new Event('input', { bubbles: true }));

    const cards = page.querySelectorAll('.product-card');

    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toBe('Cloud');
  });

  it('shows a message when no products match', () => {
    const page = CatalogPage();

    const search = page.querySelector<HTMLInputElement>('.catalog-search');

    if (!search) {
      throw new Error('Search input not found');
    }

    search.value = 'xyz';
    search.dispatchEvent(new Event('input', { bubbles: true }));

    expect(page.querySelectorAll('.product-card')).toHaveLength(0);

    expect(page.querySelector('.no-products')?.textContent).toBe(
      'No products found. Try a different search.',
    );
  });

  it('restores products when search is cleared', () => {
    const page = CatalogPage();

    const search = page.querySelector<HTMLInputElement>('.catalog-search');

    if (!search) {
      throw new Error('Search input not found');
    }

    search.value = 'cloud';
    search.dispatchEvent(new Event('input', { bubbles: true }));

    search.value = '';
    search.dispatchEvent(new Event('input', { bubbles: true }));

    expect(page.querySelectorAll('.product-card')).toHaveLength(12);
  });
});
