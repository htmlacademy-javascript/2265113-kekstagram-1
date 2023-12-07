const isPalindrome = (text) => {
  const pureText = text.replaceAll(' ', '').toLowerCase();
  const middle = pureText.length / 2;

  for (let i = 1; i <= middle; i++) {
    if (pureText.at(i - 1) !== pureText.at(-i)) {
      return false;
    }
  }

  return true;
};
isPalindrome('Лёша на полке клопа нашёл ');

const extractingNumber = (value) => {
  let numberStr = '';
  const chars = String(value);

  for (const i of chars) {
    if (!Number.isNaN(parseInt(i, 10))) {
      numberStr += i;
    }
  }

  return parseInt(numberStr, 10);
};
extractingNumber(2023);

const generateAddress = (sourceString, minLength, addSymbols) =>
  sourceString.length >= minLength ? sourceString :
    addSymbols.slice(0, ((minLength - sourceString.length) % addSymbols.length)) + addSymbols.repeat((minLength - sourceString.length) / addSymbols.length) + sourceString;
generateAddress('1', 2, '0');

const checkLength = (text, maxLength) => text.length <= maxLength;
checkLength('проверяемая строка', 20);

const getRandomNumber = (min, max, fractionalPart) => (Math.random() * (max - min + 1) + min).toFixed(fractionalPart);
getRandomNumber(5.015125, 5.212125, 3);
