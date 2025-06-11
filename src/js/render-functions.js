import { truncateText } from './trim-text-helper';

import { loadMoreBtn } from './artists';


const loader = document.querySelector('.loader');

// genre function
export function renderGenres(genreArray) {
  return `
    <ul class="artist-genre-list">
      ${genreArray.map(genre => `<li class="artist-genre-item">${genre}</li>`).join('')}
    </ul>
  `;
}

export function renderArtists(artists) {
  return artists.map(artist => {
    return `
    <li class="artist-item">
          <img class="artist-item-img" src="${artist.strArtistThumb}" alt="${artist.strArtist}">
          ${renderGenres(artist.genres)}
          <p class="artist-name">${artist.strArtist}</p>
          <p class="artist-description">${truncateText(artist.strBiographyEN, 67)}</p>
          <button type="button" class="artist-learn-btn" data-id="${artist._id}">Learn More
            <svg class="learn-btn-svg">
               <use href="../img/symbol-defs.svg#icon-icon"></use>
            </svg>
          </button>
        </li>`;
  }).join('')
}

// Показати лоадер
export function showLoader() {
  loader.classList.add('is-active');
  loader.classList.remove('is-hidden');
}

// Сховати лоадер
export function hideLoader() {
  loader.classList.add('is-hidden');
  loader.classList.remove('is-active');
}

