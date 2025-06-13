const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const desktopNavLinks = document.querySelectorAll('.nav-link');
const pageHeader = document.querySelector('.page-header');
const scrollToTopBtnDesktop = document.getElementById('scrollToTopBtnDesktop');
const scrollToTopBtnMobile = document.getElementById('scrollToTopBtnMobile');
const footerLogo = document.getElementById('footerLogo');
const footerLogoDesktop = document.getElementById('footerLogoDesktop');

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

scrollToTopBtnDesktop?.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

scrollToTopBtnMobile?.addEventListener('click', function (e) {
  e.preventDefault();
  mobileMenu.classList.remove('is-open');
  document.body.style.overflow = '';
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

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

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      const headerHeight = pageHeader.offsetHeight;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'auto',
        });
      }, 0);
    }
  }
});

function scrollToTopFooter(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

footerLogo?.addEventListener('click', scrollToTopFooter);
footerLogoDesktop?.addEventListener('click', scrollToTopFooter);
