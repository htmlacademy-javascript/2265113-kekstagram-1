import {debounce} from './utils.js';
import {getNewData} from './data.js';
import {renderGallery} from './gallery.js';

const RERENDER_DELAY = 500;
const PHOTOS_COUNT = 10;

const filters = document.querySelector('.img-filters');
let activeFilter = filters.querySelector('[id="filter-default"]');

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getFilteredPhotos = () => {
  switch (activeFilter.id) {
    case 'filter-random':
      return [...getNewData()].sort(sortRandomly).slice(0, PHOTOS_COUNT);
    case 'filter-discussed':
      return [...getNewData()].sort(sortByComments);
    default:
      return [...getNewData()];
  }
};

function onFiltersClick(evt) {
  const imgFiltersButton = evt.target.classList.contains('img-filters__button');
  const activeFilterButton = (evt.target === activeFilter && activeFilter.id !== 'filter-random');

  if (!imgFiltersButton || activeFilterButton) {
    return;
  }

  const clickedFilter = evt.target;
  activeFilter.classList.remove('img-filters__button--active');
  clickedFilter.classList.add('img-filters__button--active');
  activeFilter = clickedFilter;

  renderGallery(getFilteredPhotos());
}

const debouncedOnFiltersClick = debounce(onFiltersClick, RERENDER_DELAY);

export const initializeFilter = () => {
  filters.classList.remove('img-filters--inactive');
  filters.addEventListener('click', debouncedOnFiltersClick);
};
