document.addEventListener('DOMContentLoaded', () => {

  /* ============================
     SAYFA YÜKLENME FADE-IN
  ============================ */
  const fadeElements = document.querySelectorAll('.fade-in-element');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => fadeObserver.observe(el));

  /* ============================
     YUMUŞAK KAYDIRMA (SMOOTH SCROLL)
  ============================ */
  const navLinks = document.querySelectorAll('.nav-link');
  const nav = document.getElementById('categoryNav');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        const navHeight = nav.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ============================
     KAYDIRMA SIRASINDA AKTİF KATEGORİYİ VURGULA
  ============================ */
  const sections = document.querySelectorAll('.menu-section');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: `-${nav.offsetHeight + 10}px 0px -60% 0px` });

  sections.forEach(section => navObserver.observe(section));

});