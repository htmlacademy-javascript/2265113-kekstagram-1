import {getData} from './api.js';

let data = [];

export const loadData = async () => {
  data = await getData();
};

export const getPhotoList = () => data.slice();
