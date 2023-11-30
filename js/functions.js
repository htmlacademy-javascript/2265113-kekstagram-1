// Функция для проверки, является ли строка палиндромом
function isPalindrome(text) {
  const textReverse = text.replaceAll(' ', '').toLowerCase().split('').reverse().join('');
  return (text.replaceAll(' ', '').toLowerCase() === textReverse);
}
isPalindrome('Лёша на полке клопа нашёл ');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры
function extractingNumber(someObject) {
  let someNumber = '';
  someObject = String(someObject);
  for (const i in someObject) {
    if (!isNaN(parseInt(someObject[i], 10))) {
      someNumber += someObject[i];
    }
  }
  return parseInt(someNumber, 10);
}
extractingNumber(2023);

/* Функция, которая принимает три параметра: исходную строку, минимальную
 длину и строку с добавочными символами — и возвращает
 исходную строку, дополненную указанными символами до заданной длины */
function addressGeneration(sourceString, minLength, addSymbols) {
  if (sourceString.length >= minLength) {
    return sourceString;
  } else {
    return addSymbols.slice(0, ((minLength - sourceString.length) % addSymbols.length)) + addSymbols.repeat((minLength - sourceString.length) / addSymbols.length) + sourceString;
  }
}
addressGeneration('1', 2, '0');

// Функция для проверки длины строки
function checkLength(text, maxLength) {
  return text.length <= maxLength;
}
checkLength('проверяемая строка', 20);

// Возвращает случайное число с плавающей точкой из переданного диапазона включительно
function randomNumber(min, max, fractionalPart) {
  return (Math.random() * (max - min + 1) + min).toFixed(fractionalPart);
}
randomNumber(5.015125, 5.212125, 3);
