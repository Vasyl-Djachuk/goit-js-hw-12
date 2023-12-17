'use strict';
let indexImage = 0;
let objectFromServer;
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallery = document.querySelector(`.gallery`);
const loader = document.querySelector(`.loader`);
loader.classList.remove(`loader`);

const form = document.querySelector(`.form`);
form.addEventListener(`submit`, formSearch);
// ------------------
document
  .querySelector(`.page-section`)
  .insertAdjacentHTML(
    'beforeend',
    `<button class="download-more">Download more</button>`
  );
const buttonMoreImages = document.querySelector(`.download-more`);
buttonMoreImages.addEventListener(`click`, downloadsMoreImages);
// -----------------

function formSearch(event) {
  event.preventDefault();
  let userText = event.target.elements.search.value.trim();

  if (userText === ``) {
    iziToast.show({
      message: '❌ Field must be filled in',
      position: `topRight`,
      color: `red`,
    });
    return;
  }

  form.reset();
  gallery.innerHTML = ``;
  buttonMoreImages.classList.remove(`is-visibal`);
  loader.classList.add(`loader`);

  const parameters = new URLSearchParams({
    key: `41274788-792c8d92905fcf9da75194117`,
    q: `${userText}`,
    image_type: `photo`,
    orientation: `horizontal`,
    safesearch: `true`,
    per_page: 100,
  }).toString();

  const urlSearch = `https://pixabay.com/api/?${parameters}`;
  fetch(urlSearch)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(answerFromServer => {
      if (answerFromServer.hits.length === 0) {
        loader.classList.remove(`loader`);
        iziToast.show({
          message:
            '❌ Sorry, there are no images matching your search query. Please try again!',
          position: `topRight`,
          color: `red`,
        });
        buttonMoreImages.classList.remove(`is-visibal`);
        return;
      }
      galleryCreate(answerFromServer.hits);
    })
    .catch(error => {
      console.log(error);
    });
}
// --------------------------------
function galleryCreate(imageArrow) {
  indexImage = 0;
  objectFromServer = imageArrow;
  let displayImage = imageArrow.slice(indexImage, indexImage + 20);
  loader.classList.remove(`loader`);
  gallery.insertAdjacentHTML('afterbegin', addImages(displayImage));
  galleryModal.refresh();

  if (imageArrow.length >= 21) {
    buttonMoreImages.classList.add(`is-visibal`);
  }
}
// ----------------------------------

function downloadsMoreImages() {
  indexImage += 20;

  gallery.insertAdjacentHTML(
    'beforeend',
    addImages(objectFromServer.slice(indexImage, indexImage + 20))
  );
  if (indexImage + 21 >= objectFromServer.length) {
    buttonMoreImages.classList.remove(`is-visibal`);
  }
  galleryModal.refresh();
}

function addImages(arrow) {
  let listCode = ``;
  arrow.forEach(image => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = image;

    listCode += `<li class="gallery-item">
          <a class="link" href="${largeImageURL}">
            <img class="form-img" src="${webformatURL}" alt="${tags}" />
            <ul class="description-list">
              <li class="description-item">
                <p class="text-">Likes</p>
                <p class="number">${likes}</p>
              </li>
              <li class="description-item">
                <p class="text-">Views</p>
                <p class="number">${views}</p>
              </li>
              <li class="description-item">
                <p class="text-">Comments</p>
                <p class="number">${comments}</p>
              </li>
              <li class="description-item">
                <p class="text-">Downloads</p>
                <p class="number">${downloads}</p>
              </li>
            </ul>
          </a>
        </li>`;
  });
  return listCode;
}
// ------------------------

const galleryModal = new SimpleLightbox('.gallery .link', {
  captionsData: `alt`,
  captionDelay: 250,
});
