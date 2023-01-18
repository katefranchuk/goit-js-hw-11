import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createGalleryCards } from './js/templates/gallery-cards';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { perPage, PixabayAPI } from './js/api/web-api';

const searchFormEl = document.querySelector('#search-form');
const galleryContainerEl = document.querySelector('.gallery');
const loadMoreButtonEl = document.querySelector('.load-more');
const serchButtonEl = document.querySelector('#search-btn');

const pixabayAPI = new PixabayAPI();

let lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreButtonEl.addEventListener('click', onLoadMoreButtonClick);
galleryContainerEl.addEventListener('click', onGalleryItemClick);

function onSearchFormSubmit(evenet) {
  evenet.preventDefault();

  serchButtonEl.disabled = true;
  clearMarkup(galleryContainerEl);
  pixabayAPI.page = 1;

  pixabayAPI.query = evenet.target.elements.searchQuery.value.trim();

  if (!pixabayAPI.query) {
    Notify.warning('Please fill out the field.');
    addClass('is-hidden');
    return;
  }

  mountData();
}

async function mountData() {
  try {
    const { data } = await pixabayAPI.fetchPhotosByQuery();

    if (data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      searchFormEl.reset();
      clearMarkup(galleryContainerEl);
      return;
    }

    if (data.totalHits > perPage) {
      // {per_page: 40}
      removeClass('is-hidden');
    } else {
      addClass('is-hidden');
    }

    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    galleryContainerEl.innerHTML = createGalleryCards(data.hits);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  } finally {
    serchButtonEl.disabled = false;
  }
}

async function onLoadMoreButtonClick() {
  try {
    pixabayAPI.page += 1;
    const { data } = await pixabayAPI.fetchPhotosByQuery();

    if (data.hits.length === 0) {
      addClass('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    galleryContainerEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(data.hits)
    );
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
}

function clearMarkup(element) {
  element.innerHTML = '';
}

function removeClass(className) {
  loadMoreButtonEl.classList.remove(className);
}

function addClass(className) {
  loadMoreButtonEl.classList.add(className);
}

function onGalleryItemClick(event) {
  event.preventDefault();
  console.log(event.target);
}
