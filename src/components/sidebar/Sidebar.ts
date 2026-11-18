import { filters } from '../../data/filters';
import type { SortOption } from '../../utils/sortProducts';
import './sidebar.css';

export function Sidebar(
  onChange: (categories: string[], waxTypes: string[], sortBy: SortOption) => void,
): HTMLElement {
  const aside = document.createElement('aside');
  aside.className = 'sidebar';

  const selectedCategories: string[] = [];
  const selectedWaxTypes: string[] = [];
  let selectedSort: SortOption = 'featured';

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

      onChange(selectedCategories, selectedWaxTypes, selectedSort);
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

      onChange(selectedCategories, selectedWaxTypes, selectedSort);
    });

    wrapper.append(checkbox, text);
    aside.append(wrapper);
  });

  const sortTitle = document.createElement('h2');
  sortTitle.textContent = 'Sort By';

  aside.append(sortTitle);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];

  sortOptions.forEach(({ value, label }) => {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'sort';
    radio.value = value;

    radio.addEventListener('change', () => {
      if (radio.checked) {
        selectedSort = value as SortOption;

        onChange(selectedCategories, selectedWaxTypes, selectedSort);
      }
    });

    if (value === 'featured') {
      radio.checked = true;
    }

    const wrapper = document.createElement('label');
    wrapper.className = 'sidebar-option';

    const text = document.createElement('span');
    text.textContent = label;

    wrapper.append(radio, text);
    aside.append(wrapper);
  });

  const priceTitle = document.createElement('h2');
  priceTitle.textContent = 'Price Range';

  const priceRange = document.createElement('div');
  priceRange.className = 'price-range';

  const activeTrack = document.createElement('div');
  activeTrack.className = 'price-range-active';

  priceRange.append(activeTrack);

  const minSlider = document.createElement('input');
  minSlider.type = 'range';
  minSlider.min = '11';
  minSlider.max = '26';
  minSlider.value = '11';
  minSlider.setAttribute('aria-label', 'Minimum price');

  const maxSlider = document.createElement('input');
  maxSlider.type = 'range';
  maxSlider.min = '11';
  maxSlider.max = '26';
  maxSlider.value = '26';
  maxSlider.setAttribute('aria-label', 'Maximum price');

  function updateTrack(): void {
    const min = Number(minSlider.value);
    const max = Number(maxSlider.value);

    activeTrack.style.left = `${((min - 11) / 15) * 100}%`;
    activeTrack.style.width = `${((max - min) / 15) * 100}%`;

    if (min === max && min === 11) {
      maxSlider.style.zIndex = '3';
      minSlider.style.zIndex = '2';
    } else if (min === max && max === 26) {
      minSlider.style.zIndex = '3';
      maxSlider.style.zIndex = '2';
    } else {
      minSlider.style.zIndex = '2';
      maxSlider.style.zIndex = '3';
    }
  }

  updateTrack();

  updateTrack();

  const priceLabels = document.createElement('div');
  priceLabels.className = 'price-labels';

  const minLabel = document.createElement('span');
  minLabel.textContent = '$11';

  const maxLabel = document.createElement('span');
  maxLabel.textContent = '$26';

  priceLabels.append(minLabel, maxLabel);
  priceRange.append(minSlider, maxSlider);

  const selectedPrice = document.createElement('p');
  selectedPrice.className = 'selected-price';
  selectedPrice.textContent = '$11 – $26';

  minSlider.addEventListener('input', () => {
    const min = Math.min(Number(minSlider.value), Number(maxSlider.value));

    minSlider.value = String(min);
    selectedPrice.textContent = `$${min} – $${maxSlider.value}`;

    updateTrack();
  });

  maxSlider.addEventListener('input', () => {
    const max = Math.max(Number(maxSlider.value), Number(minSlider.value));

    maxSlider.value = String(max);
    selectedPrice.textContent = `$${minSlider.value} – $${max}`;

    updateTrack();
  });

  aside.append(priceTitle, selectedPrice, priceRange, priceLabels);

  return aside;
}
