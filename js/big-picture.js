import {isEscapeKey} from './utils.js';

const COMMENTS_PER_STEP = 5;
const DEFAULT_COMMENTS_SHOWN = 0;

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const photoComments = bigPicture.querySelector('.social__comments');
const commentsCount = commentCount.querySelector('.comments-count');
const currentComment = commentCount.querySelector('.current-comments');
const similarCommentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

let commentsShown = +bigPicture.querySelector('.current-comments').textContent;
let pictureComments = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const createCommentEl = ({ avatar, message, name }) => {
  const commentEl = similarCommentTemplate.cloneNode(true);

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
    const commentEl = createCommentEl(comments[i]);
    commentsFragment.append(commentEl);
  }

  photoComments.innerHTML = '';
  photoComments.append(commentsFragment);
  currentComment.textContent = commentsShown;
};

const renderPhotoDetails = ({ url, likes, comments, description }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const onCommentsLoaderClick = () => {
  renderComments(pictureComments);
};

export const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  commentsCount.textContent = data.comments.length;
  pictureComments = data.comments;

  renderPhotoDetails(data);
  renderComments(data.comments);
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsShown = DEFAULT_COMMENTS_SHOWN;

  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});


