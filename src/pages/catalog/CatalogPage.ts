import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card/ProductCard';
import './catalog.css';

export function CatalogPage(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'catalog';

  const title = document.createElement('h1');
  title.className = 'catalog-title';
  title.textContent = 'Shop Candles';

  const grid = document.createElement('div');
  grid.className = 'catalog-grid';

  products.forEach((product) => {
    grid.append(ProductCard(product));
  });

  section.append(title, grid);

  return section;
}
