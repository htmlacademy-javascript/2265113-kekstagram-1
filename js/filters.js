const PHOTOS_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filters = document.querySelector('.img-filters');
let activeFilter = Filter.DEFAULT;
let photos = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

export const getFilteredPhotos = () => {
  switch (activeFilter) {
    case Filter.RANDOM:
      return [...photos].sort(sortRandomly).slice(0, PHOTOS_COUNT);
    case Filter.DISCUSSED:
      return [...photos].sort(sortByComments);
    default:
      return [...photos];
  }
};

const setOnFilterClick = (cb) => {
  filters.addEventListener('click', (evt) => {
    const clickedFilter = evt.target;

    if (!clickedFilter.classList.contains('img-filters__button') || clickedFilter.id === activeFilter) {
      return;
    }

    filters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedFilter.classList.add('img-filters__button--active');
    activeFilter = clickedFilter.id;

    cb(getFilteredPhotos());
  });
};

export const initializeFilter = (loadedPhotos, cb) => {
  filters.classList.remove('img-filters--inactive');
  photos = [...loadedPhotos];

  setOnFilterClick(cb);
};
