const PARSE_RADIX = 10;

export const isEscapeKey = (key) => key === 'Escape';

export const convertToNumber = (input) => parseInt(input.value, PARSE_RADIX);

export const debounce = (cb, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};
