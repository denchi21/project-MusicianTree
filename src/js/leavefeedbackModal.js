document.getElementById('feedbackForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // Ваши действия при отправке формы (например, alert или отправка данных)

  // Закрытие модального окна
  const backdrop = document.querySelector('.backdrop');
  const modalContent = document.querySelector('.modal-content');
  if (backdrop && modalContent) {
    backdrop.classList.add('visually-hidden');
    modalContent.classList.add('visually-hidden');
    document.body.style.overflow = '';
  }
});
