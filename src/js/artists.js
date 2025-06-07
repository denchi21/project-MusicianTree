
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  const descElement = document.getElementById('artist-description');
  const maxLength = 67; 

  descElement.textContent = truncateText(descElement.textContent, maxLength);