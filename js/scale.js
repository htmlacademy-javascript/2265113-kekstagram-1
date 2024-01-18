import {convertToNumber} from './utils.js';

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imgPreview.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

export const resetScale = () => scaleImage(DEFAULT_SCALE);

const onScaleDownClick = () => {
  let newValue = convertToNumber(scaleValue) - SCALE_STEP;

  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }

  scaleImage(newValue);
};

const onScaleUpClick = () => {
  let newValue = convertToNumber(scaleValue) + SCALE_STEP;

  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }

  scaleImage(newValue);
};

smallerButton.addEventListener('click', onScaleDownClick);
biggerButton.addEventListener('click', onScaleUpClick);
