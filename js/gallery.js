const picturesContainer = document.querySelector('.pictures');
picturesContainer.querySelector('.pictures__title').classList.remove('visually-hidden');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPhotoEl = ({url, description, likes, comments}) => {
  const photoEl = similarPhotoTemplate.cloneNode(true);
  photoEl.querySelector('.picture__img').src = url;
  photoEl.querySelector('.picture__img').alt = description;
  photoEl.querySelector('.picture__likes').textContent = likes;
  photoEl.querySelector('.picture__comments').textContent = comments.length;
  return photoEl;
};

export const renderGallery = (photos) => {
  const galleryFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const photoEl = createPhotoEl(photo);
    galleryFragment.append(photoEl);
  });
  picturesContainer.append(galleryFragment);
};

