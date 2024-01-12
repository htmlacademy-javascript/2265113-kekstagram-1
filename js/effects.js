const EFFECTS = [
  {
    name: 'none',
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];
const DEFAULT_EFFECT = EFFECTS[0];

const imgPreview = document.querySelector('.img-upload__preview img');
const imgEffects = document.querySelector('.img-upload__effects');
const effectValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
let currentEffect = DEFAULT_EFFECT;

const isDefault = () => currentEffect === DEFAULT_EFFECT;

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.max,
  connect: 'lower'
});

const updateSliderOptions = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    step: currentEffect.step,
    start: currentEffect.max
  });

  if (isDefault()) {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

export const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;

  updateSliderOptions();
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imgPreview.className = `effects__preview--${currentEffect.name}`;

  updateSliderOptions();
};

const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();
  effectValue.value = sliderValue;

  imgPreview.style.filter = isDefault() ? DEFAULT_EFFECT.filter : `${currentEffect.filter}(${sliderValue}${currentEffect.unit})`;
};

imgEffects.addEventListener('change', onEffectsChange);
slider.noUiSlider.on('update', onSliderUpdate);
