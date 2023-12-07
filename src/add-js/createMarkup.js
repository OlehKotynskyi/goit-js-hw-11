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
};