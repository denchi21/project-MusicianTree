const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach((star, index) => {
  star.addEventListener('mouseover', () => {
    highlightStars(index);
  });

  star.addEventListener('mouseout', () => {
    highlightStars(selectedRating - 1);
  });

  star.addEventListener('click', () => {
    selectedRating = index + 1;
    highlightStars(index);
  });
});

function highlightStars(index) {
  stars.forEach((star, i) => {
    if (i <= index) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

document
  .getElementById('feedbackForm')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    if (!selectedRating) {
      alert('Please select a rating.');
      return;
    }

    alert(
      'Thank you, ${name}! Your feedback was submitted with a rating of ${selectedRating} stars.'
    );
  });
