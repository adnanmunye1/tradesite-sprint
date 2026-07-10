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

  const auditForm = document.querySelector('#audit-form');
  const formStatus = document.querySelector('#form-status');

  if (auditForm) {
    auditForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!auditForm.reportValidity()) return;

      const form = new FormData(auditForm);
      const lines = [
        'Hi,',
        '',
        "I'd like a quick homepage audit.",
        '',
        `Name: ${String(form.get('name') || '').trim()}`,
        `Business: ${String(form.get('business') || '').trim()}`,
        `Website: ${String(form.get('website') || '').trim()}`,
        `Main service to prioritise: ${String(form.get('service') || '').trim()}`,
        '',
        'Thanks,'
      ];
      const subject = 'Audit request – TradeSite Sprint';
      const href = `mailto:adnanmunye@googlemail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;

      if (formStatus) formStatus.textContent = 'Opening a prepared message in your email app…';
      window.location.href = href;
    });
  }
})();
