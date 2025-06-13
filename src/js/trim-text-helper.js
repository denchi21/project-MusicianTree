export function truncateText(text, maxLength) {
  if (typeof text !== 'string') {
    return '';
  }
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

//  всі елементи з класом .artist-description
const descElements = document.querySelectorAll('.artist-description');
const maxLength = 67;

// Для кожного елемента з цим класом обрізаєм текст
descElements.forEach(descElement => {
  if (descElement) {
    const truncatedText = truncateText(descElement.textContent, maxLength);
    descElement.textContent = truncatedText;
  }
});