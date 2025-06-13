import iziToast from 'izitoast';

import { openModal} from './modal';
import { fetchArtists, LIMIT } from './basicAPI';
import {
  renderArtists,
  showLoader,
  hideLoader,
} from './render-functions';


// DOM-селектори
const list = document.querySelector('.artist-list');
export const loadMoreBtn = document.querySelector('.artist-load-btn');
const searchInputBtn = document.querySelector('.js-form');
const resetBtns = document.querySelectorAll('.reset-btn-js');
const searchBtnMobile = document.querySelector('.search-filters-btn');
const jsForm = document.querySelector('.js-form');
const sortSelect = document.querySelector('.filters-dropdown-sort');
const genreSelect = document.querySelector('.filters-dropdown-genre');
const emptyArtist = document.querySelector('.artist-empty');

let page = 1;
let totalArtists = 0;
let searchName = '';
let genre = '';
let sortName = '';

// обробники в 1 функцію

export function initArtists() {
  loadMoreBtn.addEventListener('click', () => loadArtists(true));
  document.addEventListener('DOMContentLoaded', loadArtists);

  searchInputBtn.addEventListener('submit', handleSearchInputBtn);
  resetBtns.forEach(resetBtn => {
    resetBtn.addEventListener('click', handleResetPush);
  }
);

  searchBtnMobile.addEventListener('click', () => {
    jsForm.classList.toggle('is-open');
  });

  sortSelect.addEventListener('change', handleSortInput);
  genreSelect.addEventListener('change', handleGenreInput);
//  При натисканні на кнопку Learn more - МОДАЛКА
  const artistList = document.querySelector('.artist-list');
  artistList.addEventListener('click', e => {
    const learnMoreBtn = e.target.closest('.artist-learn-btn');
    if (!learnMoreBtn) return;

    const artistId = learnMoreBtn.dataset.id;
    openModal(artistId);
  });
}

// прибирає клас для відображення кнопки load more
export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
  loadMoreBtn.classList.remove('is-active');
};
// додає клас для відображення кнопки load more
export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
  loadMoreBtn.classList.add('is-active');
};

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
    // Handle error silently
    return;
  } finally {
    hideLoader();
  }
}
// -------------------search-section------------------------

// пошук по інпуту desctop
function handleSearchInputBtn(event) {
 event.preventDefault();
 searchName = event.target.search.value.trim();
 console.log(searchName)
 page = 1;
 loadArtists();
 jsForm.classList.toggle('is-open');
 handleResetPush();
}


// пошук по інпуту desctop
  function handleSortInput(event) {
  sortName = event.target.value.trim();
  page = 1;
  loadArtists();
}

  function handleGenreInput(event) {
  page = 1;
  genre = event.target.value.trim();
  loadArtists();
}

// reset всіх даних desctop
function handleResetPush () {
 page = 1;
 searchName = '';
 genre = '';
 sortName = '';

 jsForm.querySelector('input[name="search"]').value = '';
 sortSelect.value = '';
 genreSelect.value = '';

 loadArtists();
}

