import {openBigPicture} from './big-picture.js';
import {getData} from './api.js';
import {showAlert} from './dialogs.js';

const picturesContainer = document.querySelector('.pictures');
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

const renderPhotos = (photos) => {
  const galleryFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoEl = createPhotoEl(photo);
    galleryFragment.append(photoEl);
  });

  picturesContainer.append(galleryFragment);
};

export const renderGallery = (photos) => {
  picturesContainer.addEventListener('click', (evt) => {
    const photo = evt.target.closest('[data-photo-id]');

    if (!photo) {
      return;
    }

    evt.preventDefault();
    const picture = photos.find((item) => item.id === +photo.dataset.photoId);

    if (!picture) {
      return;
    }

    openBigPicture(picture);
  });

  renderPhotos(photos);
};

export const loadGallery = async () => {
  try {
    const data = await getData();
    renderGallery(data);
  } catch (err) {
    showAlert(err.message);
  }
};
