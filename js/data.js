import {getData} from './api.js';
import {showAlert} from './dialogs.js';

const PHOTOS_COUNT = 10;

let photos = [];

export const loadData = async () => {
  try {
    const data = await getData();
    photos = [...data];
  } catch (err) {
    showAlert(err.message);
  }
};

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

export const getFilteredPhotos = (activeFilter) => {
  switch (activeFilter.id) {
    case 'filter-random':
      return [...photos].sort(sortRandomly).slice(0, PHOTOS_COUNT);
    case 'filter-discussed':
      return [...photos].sort(sortByComments);
    default:
      return [...photos];
  }
};
