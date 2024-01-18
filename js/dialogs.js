import {isEscapeKey} from './utils.js';

const ALERT_SHOW_TIME = 5000;

const errorModal = document.querySelector('#error').content.querySelector('.error');
const successModal = document.querySelector('#success').content.querySelector('.success');
let modal;

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error__alert');

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const hideModal = () => {
  modal.remove();

  document.removeEventListener('keydown', (onDocumentKeydown));
  document.removeEventListener('click', (onDocumentClick));
};

export const showMessage = (status) => {
  if (status === 'success') {
    modal = successModal.cloneNode(true);
  } else {
    modal = errorModal.cloneNode(true);
    modal.classList.add('stop');
  }

  const modalButton = modal.querySelector('.modal__button');

  document.body.append(modal);

  modalButton.addEventListener('click', () => {
    hideModal();
  });
  document.addEventListener('keydown', (onDocumentKeydown));
  document.addEventListener('click', (onDocumentClick));
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    hideModal();
  }
}

function onDocumentClick(evt) {
  const modalMessage = modal.querySelector('.modal__message');

  if (!modalMessage.contains(evt.target)) {
    evt.preventDefault();
    hideModal();
  }
}
