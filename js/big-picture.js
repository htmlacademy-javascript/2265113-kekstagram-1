import {isEscapeKey} from './utils.js';

const COMMENTS_PER_STEP = 5;
const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const photoComments = bigPicture.querySelector('.social__comments');
const newComment = document.querySelector('#comment').content;
let commentsShown = +bigPicture.querySelector('.current-comments').textContent;
let pictureData = {};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const createComment = ({ avatar, message, name }) => {
  const commentEl = newComment.cloneNode(true);

  const commentImg = commentEl.querySelector('.social__picture');
  commentImg.src = avatar;
  commentImg.alt = name;
  commentEl.querySelector('.social__text').textContent = message;

  return commentEl;
};

const renderComments = (comments) => {
  commentsShown += COMMENTS_PER_STEP;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const commentsFragment = document.createDocumentFragment();

  for (let i = 0; i < commentsShown; i++) {
    const commentEl = createComment(comments[i]);
    commentsFragment.append(commentEl);
  }

  photoComments.innerHTML = '';
  photoComments.append(commentsFragment);
  commentCount.innerHTML = `<span class="current-comments">${commentsShown}</span> из <span class="comments-count">${comments.length}</span> комментариев`;
};

const renderPhotoDetails = ({ url, likes, comments, description }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const shownComments = () => {
  renderComments(pictureData.comments);
};

export const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  pictureData = data;

  renderPhotoDetails(data);

  renderComments(data.comments);

  commentsLoader.addEventListener('click', shownComments);
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsShown = 0;

  commentsLoader.removeEventListener('click', shownComments);
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureClose.addEventListener('click', () => {
  closeBigPicture();
});


