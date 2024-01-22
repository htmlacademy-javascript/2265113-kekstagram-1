import {getFilteredPhotos} from './data.js';
import {debounce} from './utils.js';

const RERENDER_DELAY = 500;

const filters = document.querySelector('.img-filters');
let activeFilter = filters.querySelector('[id="filter-default"]');

export const initializeFilter = (cb) => {
  filters.classList.remove('img-filters--inactive');

  filters.addEventListener('click', (evt) => {
    const clickedFilter = evt.target;

    if (!clickedFilter.classList.contains('img-filters__button') || (clickedFilter === activeFilter && activeFilter.id !== 'filter-random')) {
      return;
    }

    activeFilter.classList.remove('img-filters__button--active');
    clickedFilter.classList.add('img-filters__button--active');
    activeFilter = clickedFilter;

    cb(getFilteredPhotos(activeFilter, RERENDER_DELAY));
  });
};
