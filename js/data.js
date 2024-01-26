import {getPhotos} from './api.js';

let photos = [];

export const loadData = async () => {
  photos = await getPhotos();
};

export const getPhotoList = () => photos.slice();
