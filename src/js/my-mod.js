'use strict';
import axios from 'axios';
export function addHtmlOnPage(arrow) {
  let listCode = ``;
  arrow.forEach(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
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
    }
  );
  return listCode;
}

export async function searchImageOnServer(serchText, page) {
  const parameters = new URLSearchParams({
    key: `41274788-792c8d92905fcf9da75194117`,
    q: `${serchText}`,
    image_type: `photo`,
    orientation: `horizontal`,
    safesearch: `true`,
    per_page: 40,
    page: page,
  }).toString();
  const response = await axios.get(`https://pixabay.com/api/?${parameters}`);
  return response.data;
}
export function scroll() {
  // let height =
  //   document.querySelector(`.gallery-item`).getBoundingClientRect().height * 2;

  const height = window.innerHeight - 100;
  //100 ==  button_height + padding
  window.scrollBy({
    top: height,
    behavior: 'smooth',
  });
}
