'use strict';

export function createGalleryCards(cardsArr = []) {
  return cardsArr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>      
        <div class="info">
          <p class="info-item">
            <b class="info-label">Likes</b><span class="info-span">${likes}</span>
          </p>
          <p class="info-item">
            <b class="info-label">Views</b><span class="info-span">${views}</span>
          </p>
          <p class="info-item">
            <b class="info-label">Comments</b><span class="info-span">${comments}</span>
          </p>
          <p class="info-item">
            <b class="info-label">Downloads</b><span class="info-span">${downloads}</span>
          </p>
        </div>
      </div>`
    )
    .join('');
}
