import Swiper from 'swiper';
import 'swiper/css';

import './js/basicAPI';
import './js/feedback.js';
import 'css-star-rating/css/star-rating.min.css';

import './js/header';


import './js/artists';
import './js/render-functions';

import { openModal} from './js/modal';

import './css/styles.css';
import { fetchArtists, LIMIT } from './js/basicAPI';
import {
  renderArtists,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const list = document.querySelector('.artist-list');
export const loadMoreBtn = document.querySelector('.artist-load-btn');
export const searchInput = document.querySelector('.filters-input');
export const resetBtns = document.querySelectorAll('.reset-btn-js');

export const searchBtnMobile = document.querySelector('.search-filters-btn');
export const jsForm = document.querySelector('.js-form');
export const sortSelect = document.querySelector('.filters-dropdown-sort');
export const genreSelect = document.querySelector('.filters-dropdown-genre');
export const emptyArtist = document.querySelector('.artist-empty');

let page = 1;
let totalArtists = 0;
let searchName = '';
let genre = '';
let sortName = '';

// обробники
loadMoreBtn.addEventListener('click', () => loadArtists(true));
document.addEventListener('DOMContentLoaded', loadArtists);
searchInput.addEventListener('input', handleSearchInput);


resetBtns.forEach(resetBtn => {
    resetBtn.addEventListener('click', handleResetPush);
  });


searchBtnMobile.addEventListener('click', () => {
 jsForm.classList.toggle('is-open');
});

 sortSelect.addEventListener('change', handleSortInput);
 genreSelect.addEventListener('change', handleGenreInput);


export async function loadArtists(isLoadMore = false) {
  showLoader();

  try {
    const fullDataFromAPI = await fetchArtists(page, searchName, genre, sortName); // { artists: [], limit: "8", page: "1", totalArtists: 2224 }
    const artists = fullDataFromAPI.artists;

    if (artists.length === 0) {
      hideLoadMoreButton();
      // 1. hide UL 
      list.classList.add('visually-hidden');
      // 2. show div
      emptyArtist.classList.remove('visually-hidden');
      emptyArtist.classList.add('is-active');

    } else {
     showLoadMoreButton();
     list.classList.remove('visually-hidden');
     emptyArtist.classList.add('visually-hidden');
     emptyArtist.classList.remove('is-active');
    }

    const markup = renderArtists(artists);

    if (isLoadMore) {
      list.insertAdjacentHTML('beforeend', markup);

      // плавний скрол
      const card = document.querySelector('.artist-item');
      if (card) {
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
          top: cardHeight,
          behavior: 'smooth',
        });
      }
    } else {
      list.innerHTML = markup;
    }

     // Оновлюємо загальну кількість артистів
    totalArtists = fullDataFromAPI.totalArtists;

    const totalLoaded = page * LIMIT;

    if (totalLoaded >= totalArtists) {
      hideLoadMoreButton();
    }

    page++;
  } catch (error) {
    console.error('Error loading artists:', error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topCenter',
    });
  } finally {
    hideLoader();
  }
}

//  При натисканні на кнопку Learn more - МОДАЛКА
export const artistList = document.querySelector('.artist-list');

artistList.addEventListener('click', e => {
  const learnMoreBtn = e.target.closest('.artist-learn-btn');
  if (!learnMoreBtn) return;

  const artistId = learnMoreBtn.dataset.id;

  openModal(artistId)

});

// -------------------search-section------------------------



// пошук по інпуту desctop
export function handleSearchInput(event) {
 searchName = event.target.value.trim();
 page = 1;

 loadArtists();

  console.log('name: ' + searchName);
}

// пошук по інпуту desctop
export function handleSortInput(event) {
 sortName = event.target.value.trim();
 page = 1;

 loadArtists();
}

export function handleGenreInput(event) {
 page = 1;
 genre = event.target.value.trim();

 loadArtists();
}

// reset всіх даних desctop
export function handleResetPush (event) {
 page = 1;
 searchName = '';
 genre = '';
 sortName = '';

 searchInput.value = '';
 sortSelect.value = '';
 genreSelect.value = '';

 loadArtists();
}

// select sort

// export function handleSelectChange (event) {


// }
