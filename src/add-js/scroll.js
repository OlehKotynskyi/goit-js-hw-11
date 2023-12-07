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