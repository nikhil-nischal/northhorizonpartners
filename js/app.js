/* ============================================================
   NORTH HORIZON PARTNERS — app.js
   All interactive behavior. Requires Lenis CDN loaded first.
   ============================================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     LENIS SMOOTH SCROLL
  ────────────────────────────────────────── */
  var lenis;

  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });

    (function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    })(performance.now());
  }


  /* ──────────────────────────────────────────
     CONTACT INFO — wire up Cal links from contact.js
  ────────────────────────────────────────── */
  if (globalThis.CONTACT) {
    var calLink = globalThis.CONTACT.calLink;
    document.querySelectorAll('[data-cal]').forEach(function (el) {
      el.setAttribute('href', calLink);
    });
    document.querySelectorAll('[data-email]').forEach(function (el) {
      el.setAttribute('href', globalThis.CONTACT.mailto);
      el.textContent = globalThis.CONTACT.email;
    });
  }


  /* ──────────────────────────────────────────
     CUSTOM CURSOR  (desktop pointer:fine only)
  ────────────────────────────────────────── */
  (function initCursor() {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    var dot = document.querySelector('.cursor-dot');
    if (!dot) return;

    var mx = 0, my = 0;
    var cx = 0, cy = 0;
    var lerp = 0.13;
    var rafId;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;

      if (!dot.classList.contains('visible')) {
        dot.classList.add('visible');
      }
    });

    document.addEventListener('mouseleave', function () {
      dot.classList.remove('visible');
    });

    function animateCursor() {
      cx += (mx - cx) * lerp;
      cy += (my - cy) * lerp;
      dot.style.transform = 'translate(' + (cx - 7) + 'px, ' + (cy - 7) + 'px)';
      rafId = requestAnimationFrame(animateCursor);
    }

    animateCursor();
  })();


  /* ──────────────────────────────────────────
     NAVBAR — scroll shadow
  ────────────────────────────────────────── */
  var nav = document.getElementById('site-nav');

  function handleNavScroll() {
    if (window.scrollY > 16) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  /* ──────────────────────────────────────────
     MOBILE MENU
  ────────────────────────────────────────── */
  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks   = document.querySelector('.nav-links');

  function openMenu() {
    nav.classList.add('nav-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', function () {
    nav.classList.contains('nav-open') ? closeMenu() : openMenu();
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (e) {
    if (nav.classList.contains('nav-open') &&
        !nav.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
      closeMenu();
    }
  });


  /* ──────────────────────────────────────────
     SCROLL FADE-IN  (.fi → .in)
     Same system as NorthHorizonMails.
  ────────────────────────────────────────── */
  var fiEls = document.querySelectorAll('.fi');

  if ('IntersectionObserver' in window) {
    var fiObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            fiObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.10,
        rootMargin: '0px 0px -32px 0px',
      }
    );

    fiEls.forEach(function (el) { fiObserver.observe(el); });
  } else {
    /* Fallback: reveal everything immediately */
    fiEls.forEach(function (el) { el.classList.add('in'); });
  }


  /* ──────────────────────────────────────────
     FAQ ACCORDION
     Mirrors NHM: .open class on .faq-item parent.
  ────────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item     = btn.closest('.faq-item');
      var isOpen   = item.classList.contains('open');
      var answer   = btn.nextElementSibling;

      /* Close all */
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      /* Toggle current */
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });


  /* ──────────────────────────────────────────
     SMOOTH SCROLL — anchor links
     Uses Lenis when available, same easing as NHM.
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      var navH = nav.offsetHeight;

      if (lenis) {
        lenis.scrollTo(target, {
          offset:   -(navH + 16),
          duration: 1.9,
          easing:   function (t) { return 1 - Math.pow(1 - t, 4); },
        });
      } else {
        var top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
