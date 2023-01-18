'use strict';

import axios from 'axios';

export let perPage = 40;

export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '32843259-f5703e00df468d9f6ba0105bc';

  constructor() {
    this.page = 1;
    this.query = null;
  }

  fetchPhotosByQuery() {
    const searchParams = new URLSearchParams({
      key: PixabayAPI.API_KEY,
      q: this.query,
      page: this.page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      // per_page: 40,
    });

    return axios.get(
      `${PixabayAPI.BASE_URL}?${searchParams}&per_page=${perPage}`
    );
  };
}

//* 1 VERSION
// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '32843259-f5703e00df468d9f6ba0105bc';

// const searchParams = new URLSearchParams({
//   key: API_KEY,
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: 'true',
//   per_page: 40,
// });

// export function fetchImages(page, searchQuery) {
//   return axios
//     .get(`${BASE_URL}?${searchParams}&q=${searchQuery}&page=${page}`)
//     .then(response => console.log(response));

// }

    // .then(response => console.log(response.data.hits))// виокремлюю масив з даними
    // .catch(error => console.log(error));


//* 2 VERSION
// export function fetchImages() {
//   return axios.get('https://pixabay.com/api/', {
//     params: {
//       key: API_KEY,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: 'true',
//       per_page: 40,
//     }
//   });
// }