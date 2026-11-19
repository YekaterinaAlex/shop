import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card/ProductCard';
import { Sidebar } from '../../components/sidebar/Sidebar';
import type { SortOption } from '../../utils/sortProducts';
import { getVisibleProducts } from '../../utils/getVisibleProducts';

import heroImage from '../../assets/images/hero.png';

import './catalog.css';

export function CatalogPage(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'catalog';
  const hero = document.createElement('div');
  hero.className = 'catalog-hero';

  hero.style.backgroundImage = `url("${heroImage}")`;

  const heroContent = document.createElement('div');
  heroContent.className = 'catalog-hero-content';

  const subtitle = document.createElement('p');
  subtitle.className = 'catalog-hero-subtitle';
  subtitle.textContent = 'OUR COLLECTION';

  const title = document.createElement('h1');
  title.className = 'catalog-title';
  title.textContent = 'Shop Candles';

  const description = document.createElement('p');
  description.className = 'catalog-hero-description';
  description.textContent = 'Products You Can Feel Good About';

  heroContent.append(subtitle, title, description);

  hero.append(heroContent);

  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.placeholder = 'Search candles...';
  searchInput.className = 'catalog-search';
  searchInput.setAttribute('aria-label', 'Search products');

  let searchQuery = '';

  const grid = document.createElement('div');
  grid.className = 'catalog-grid';

  const sidebar = Sidebar(renderProducts);

  const layout = document.createElement('div');
  layout.className = 'layout';

  let currentCategories: string[] = [];
  let currentWaxTypes: string[] = [];
  let currentSort: SortOption = 'featured';
  let currentMinPrice = 11;
  let currentMaxPrice = 26;

  function renderProducts(
    categories: string[],
    waxTypes: string[],
    sortBy: SortOption,
    minPrice: number,
    maxPrice: number,
  ): void {
    currentCategories = categories;
    currentWaxTypes = waxTypes;
    currentSort = sortBy;
    currentMinPrice = minPrice;
    currentMaxPrice = maxPrice;

    const visibleProducts = getVisibleProducts(products, {
      categories,
      waxTypes,
      minPrice,
      maxPrice,
      searchQuery,
      sortBy,
    });

    const cards = visibleProducts.map((product) => ProductCard(product));

    grid.replaceChildren(...cards);

    if (cards.length === 0) {
      const message = document.createElement('p');
      message.textContent = 'No products found. Try a different search.';
      message.className = 'no-products';

      grid.append(message);
    }
  }

  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.trim().toLowerCase();

    renderProducts(
      currentCategories,
      currentWaxTypes,
      currentSort,
      currentMinPrice,
      currentMaxPrice,
    );
  });

  const catalogContent = document.createElement('div');
  catalogContent.className = 'catalog-content';

  catalogContent.append(searchInput, grid);

  layout.append(sidebar, catalogContent);
  section.append(hero, layout);

  renderProducts([], [], 'featured', 11, 26);

  return section;
}
