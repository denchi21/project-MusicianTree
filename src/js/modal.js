document.addEventListener('DOMContentLoaded', () => {
  const openModalBtn = document.querySelector('.artist-learn-btn');
  const modalSection = document.querySelector('.container-modal');
  const modalOverlay = modalSection.querySelector('.modal');
  const modalContent = modalSection.querySelector('.container-modal-1');
  const closeModalBtn = modalSection.querySelector('.modal-close-btn');
  const loader = document.getElementById('modalLoader');

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

  function openModal() {
    modalSection.classList.add('is-open');
    document.body.classList.add('modal-open');

    loader.style.display = 'block';
    modalContent.style.display = 'none';

    setTimeout(() => {
      loader.style.display = 'none';
      modalContent.style.display = 'block';

      closeModalBtn.addEventListener('click', closeModal);
      document.addEventListener('keydown', handleEscKey);
      modalOverlay.addEventListener('click', handleOverlayClick);
    }, 1500); 
  }

  function closeModal() {
    modalSection.classList.remove('is-open');
    document.body.classList.remove('modal-open');

    loader.style.display = 'none';
    modalContent.style.display = 'block';

    closeModalBtn.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', handleEscKey);
    modalOverlay.removeEventListener('click', handleOverlayClick);
  }

  
  openModalBtn.addEventListener('click', openModal);

});