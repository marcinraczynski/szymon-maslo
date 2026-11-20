/**
 * Animacje strony: reveal przy przewijaniu, intro hero, liczniki, paralaksa, pasek postępu.
 * Bez bibliotek. Jeden IntersectionObserver na reveal, rAF tylko przy scrollu.
 * Gdy html nie ma klasy .motion (prefers-reduced-motion albo brak JS), nic nie robi.
 */
const root = document.documentElement;

/** Dzieli tekst nagłówka na słowa w maskach, zachowując <b>, <br> i twarde spacje. */
export function splitWords(el) {
  let w = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = child.textContent.split(/( +)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (/^ +$/.test(part)) { frag.append(document.createTextNode(part)); return; }
          const outer = document.createElement('span');
          outer.className = 'split-w';
          const inner = document.createElement('span');
          inner.textContent = part;
          outer.style.setProperty('--w', w++);
          outer.append(inner);
          frag.append(outer);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
        walk(child);
      }
    });
  };
  walk(el);
  el.classList.add('is-split');
}

function setStaggerIndexes(container) {
  [...container.children].forEach((child, i) => child.style.setProperty('--i', i));
}

function animateCount(el) {
  const target = Number(el.dataset.count);
  const dur = 1800;
  const start = performance.now();
  const ease = (t) => 1 - Math.pow(2, -10 * t);
  const tick = (now) => {
    const p = Math.min(1, (now - start) / dur);
    el.textContent = String(Math.round(target * (p === 1 ? 1 : ease(p))));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function initMotion() {
  if (!root.classList.contains('motion')) return;

  document.querySelectorAll('[data-split]').forEach(splitWords);
  document.querySelectorAll('[data-stagger]').forEach(setStaggerIndexes);

  // liczniki startują od 0 (wartość docelowa jest w HTML, więc bez JS widać liczbę)
  const counters = [...document.querySelectorAll('[data-count]')];
  counters.forEach((el) => { el.dataset.count = el.textContent.trim(); el.textContent = '0'; });

  // ----- reveal -----
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-in');
      el.querySelectorAll('[data-count]').forEach(animateCount);
      if (el.matches('[data-count]')) animateCount(el);
      reveal.unobserve(el);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

  document.querySelectorAll('[data-reveal], [data-stagger], [data-split], [data-reveal-box]').forEach((el) => {
    if (!el.closest('.hero')) reveal.observe(el);
  });

  // ----- sekcje widoczne (pauzowanie animacji w pętli poza ekranem) -----
  const visible = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle('is-visible', e.isIntersecting));
  });
  document.querySelectorAll('[data-section]').forEach((s) => visible.observe(s));

  // ----- intro hero -----
  const hero = document.querySelector('.hero');
  if (hero) {
    setStaggerIndexes(hero.querySelector('.hero__cells'));
    // Intro startuje, gdy font jest gotowy (max 1,2 s), żeby tekst nie mignął fontem zastępczym.
    const start = () => requestAnimationFrame(() => {
      hero.classList.add('is-in');
      hero.querySelectorAll('[data-split]').forEach((h) => h.classList.add('is-in'));
    });
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1200))]).then(start);
  }

  // ----- paralaksa hero + pasek postępu (jeden handler, rAF) -----
  const desktop = matchMedia('(min-width: 641px)');
  let heroVisible = true;
  if (hero) new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(hero);
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);
      if (hero && heroVisible && desktop.matches) {
        hero.style.setProperty('--hero-p', Math.min(1, y / hero.offsetHeight).toFixed(4));
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
