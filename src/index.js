import { gettingApiImages } from './add-js/pixabayAPI';
import { handleHeaderScroll } from './add-js/animation';
import { markupImages } from './add-js/createMarkup';
import { smoothScroll } from './add-js/scroll';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const formElem = document.querySelector('.header__search-form');
const galleryElem = document.querySelector('.gallery');
const nextPageButt = document.querySelector('.load-more');
const inputElem = document.querySelector('.header__search-input');


handleHeaderScroll();
let page = 1;
const lightbox = new SimpleLightbox('.photo-card a');


inputElem.addEventListener('input', onInput);
formElem.addEventListener('submit', onSubmit);
nextPageButt.addEventListener('click', onClick);
inputElem.addEventListener('keydown', onKeydown);


function onInput() {
   nextPageButt.style.display = 'none';
}


async function onSubmit(event) {
   event.preventDefault();
   const inputValue = inputElem.value.trim().toLowerCase();
   page = 1;
   galleryElem.innerHTML = '';

   try {
      await generatingImages(inputValue, page);
      inputElem.value = '';
   } catch (error) {
      Notiflix.Notify.failure('An error occurred. Please try again.');
   }
}


async function onClick() {
   page++;

   try {
      await generatingImages(inputElem.value.trim().toLowerCase(), page);
   } catch (error) {
      Notiflix.Notify.failure('An error occurred. Please try again.');
   }
};


async function onKeydown(event) {
   if (event.key === 'Enter') {
      event.preventDefault();
      page = 1;
      galleryElem.innerHTML = '';
      const inputValue = inputElem.value.trim().toLowerCase();

      try {
         await generatingImages(inputValue, page);
         inputElem.value = '';
      } catch (error) {
         Notiflix.Notify.failure('An error occurred. Please try again.');
      }
   }
};


async function generatingImages(q, page) {
   const data = await gettingApiImages(q, page);
   if (!data.hits.length) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      galleryElem.innerHTML = '';
      return;
   }

   markupImages(data.hits, galleryElem);
   lightbox.refresh();
   nextPageButt.style.display = 'block';

   smoothScroll(page, galleryElem);

   if (data.totalHits === galleryElem.childElementCount || galleryElem.childElementCount >= 500) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      nextPageButt.style.display = 'none';
      return;
   }
};

