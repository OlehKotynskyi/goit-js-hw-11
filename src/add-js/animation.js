let lastScrollTop = 0;
const header = document.querySelector('.header');
let scrollDirection = '';

export function handleHeaderScroll() {
   window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop) {
         if (scrollDirection !== 'down') {
            scrollDirection = 'down';
            header.classList.add('hidden');
         }
      } else {
         if (scrollDirection !== 'up') {
            scrollDirection = 'up';
            header.classList.remove('hidden');
         }
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
   });
}
