import Swiper from 'swiper';
import 'swiper/css';
console.log(typeof Swiper);

import './js/basicAPI';
import './js/feedback.js';
import 'css-star-rating/css/star-rating.min.css';

import './js/artists';
import './js/render-functions';

import './css/styles.css';
import { fetchArtists, LIMIT } from './js/basicAPI';
import {
  renderArtists,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const list = document.querySelector('.artist-list');
export const loadMoreBtn = document.querySelector('.artist-load-btn');

let page = 1;
let totalArtists = 0;

// обробники
loadMoreBtn.addEventListener('click', loadArtists);
document.addEventListener('DOMContentLoaded', loadArtists);

async function loadArtists() {
  showLoader();

  try {
    const fullDataFromAPI = await fetchArtists(page);
    const artists = fullDataFromAPI.artists;

    // Оновлюємо загальну кількість артистів
    totalArtists = fullDataFromAPI.totalArtists;

    const totalLoaded = page * LIMIT;

    if (totalLoaded >= totalArtists) {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    // Якщо artists неопределен або не є масивом, виводимо помилку
    if (!artists || !Array.isArray(artists)) {
      console.error('Error: fetched data is not an array or is undefined');
      return;
    }

    if (artists.length === 0) {
      hideLoadMoreButton();
      return;
    }

    const markup = renderArtists(artists);
    list.insertAdjacentHTML('beforeend', markup);

    page++;
  } catch (error) {
    console.error('Error loading artists:', error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topCenter',
    });
  } finally {
    hideLoader();

    // плавний скрол
    const card = document.querySelector('.artist-item');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight,
        behavior: 'smooth',
      });
    }
  }
}

//  При натисканні на кнопку Learn more - МОДАЛКА
export const artistList = document.querySelector('.artist-list');

artistList.addEventListener('click', e => {
  const learnMoreBtn = e.target.closest('.artist-learn-btn');
  if (!learnMoreBtn) return;

  const artistId = learnMoreBtn.dataset.id;
  console.log('ID виконавця:', artistId);

  // -----!!!Тут треба відкрити модалку!!!---
});
