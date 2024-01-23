import {isEscapeKey} from './utils.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import {sendData} from './api.js';
import {showModal} from './dialogs.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const TAG_ERROR_TEXT = 'Не верно указан Хэш-тег';
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/;
const MAX_HASHTAG_COUNT = 5;
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const form = document.querySelector('.img-upload__form');
const uploadFileField = form.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');
const closeButton = form.querySelector('.img-upload__cancel');
const overlay = form.querySelector('.img-upload__overlay');
const body = document.body;
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
const successModalTemplate = document.querySelector('#success').content.querySelector('.success');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-title',
});

const showPosterForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hidePosterForm = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isElFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt.key) && !isElFocused()) {
    evt.preventDefault();
    hidePosterForm();
  }
}

uploadFileField.addEventListener('change', () => {
  showPosterForm();
});
closeButton.addEventListener('click', () => {
  hidePosterForm();
});

const toggleSubmitButton = (state) => {
  submitButton.disabled = state;
  submitButton.textContent = state ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
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


form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    try {
      toggleSubmitButton(true);
      await sendData(new FormData(evt.target));
      hidePosterForm();
      showModal(successModalTemplate);
    } catch {
      showModal(errorModalTemplate);
    } finally {
      toggleSubmitButton(false);
    }
  }
});

uploadFileField.addEventListener('change', () => {
  const file = uploadFileField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    effectsPreview.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url("${preview.src}")`;
    });
  }
});
