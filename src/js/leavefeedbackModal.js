document.getElementById('feedbackForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // Ваши действия при отправке формы (например, alert или отправка данных)

  // Закрытие модального окна
  const backdrop = document.querySelector('.feedback-modal-backdrop');
  const modalContent = document.querySelector('.feedback-modal-window');
  if (backdrop && modalContent) {
    backdrop.classList.add('visually-hidden');
    modalContent.classList.add('visually-hidden');
    document.body.style.overflow = '';
  }
});

// Закрытие по иконке .feedback-modal-mobile-icon
const mobileCloseIcon = document.querySelector('.feedback-modal-mobile-icon');
if (mobileCloseIcon) {
  mobileCloseIcon.addEventListener('click', function () {
    const backdrop = document.querySelector('.feedback-modal-backdrop');
    const modalContent = document.querySelector('.feedback-modal-window');
    if (backdrop && modalContent) {
      backdrop.classList.add('visually-hidden');
      modalContent.classList.add('visually-hidden');
      document.body.style.overflow = '';
    }
  });
}
