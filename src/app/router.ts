import { AboutPage } from '../pages/about/AboutPage';
import { CatalogPage } from '../pages/catalog/CatalogPage';
import { CartPage } from '../pages/cart/CartPage';
import { NotFoundPage } from '../pages/not-found/NotFoundPage';
import { ProductDetailsPage } from '../pages/product-details/ProductDetailsPage';

const routes: Record<string, () => HTMLElement> = {
  '/': AboutPage,
  '/catalog': CatalogPage,
  '/cart': CartPage,
};

export function renderRoute(container: HTMLElement): void {
  const path = window.location.hash.slice(1) || '/';

  if (path.startsWith('/product/')) {
    const id = Number(path.split('/')[2]);

    container.replaceChildren(ProductDetailsPage(id));
    return;
  }

  const renderPage = routes[path] ?? NotFoundPage;

  container.replaceChildren(renderPage());
}
