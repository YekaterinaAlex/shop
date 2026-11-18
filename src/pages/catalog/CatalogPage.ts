import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card/ProductCard';
import { Sidebar } from '../../components/sidebar/Sidebar';

import './catalog.css';

export function CatalogPage(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'catalog';

  const title = document.createElement('h1');
  title.className = 'catalog-title';
  title.textContent = 'Shop Candles';

  const grid = document.createElement('div');
  grid.className = 'catalog-grid';

  const sidebar = Sidebar(renderProducts);

  const layout = document.createElement('div');
  layout.className = 'layout';

  function renderProducts(categories: string[], waxTypes: string[]): void {
    const filtered = products.filter((product) => {
      const matchesCategory = categories.length === 0 || categories.includes(product.candleType);

      const matchesWax = waxTypes.length === 0 || waxTypes.includes(product.waxType);

      return matchesCategory && matchesWax;
    });

    const cards = filtered.map((product) => ProductCard(product));

    grid.replaceChildren(...cards);
  }

  layout.append(sidebar, grid);
  section.append(title, layout);

  renderProducts([], []);

  return section;
}
