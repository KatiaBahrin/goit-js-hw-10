export function makeCatCardMarkup(name, url, temperament, description) {
    return `<img class="js-cat-img" src="${url}" alt="${name}" width="500"/>
    <div class="card-wrap">
    <h2>${name}</h2>
    <p>${description}</p>
    <p><span class="sub-title">Temperament:</span> ${temperament}</p>
    </div>` 
};