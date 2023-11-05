
import SlimSelect from 'slim-select'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js'

const selectEl = document.querySelector('.breed-select');
const infoEl = document.querySelector('.cat-info');
const wrapperLoaderEl = document.querySelector('.wrapper-loader');

function onLoad() {
  wrapperLoaderEl.classList.remove('is-hidden');
  fetchBreeds().then(res => {
    const markup = createOptions(res);
    addMarkup(selectEl, markup);
    new SlimSelect({
  select: selectEl,
})
  }).catch(onError).finally(() => {
    console.log('finally')
    wrapperLoaderEl.classList.add('is-hidden');
  })
}

onLoad();

function createOptions(items = []) {
  return items
    .map(({ name, id }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function addMarkup(el, markup = '') {
  el.innerHTML = markup;
}

selectEl.addEventListener('change', onChange);

function onChange(evt) {
  wrapperLoaderEl.classList.remove('is-hidden');
  fetchCatByBreed(evt.target.value)
    .then(([res]) => {
      const { url, breeds } = res;
      const [{name, description, temperament}] = breeds;
      const markup = createBoxInfo({ url, name, description, temperament });
      addMarkup(infoEl, markup)
  })
    .catch(onError).finally(() => {

    wrapperLoaderEl.classList.add('is-hidden');
  })
}

function createBoxInfo({url, name, description, temperament}) {
  return `<div class="left-col">
          <img src="${url}" alt="" />
        </div>
<div class="right-col">
          <h1>${name}</h1>
          <p><strong>Temperament:</strong> ${temperament}</p>
          <p><strong>Description:</strong> ${description}</p>
        </div>`
}

function onError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}