import { filters } from '../../data/filters';

export function Sidebar(onChange: (selected: string[]) => void): HTMLElement {
  const aside = document.createElement('aside');
  aside.className = 'sidebar';

  const selected: string[] = [];

  const title = document.createElement('h2');
  title.textContent = 'Categories';

  aside.append(title);

  filters.candleType.forEach(({ value, label }) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = value;

    const wrapper = document.createElement('label');
    wrapper.className = 'sidebar-option';

    const text = document.createElement('span');
    text.textContent = label;

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        selected.push(value);
      } else {
        const index = selected.indexOf(value);
        selected.splice(index, 1);
      }

      onChange(selected);
    });

    wrapper.append(checkbox, text);
    aside.append(wrapper);
  });

  return aside;
}
