import {isEscapeKey} from './utils.js';
import {addEventListener, removeEventListener} from './img-upload.js';

const ALERT_SHOW_TIME = 5000;

const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorButton = errorMessage.querySelector('.error__button');
const successButton = successMessage.querySelector('.success__button');

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const hideMessage = () => {
  if (!successMessage.classList.contains('hidden')) {
    successMessage.classList.add('hidden');
  } else if (!errorMessage.classList.contains('hidden')) {
    errorMessage.classList.add('hidden');
  }
  document.removeEventListener('keydown', (onDocumentKeydown));
  document.removeEventListener('click', (onDocumentClick));
};

export const showSuccessMessage = () => {
  successMessage.classList.remove('hidden');

  document.body.append(successMessage);

  document.addEventListener('keydown', (onDocumentKeydown));
  document.addEventListener('click', (onDocumentClick));
};

export const showErrorMessage = () => {
  errorMessage.classList.remove('hidden');

  document.body.append(errorMessage);

  removeEventListener();
  document.addEventListener('keydown', (onDocumentKeydown));
  document.addEventListener('click', (onDocumentClick));
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    hideMessage();
    addEventListener();
  }
}

function onDocumentClick(evt) {
  const success = document.querySelector('.success__inner');
  const error = document.querySelector('.error__inner');
  if (!success.contains(evt.target) || !error.contains(evt.target)) {
    evt.preventDefault();
    hideMessage();
  }
}

successButton.addEventListener('click', () => {
  hideMessage();
});

errorButton.addEventListener('click', () => {
  hideMessage();
});

