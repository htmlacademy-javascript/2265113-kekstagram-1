import {convertToNumber} from './utils.js';

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const MAX_PERCENT = 100;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imgPreview.style.transform = `scale(${value / MAX_PERCENT})`;
  scaleValue.value = `${value}%`;
};

export const resetScale = () => scaleImage(DEFAULT_SCALE);

const onScaleDownClick = () => {
  const newValue = convertToNumber(scaleValue) - SCALE_STEP;

  scaleImage(Math.max(newValue, MIN_SCALE));
};

const onScaleUpClick = () => {
  const newValue = convertToNumber(scaleValue) + SCALE_STEP;

  scaleImage(Math.min(newValue, MAX_SCALE));
};

smallerButton.addEventListener('click', onScaleDownClick);
biggerButton.addEventListener('click', onScaleUpClick);
