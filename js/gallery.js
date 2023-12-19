import {createUsersPhotoList} from './data.js';

const picturesContainer = document.querySelector('.pictures');

picturesContainer.querySelector('.pictures__title').classList.remove('visually-hidden');

const similarPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarPhotoList = createUsersPhotoList();

const similarListFragment = document.createDocumentFragment();

similarPhotoList.forEach(({url, description, likes, comments}) => {
  const photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__info').textContent = description;
  photoElement.querySelector('.picture__likes').count = likes;
  photoElement.querySelector('.picture__comments').count = comments;
  similarListFragment.appendChild(photoElement);
});

picturesContainer.appendChild(similarListFragment);
