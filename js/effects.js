const Effect = {
  default: {
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  'chrome': {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  'sepia': {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  'marvin': {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  'phobos': {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  'heat': {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const imgPreview = document.querySelector('.img-upload__preview img');
const imgEffects = document.querySelector('.img-upload__effects');
const effectValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');

let currentEffect = Effect.default;

const isDefault = () => currentEffect === Effect.default;

noUiSlider.create(slider, {
  range: {
    min: Effect.default.min,
    max: Effect.default.max
  },
  step: Effect.default.step,
  start: Effect.default.max,
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
  currentEffect = Effect.default;

  updateSliderOptions();
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  currentEffect = Effect[evt.target.value] ?? Effect.default;
  imgPreview.className = `effects__preview--${currentEffect.name}`;

  updateSliderOptions();
};

const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();
  effectValue.value = sliderValue;

  imgPreview.style.filter = isDefault() ? Effect.default.filter : `${currentEffect.filter}(${sliderValue}${currentEffect.unit})`;
};

imgEffects.addEventListener('change', onEffectsChange);
slider.noUiSlider.on('update', onSliderUpdate);
