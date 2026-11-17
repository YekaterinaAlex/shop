import { AboutPage } from '../pages/about/AboutPage';
import { CatalogPage } from '../pages/catalog/CatalogPage';
import { CartPage } from '../pages/cart/CartPage';
import { NotFoundPage } from '../pages/not-found/NotFoundPage';

const routes: Record<string, () => HTMLElement> = {
  '/': AboutPage,
  '/catalog': CatalogPage,
  '/cart': CartPage,
};

export function renderRoute(container: HTMLElement): void {
  const path = window.location.hash.slice(1) || '/';

  const renderPage = routes[path] ?? NotFoundPage;

  container.replaceChildren(renderPage());
}
