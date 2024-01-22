import {getFilteredPhotos} from './data.js';

const filters = document.querySelector('.img-filters');
let activeFilter = filters.querySelector('[id="filter-default"]');

export const filter = (cb) => {
  cb(getFilteredPhotos(activeFilter));
};

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

    filter(cb);
  });
};
