'use strict';
let curentPage;
let userText;
let totalPage;
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// ------------inport my-mod.js
import * as mymod from './my-mod.js';
const gallery = document.querySelector(`.gallery`);
const loader = document.querySelector(`.loader`);
loader.classList.remove(`loader`);
const form = document.querySelector(`.form`);

const galleryModal = new SimpleLightbox(`.gallery .link`, {
  captionsData: `alt`,
  captionDelay: 250,
});

// --------------add-button-load-more----
document
  .querySelector(`.page-section`)
  .insertAdjacentHTML(
    'beforeend',
    `<button class="download-more">Load more</button>`
  );
const buttonLoad = document.querySelector(`.download-more`);

form.addEventListener(`submit`, async event => {
  event.preventDefault();
  userText = event.target.elements.search.value.trim();

  if (userText === ``) {
    iziToast.show({
      message: `❌ Field must be filled in`,
      position: `topRight`,
      color: `red`,
    });
    return;
  }
  loader.classList.add(`loader`);
  curentPage = 1;
  form.reset();
  gallery.innerHTML = ``;

  try {
    const list = await mymod.searchImageOnServer(userText, curentPage);
    if (list.hits.lenght === 0) {
      loader.classList.remove(`loader`);
      iziToast.show({
        message: `❌ Sorry, there are no images matching your search query. Please try again!`,
        position: `topRight`,
        color: `red`,
      });
      buttonLoad.classList.remove(`is-visibal`);
      return;
    }

    loader.classList.remove(`loader`);
    gallery.insertAdjacentHTML('afterbegin', mymod.addHtmlOnPage(list.hits));
    galleryModal.refresh();

    totalPage = Math.ceil(list.totalHits / 40);
    if (curentPage < totalPage) {
      buttonLoad.classList.add(`is-visibal`);
    }
  } catch (error) {
    console.log(error);
  }
});

// --------------add-listener-button-----

buttonLoad.addEventListener(`click`, async () => {
  buttonLoad.classList.remove(`is-visibal`);
  loader.classList.add(`loader`);
  curentPage++;

  try {
    const list = await mymod.searchImageOnServer(userText, curentPage);
    loader.classList.remove(`loader`);
    gallery.insertAdjacentHTML('beforeend', mymod.addHtmlOnPage(list.hits));
    galleryModal.refresh();

    if (totalPage === curentPage) {
      iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
        position: `topRight`,
        color: `blue`,
      });
      return;
    }
    buttonLoad.classList.add(`is-visibal`);
    mymod.scroll();
  } catch (error) {
    console.log(error);
  }
});
