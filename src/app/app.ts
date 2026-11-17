import { renderRoute } from './router';

export function createApp(): void {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    throw new Error('App element not found');
  }

  const main = document.createElement('main');
  app.append(main);

  window.addEventListener('hashchange', () => {
    renderRoute(main);
  });

  renderRoute(main);
}
