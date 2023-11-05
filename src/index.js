import SlimSelect from 'slim-select';
import "../node_modules/slim-select/dist/slimselect.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import { makeMarkupforSelect } from "./services/makeMarkupforSelect";
import { makeCatCardMarkup } from "./services/makeCatCardMarkup";

const refs = {
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    selectEl: document.querySelector('.breed-select'),
};

refs.selectEl.classList.add("visually-hidden");
refs.error.classList.add("visually-hidden");

// Функція для приховання вибору породи та показу лоадера
function showLoaderForBreeds() {
    refs.loader.classList.remove("visually-hidden");
    refs.selectEl.classList.add("visually-hidden");
    refs.error.classList.add("visually-hidden");
}

// Функція для приховання лоадера та відображення вибору породи
function hideLoaderForBreeds() {
    refs.loader.classList.add("visually-hidden");
    refs.selectEl.classList.remove("visually-hidden");
    refs.error.classList.add("visually-hidden");
}

// Функція для приховання інформації про кота та показу лоадера
function showLoaderForCat() {
    refs.loader.classList.remove("visually-hidden");
    refs.catInfo.classList.add("visually-hidden");
    refs.error.classList.add("visually-hidden");
}

// Функція для приховання лоадера та відображення інформації про кота
function hideLoaderForCat() {
    refs.loader.classList.add("visually-hidden");
    refs.catInfo.classList.remove("visually-hidden");
    refs.error.classList.add("visually-hidden");
}

fetchBreeds()
    .then(data => {
        const markup = makeMarkupforSelect(data);
        refs.selectEl.innerHTML = markup;
        new SlimSelect({
            select: '#selectElement'
        })

        hideLoaderForBreeds(); // Приховуємо лоадер після завершення запиту за списком порід
    })
    .catch(error => {
        Notify.failure(`❌ Oops!, Something went wrong! Try reloading the page!`);
        hideLoaderForBreeds(); // Приховуємо лоадер при помилці запиту за списком порід
    });

refs.selectEl.addEventListener('change', onSelectHandler);

function onSelectHandler(event) {
    showLoaderForCat(); // Показуємо лоадер під час вибору породи
    refs.catInfo.classList.add("visually-hidden");
    refs.error.classList.add("visually-hidden");

    const selectedBreedId = event.currentTarget.value;

    fetchCatByBreed(selectedBreedId)
        .then(result => {
            console.log(result.data);
            
            const name = result.data[0].breeds[0].name;
            const url = result.data[0].url;
            const temperament = result.data[0].breeds[0].temperament;
            const description = result.data[0].breeds[0].description;
            
            const catMarkup = makeCatCardMarkup(name, url, temperament, description);
            refs.catInfo.innerHTML = catMarkup;
            hideLoaderForCat(); // Приховуємо лоадер після завершення запиту про кота
            refs.catInfo.classList.remove("visually-hidden");
        })
        .catch(error => {
            Notify.failure(`❌ Oops!, Something went wrong! Try reloading the page!`);
            hideLoaderForCat(); // Приховуємо лоадер при помилці запиту про кота
            refs.catInfo.classList.add("visually-hidden");
        });   
}
