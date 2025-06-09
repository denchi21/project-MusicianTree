const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const desktopNavLinks = document.querySelectorAll('.nav-link');
const pageHeader = document.querySelector('.page-header');

if (burgerBtn) {
  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  });
}

function smoothScroll(targetId) {
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const headerHeight = pageHeader.offsetHeight;

    const elementPosition =
      targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

desktopNavLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    smoothScroll(targetId);
  });
});

mobileNavLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    smoothScroll(targetId);
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  });
});
