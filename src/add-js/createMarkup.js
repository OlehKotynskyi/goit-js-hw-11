import Notiflix from 'notiflix';
import axios from "axios";

const apiKey = '41009767-6f834ab34244f7e5a2820a6e0';
const axiosOptions = {
   key: apiKey,
   image_type: 'photo',
   orientation: 'horizontal',
   safesearch: true,
   per_page: 40,
};

export async function gettingApiImages(query, page) {
   try {
      const response = await axios.get('https://pixabay.com/api/', {
         params: {
            ...axiosOptions,
            q: query,
            page: page
         }
      });
      return response.data;
   } catch (error) {
      Notiflix.Notify.failure('Sorry, there are problems with API.');
      throw new Error(error);
   }
}

export function markupImages(images, galleryElem) {
   const markup = images.map(img => `
        <div class="photo-card">
            <a href="${img.largeImageURL}" class="photo-card-img">
                <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    ${img.likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    ${img.views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${img.views}
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    ${img.downloads}
                </p>
            </div>
        </div>
    `).join('');

   galleryElem.insertAdjacentHTML('beforeend', markup);
}

export function smoothScroll(page) {
   if (page === 1) {
      return;
   }

   const galleryChildsList = document.querySelectorAll('.photo-card');
   const { height: cardHeight } = galleryChildsList[galleryChildsList.length - 1].getBoundingClientRect();

   window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
   });
}