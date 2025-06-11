import { fetchArtistData } from "./basicAPI";

const modalSection = document.querySelector('.container-modal');
const modalOverlay = modalSection.querySelector('.modal');
const modalContent = modalSection.querySelector('.container-modal-1');
const closeModalBtn = modalSection.querySelector('.modal-close-btn');
const loader = document.getElementById('modalLoader');

function getBasePath() {
  // Check if we're on GitHub Pages
  const isGitHubPages = window.location.hostname.includes('github.io');
  // Get the repository name from the path if on GitHub Pages
  const repoName = isGitHubPages ? window.location.pathname.split('/')[1] : '';
  return isGitHubPages ? `/${repoName}` : '';
}

function handleEscKey(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function handleOverlayClick(event) {
  if (!modalContent.contains(event.target)) {
    closeModal();
  }
}

function createInfoBlock(title, content) {
  if (!content) return null;
  
  const box = document.createElement('div');
  box.className = 'folder-box';

  const titleEl = document.createElement('h3');
  titleEl.className = 'years-title';
  titleEl.textContent = title;

  const contentEl = document.createElement('p');
  contentEl.className = 'years-item';
  contentEl.textContent = content;

  box.appendChild(titleEl);
  box.appendChild(contentEl);
  return box;
}

function createGenreTags(genres) {
  if (!genres || !Array.isArray(genres) || genres.length === 0) return null;

  const container = document.createElement('div');
  container.className = 'janr';

  genres.forEach(genre => {
    const tag = document.createElement('p');
    tag.className = 'janr-item';
    tag.textContent = genre;
    container.appendChild(tag);
  });

  return container;
}

function formatDuration(duration) {
  if (!duration || isNaN(duration)) return '--:--';
  
  // Convert duration to seconds if it's in milliseconds
  const seconds = duration > 1000 ? Math.round(duration / 1000) : duration;
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function transformTracksToAlbums(tracksList) {
  if (!tracksList || !Array.isArray(tracksList)) {
    console.log('No tracks data or invalid format');
    return [];
  }

  const albumsMap = new Map();

  tracksList.forEach(track => {
    if (!track.strAlbum) return;

    if (!albumsMap.has(track.strAlbum)) {
      albumsMap.set(track.strAlbum, {
        strAlbum: track.strAlbum,
        tracks: []
      });
    }

    // Transform track data and handle YouTube URL
    const youtubeUrl = track.strMusicVid || 
                      (track.strTrackThumb && track.strTrackThumb.replace('/preview', '')) || 
                      null;

    albumsMap.get(track.strAlbum).tracks.push({
      strTrack: track.strTrack,
      intDuration: track.intDuration,
      strMusicVid: youtubeUrl
    });
  });

  return Array.from(albumsMap.values());
}

function createTrackList(tracks) {
  if (!tracks || !Array.isArray(tracks)) return null;

  const container = document.createElement('div');
  container.className = 'tracks-container';

  // Create header
  const header = document.createElement('ul');
  header.className = 'track-name';
  header.innerHTML = `
    <li class="name-column-item item-col-1">Track</li>
    <li class="name-column-item item-col-2">Time</li>
    <li class="name-column-item item-col-3">Link</li>
  `;
  container.appendChild(header);

  // Create tracks
  tracks.forEach((track, index) => {
    const trackRow = document.createElement('ul');
    trackRow.className = 'track-name';

    const nameCol = document.createElement('li');
    nameCol.className = 'track-name-item item-col-1';
    nameCol.textContent = track.strTrack || 'Untitled';

    const timeCol = document.createElement('li');
    timeCol.className = 'track-name-item item-col-2';
    timeCol.textContent = formatDuration(track.intDuration);

    const linkCol = document.createElement('li');
    linkCol.className = 'track-name-item item-col-3';

    if (track.strMusicVid) {
      const link = document.createElement('a');
      link.href = track.strMusicVid;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.title = `Watch ${track.strTrack} on YouTube`;
      link.innerHTML = `
        <svg class="icon-youtube" width="24" height="24">
          <use href="${getBasePath()}/img/icon.svg#icon-Youtube"></use>
        </svg>
      `;
      
      link.className = 'youtube-link';
      
      linkCol.appendChild(link);
    }

    trackRow.appendChild(nameCol);
    trackRow.appendChild(timeCol);
    trackRow.appendChild(linkCol);
    container.appendChild(trackRow);
  });

  return container;
}

function createAlbumSection(albums) {
  if (!albums || !Array.isArray(albums) || albums.length === 0) return null;

  const container = document.createElement('div');
  container.className = 'album-box';

  const title = document.createElement('h2');
  title.className = 'album-title';
  title.textContent = 'Albums';
  container.appendChild(title);

  const albumsContainer = document.createElement('div');
  albumsContainer.className = 'albums-grid';

  albums.forEach(album => {
    const albumBox = document.createElement('div');
    albumBox.className = 'album-title-box';

    const albumTitle = document.createElement('h3');
    albumTitle.className = 'name-album';
    albumTitle.textContent = album.strAlbum || 'Untitled Album';
    albumBox.appendChild(albumTitle);

    if (album.tracks && Array.isArray(album.tracks)) {
      const trackList = createTrackList(album.tracks);
      if (trackList) {
        albumBox.appendChild(trackList);
      }
    }

    container.appendChild(albumBox);
  });

  return container;
}

function renderModalContent(data) {
  console.log('Artist data received:', data);
  modalContent.innerHTML = '';

  // Transform tracksList into albums structure
  const albumsData = transformTracksToAlbums(data.tracksList);
  console.log('Transformed albums data:', albumsData);

  // Add close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close-btn';
  closeBtn.type = 'button';
  closeBtn.innerHTML = `
    <svg class="icon" width="24" height="24">
      <use href="${getBasePath()}/img/icon.svg#icon-close"></use>
    </svg>
  `;
  modalContent.appendChild(closeBtn);

  // Add artist name
  const titleName = document.createElement('h2');
  titleName.className = 'title-name';
  titleName.textContent = data.strArtist;
  modalContent.appendChild(titleName);

  // Create artist info container
  const artistInfoContainer = document.createElement('div');
  artistInfoContainer.className = 'artist-info-container';

  // Add artist photo
  if (data.strArtistThumb) {
    const photo = document.createElement('img');
    photo.className = 'artist-photo';
    photo.src = data.strArtistThumb;
    photo.alt = data.strArtist;
    artistInfoContainer.appendChild(photo);
  }

  // Create folder for artist info
  const folder = document.createElement('div');
  folder.className = 'folder';

  // Create container for key info (first 4 items)
  const keyInfoContainer = document.createElement('div');
  keyInfoContainer.className = 'key-info-container';

  // Add key information blocks
  const keyInfoBlocks = [
    { 
      title: 'Years active', 
      content: data.intFormedYear ? `${data.intFormedYear}–present` : undefined 
    },
    { 
      title: 'Sex', 
      content: data.strGender 
    },
    { 
      title: 'Members', 
      content: data.intMembers || '1'
    },
    { 
      title: 'Country', 
      content: data.strCountry 
    }
  ];

  keyInfoBlocks.forEach(block => {
    const infoBlock = createInfoBlock(block.title, block.content);
    if (infoBlock) {
      keyInfoContainer.appendChild(infoBlock);
    }
  });

  folder.appendChild(keyInfoContainer);

  // Add biography separately
  const biographyBlock = createInfoBlock('Biography', data.strBiographyEN);
  if (biographyBlock) {
    biographyBlock.className = 'folder-box biography';
    folder.appendChild(biographyBlock);
  }

  // Add genres
  if (data.genres && Array.isArray(data.genres)) {
    const genresTags = createGenreTags(data.genres);
    if (genresTags) {
      folder.appendChild(genresTags);
    }
  }

  // Add folder to artist info container
  artistInfoContainer.appendChild(folder);
  modalContent.appendChild(artistInfoContainer);

  // Add albums section
  if (albumsData.length > 0) {
    const albumsSection = createAlbumSection(albumsData);
    if (albumsSection) {
      modalContent.appendChild(albumsSection);
    }
  } else {
    console.log('No albums data found or invalid format');
  }
}

async function openModal(id) {
  if (!modalSection || !modalContent || !loader) {
    console.error('Required modal elements not found');
    return;
  }

  modalSection.classList.add('is-open');
  document.body.classList.add('modal-open');

  loader.style.display = 'block';
  modalContent.style.display = 'none';

  try {
    const artistData = await fetchArtistData(id);
    
    if (!artistData) {
      throw new Error('No artist data received');
    }

    renderModalContent(artistData);
    
    loader.style.display = 'none';
    modalContent.style.display = 'block';

    // Add event listeners with null checks
    const newCloseBtn = modalContent.querySelector('.modal-close-btn');
    if (newCloseBtn) {
      newCloseBtn.addEventListener('click', closeModal);
    }
    
    // Add event listeners only if elements exist
    if (document) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    if (modalOverlay) {
      modalOverlay.addEventListener('click', handleOverlayClick);
    }

  } catch (error) {
    console.error('Error in modal:', error);
    if (loader && modalContent) {
      loader.style.display = 'none';
      modalContent.style.display = 'block';
      modalContent.innerHTML = `
        <div class="error-message">
          <p>Sorry, we couldn't load the artist information.</p>
          <p>Error: ${error.message}</p>
        </div>
      `;
    }
  }
}

function closeModal() {
  if (!modalSection || !modalContent || !loader) {
    console.error('Required modal elements not found');
    return;
  }

  modalSection.classList.remove('is-open');
  document.body.classList.remove('modal-open');

  loader.style.display = 'none';
  modalContent.style.display = 'block';
  modalContent.innerHTML = '';

  // Remove event listeners with null checks
  const closeBtn = modalContent.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.removeEventListener('click', closeModal);
  }
  
  if (document) {
    document.removeEventListener('keydown', handleEscKey);
  }
  
  if (modalOverlay) {
    modalOverlay.removeEventListener('click', handleOverlayClick);
  }
}

// Initialize modal elements with error handling
function initializeModal() {
  try {
    const modalElements = {
      modalSection: document.querySelector('.container-modal'),
      modalOverlay: document.querySelector('.modal'),
      modalContent: document.querySelector('.container-modal-1'),
      closeModalBtn: document.querySelector('.modal-close-btn'),
      loader: document.getElementById('modalLoader')
    };

    // Check if all required elements exist
    Object.entries(modalElements).forEach(([name, element]) => {
      if (!element) {
        throw new Error(`Required modal element "${name}" not found`);
      }
    });

    // Update global variables
    window.modalSection = modalElements.modalSection;
    window.modalOverlay = modalElements.modalOverlay;
    window.modalContent = modalElements.modalContent;
    window.closeModalBtn = modalElements.closeModalBtn;
    window.loader = modalElements.loader;

    console.log('Modal initialized successfully');
  } catch (error) {
    console.error('Error initializing modal:', error);
  }
}

// Call initialize function when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeModal);

export { openModal };