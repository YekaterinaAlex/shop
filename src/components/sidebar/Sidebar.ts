import { filters } from '../../data/filters';
import './sidebar.css';

export function Sidebar(onChange: (categories: string[], waxTypes: string[]) => void): HTMLElement {
  const aside = document.createElement('aside');
  aside.className = 'sidebar';

  const selectedCategories: string[] = [];
  const selectedWaxTypes: string[] = [];

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
        selectedCategories.push(value);
      } else {
        const index = selectedCategories.indexOf(value);
        selectedCategories.splice(index, 1);
      }

      onChange(selectedCategories, selectedWaxTypes);
    });

    wrapper.append(checkbox, text);
    aside.append(wrapper);
  });

  const waxTitle = document.createElement('h2');
  waxTitle.textContent = 'Wax Type';

  aside.append(waxTitle);

  filters.waxType.forEach(({ value, label }) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = value;

    const wrapper = document.createElement('label');
    wrapper.className = 'sidebar-option';

    const text = document.createElement('span');
    text.textContent = label;

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        selectedWaxTypes.push(value);
      } else {
        const index = selectedWaxTypes.indexOf(value);
        selectedWaxTypes.splice(index, 1);
      }

      onChange(selectedCategories, selectedWaxTypes);
    });

    wrapper.append(checkbox, text);
    aside.append(wrapper);
  });
  return aside;
}
