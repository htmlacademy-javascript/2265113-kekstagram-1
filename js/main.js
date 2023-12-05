const DESCRIPTIONS = [
  'Вот так нужно встречать рассвет!',
  'А вы знали, что этот город считается лучшим местом на земле?',
  'Не смогла пройти мимо такой красоты!',
  'Эти люди зарядили меня энергией на жизнь вперёд!',
  'Вот так выглядит счастье!'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Артур',
  'Мария',
  'Кирил',
  'Дарья',
  'Борис',
  'Оксана',
  'Евгений',
  'Ксения',
  'Дмитрий',
  'Кира'
];
const SIMILAR_PHOTO_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createUsersComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createUsersCommentsList = (length) => Array.from({length}, (_, id) => createUsersComment(id));

const createUsersPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: createUsersCommentsList(getRandomInteger(1, 6))
});

const createUsersPhotoList = (length) => Array.from({length}, (_, id) => createUsersPhoto(id + 1));

createUsersPhotoList(SIMILAR_PHOTO_COUNT);
