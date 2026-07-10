(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');

  if (navToggle && nav) {
    const closeNav = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.querySelector('.sr-only').textContent = 'Open navigation';
      nav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    };

    navToggle.addEventListener('click', () => {
      const willOpen = navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', String(willOpen));
      navToggle.querySelector('.sr-only').textContent = willOpen ? 'Close navigation' : 'Open navigation';
      nav.classList.toggle('is-open', willOpen);
      document.body.classList.toggle('nav-open', willOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNav();
        navToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 860) closeNav();
    });
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

})();
