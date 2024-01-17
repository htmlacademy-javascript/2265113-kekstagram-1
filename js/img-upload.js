import {isEscapeKey} from './utils.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './notifications.js';

const TAG_ERROR_TEXT = 'Не верно указан Хэш-тег';
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/;
const MAX_HASHTAG_COUNT = 5;
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const form = document.querySelector('.img-upload__form');
const uploadFileField = form.querySelector('.img-upload__input');
const closeButton = form.querySelector('.img-upload__cancel');
const overlay = form.querySelector('.img-upload__overlay');
const body = document.body;
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-title',
});

export const removeEventListener = () => document.removeEventListener('keydown', onDocumentKeydown);

export const addEventListener = () => document.addEventListener('keydown', onDocumentKeydown);

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  addEventListener();
};

export const hideModal = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  removeEventListener();
};

const isElFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt.key) && !isElFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

uploadFileField.addEventListener('change', () => {
  showModal();
});
closeButton.addEventListener('click', () => {
  hideModal();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const isTagsUnique = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());

  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const isTagsCountValid = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);

  return tags.every(isValidTag) && isTagsUnique(tags) && isTagsCountValid(tags);
};

pristine.addValidator(hashtagField, validateTags, TAG_ERROR_TEXT);

export const setOnFormSubmit = () => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      try {
        blockSubmitButton();
        await sendData(new FormData(evt.target));
        hideModal();
        showSuccessMessage();
      } catch {
        showErrorMessage();
      }
      unblockSubmitButton();
    }
  });
};
