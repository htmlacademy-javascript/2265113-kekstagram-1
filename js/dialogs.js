import {isEscapeKey} from './utils.js';

const ALERT_SHOW_TIME = 5000;

let activeModal;

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
  activeModal.remove();

  document.removeEventListener('keydown', onDocumentKeydown, true);
  document.removeEventListener('click', onDocumentClick);
};

export const showModal = (template) => {
  activeModal = template.cloneNode(true);
  const closeButton = activeModal.querySelector('.modal__button');

  document.body.append(activeModal);

  closeButton.addEventListener('click', () => {
    hideModal();
  });
  document.addEventListener('keydown', onDocumentKeydown, true);
  document.addEventListener('click', onDocumentClick);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    evt.stopPropagation();
    hideModal();
  }
}

function onDocumentClick(evt) {
  const modalMessage = activeModal.querySelector('.modal__message');

  if (!modalMessage.contains(evt.target)) {
    evt.preventDefault();
    hideModal();
  }
}
