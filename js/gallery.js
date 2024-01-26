import {openBigPicture} from './big-picture.js';
import {getPhotoList} from './data.js';

const picturesContainer = document.querySelector('.photos-container');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPhotoEl = ({ url, description, likes, comments, id }) => {
  const photoEl = similarPhotoTemplate.cloneNode(true);

  photoEl.querySelector('.picture__img').src = url;
  photoEl.querySelector('.picture__img').alt = description;
  photoEl.querySelector('.picture__likes').textContent = likes;
  photoEl.querySelector('.picture__comments').textContent = comments.length;
  photoEl.dataset.photoId = id;

  return photoEl;
};

export const renderGallery = (photos) => {
  picturesContainer.innerHTML = '';

  const galleryFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoEl = createPhotoEl(photo);
    galleryFragment.append(photoEl);
  });

  picturesContainer.append(galleryFragment);
};

picturesContainer.addEventListener('click', (evt) => {
  const photo = evt.target.closest('[data-photo-id]');

  if (!photo) {
    return;
  }

  evt.preventDefault();
  const photos = getPhotoList();
  const picture = photos.find((item) => item.id === +photo.dataset.photoId);

  if (!picture) {
    return;
  }

  openBigPicture(picture);
});
