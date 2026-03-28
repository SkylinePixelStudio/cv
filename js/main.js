/* ════════════════════════════════════════
   Dr. Karunanithi — Portfolio JS
════════════════════════════════════════ */

// ── NAV: hamburger + active link highlight ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── NAV: highlight on scroll ──
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
function highlightNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--gold-light)' : '';
  });
}
window.addEventListener('scroll', highlightNav, { passive: true });

// ── REVEAL ON SCROLL (Intersection Observer) ──
const revealEls = document.querySelectorAll('.reveal, .reveal-right');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings in same parent
      const siblings = [...entry.target.parentElement.children]
        .filter(el => el.classList.contains('reveal') || el.classList.contains('reveal-right'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('revealed'), idx * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// ── SKILL BAR ANIMATION ──
const skillFills = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
skillFills.forEach(el => skillObs.observe(el));

// ── PUBLICATION FILTER ──
const filterBtns = document.querySelectorAll('.pf-btn');
const pubItems = document.querySelectorAll('.pub-item');
const pubCount = document.getElementById('pubCount');

function updateCount(filter) {
  const visible = [...pubItems].filter(p => !p.classList.contains('hidden')).length;
  const total = pubItems.length;
  if (filter === 'all') {
    pubCount.textContent = `Showing all ${total} publications & conferences`;
  } else {
    const label = filterBtns[filterBtns.length - 1].closest('.pub-filters')
      ? document.querySelector(`.pf-btn[data-filter="${filter}"]`)?.textContent
      : filter;
    pubCount.textContent = `Showing ${visible} of ${total} — filtered by "${document.querySelector(`.pf-btn[data-filter="${filter}"]`)?.textContent}"`;
  }
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    pubItems.forEach(item => {
      if (filter === 'all') {
        item.classList.remove('hidden');
      } else {
        const tags = (item.dataset.tags || '').split(' ');
        item.classList.toggle('hidden', !tags.includes(filter));
      }
    });
    updateCount(filter);

    // re-trigger reveal for newly visible items
    pubItems.forEach(item => {
      if (!item.classList.contains('hidden') && !item.classList.contains('revealed')) {
        item.classList.add('revealed');
      }
    });
  });
});

updateCount('all');

// ── SMOOTH SCROLL for nav links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── STAT NUMBER COUNTER ANIMATION ──
const statNums = document.querySelectorAll('.stat-num');
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const sup = el.querySelector('sup');
      const supText = sup ? sup.textContent : '';
      const raw = el.textContent.replace(supText, '').trim();
      const isK = raw.includes('K');
      const target = parseFloat(raw.replace('K', ''));
      let start = 0;
      const duration = 1400;
      const startTime = performance.now();
      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target * 10) / 10;
        el.childNodes[0].textContent = isK ? `${current}K` : current;
        if (progress < 1) requestAnimationFrame(tick);
        else {
          el.childNodes[0].textContent = raw;
          if (sup) el.appendChild(sup);
        }
      }
      if (sup) {
        el.childNodes[0].textContent = '0';
        el.appendChild(sup);
      }
      requestAnimationFrame(tick);
      statObs.unobserve(el);
    }
  });
}, { threshold: 0.8 });
statNums.forEach(el => statObs.observe(el));

// ── HERO STAGGER REVEAL ──
document.querySelectorAll('#hero .reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
  setTimeout(() => el.classList.add('revealed'), 200 + i * 120);
});
