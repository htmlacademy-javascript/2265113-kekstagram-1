import {debounce} from './utils.js';
import {getPhotoList} from './data.js';
import {renderGallery} from './gallery.js';

const RERENDER_DELAY = 500;
const PHOTOS_COUNT = 10;
const Filter = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filters = document.querySelector('.img-filters');

let activeFilter = filters.querySelector('[id="filter-default"]');

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getFilteredPhotos = () => {
  const photos = getPhotoList();

  switch (activeFilter.id) {
    case Filter.RANDOM:
      return photos.sort(sortRandomly).slice(0, PHOTOS_COUNT);
    case Filter.DISCUSSED:
      return photos.sort(sortByComments);
    default:
      return photos;
  }
};

const renderFilteredPhotos = (evt) => {
  const isImgFiltersButton = evt.target.classList.contains('img-filters__button');
  const isActiveFilterButton = (evt.target === activeFilter && activeFilter.id !== 'filter-random');

  if (!isImgFiltersButton || isActiveFilterButton) {
    return;
  }

  const clickedFilter = evt.target;
  activeFilter.classList.remove('img-filters__button--active');
  clickedFilter.classList.add('img-filters__button--active');
  activeFilter = clickedFilter;

  renderGallery(getFilteredPhotos());
};

const onFiltersClick = debounce(renderFilteredPhotos, RERENDER_DELAY);

export const initializeFilters = () => {
  filters.classList.remove('img-filters--inactive');
  filters.addEventListener('click', onFiltersClick);
};
