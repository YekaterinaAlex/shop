import { renderRoute } from './router';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';

export function createApp(): void {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    throw new Error('App element not found');
  }

  const header = Header();
  const main = document.createElement('main');
  const footer = Footer();

  app.replaceChildren(header, main, footer);

  window.addEventListener('hashchange', () => {
    renderRoute(main);
  });

  renderRoute(main);
}
