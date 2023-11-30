// Функция для проверки, является ли строка палиндромом
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

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры
const extractingNumber = (someObject) => {
  let someNumber = '';
  const objectToString = String(someObject).split('');

  objectToString.forEach ((i) => {
    if (!Number.isNaN(parseInt(i, 10))) {
      someNumber += i;
    }
  });

  return parseInt(someNumber, 10);
};
extractingNumber(2023);

/* Функция, которая принимает три параметра: исходную строку, минимальную
 длину и строку с добавочными символами — и возвращает
 исходную строку, дополненную указанными символами до заданной длины */
const generateAddress = (sourceString, minLength, addSymbols) =>
  sourceString.length >= minLength ? sourceString :
    addSymbols.slice(0, ((minLength - sourceString.length) % addSymbols.length)) + addSymbols.repeat((minLength - sourceString.length) / addSymbols.length) + sourceString;
generateAddress('1', 2, '0');

// Функция для проверки длины строки
const checkLength = (text, maxLength) => text.length <= maxLength;
checkLength('проверяемая строка', 20);

// Возвращает случайное число с плавающей точкой из переданного диапазона включительно
const getRandomNumber = (min, max, fractionalPart) => (Math.random() * (max - min + 1) + min).toFixed(fractionalPart);
getRandomNumber(5.015125, 5.212125, 3);
