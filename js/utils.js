export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomArrayEl = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export const isEscapeKey = (key) => key === 'Escape';

export const currentValue = (scaleValue) => parseInt(scaleValue.value, 10);
