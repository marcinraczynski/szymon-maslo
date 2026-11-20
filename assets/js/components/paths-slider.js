import { t, esc } from '../utils/typography.js';
import { arrowRight } from '../utils/icons.js';

/**
 * Slider ścieżek (sekcja 3).
 * - zakładki (tablist/tab/tabpanel) ze strzałkami klawiatury i roving tabindex,
 * - strzałki poprzednia/następna, kropki na telefonie, przesuwanie palcem,
 * - „Porozmawiajmy” w karcie wysyła zdarzenie `apply:preselect` do formularza.
 * Punkt zaczepienia pod animacje: zdarzenie `paths:change` na sekcji.
 */
export function initPathsSlider(root, { paths, initial = 0 }) {
  const tablist = root.querySelector('[data-paths-tabs]');
  const track = root.querySelector('[data-paths-track]');
  const dots = root.querySelector('[data-paths-dots]');
  const slider = root.querySelector('[data-paths-slider]');
  const n = paths.length;
  let index = initial;

  tablist.innerHTML = paths.map((p, i) => `
    <button type="button" role="tab" class="paths__tab" id="paths-tab-${i}" aria-controls="paths-panel-${i}">
      <small>0${i + 1}</small>${esc(p.label)}
    </button>`).join('');

  track.innerHTML = paths.map((p, i) => `
    <article class="paths__slide" id="paths-panel-${i}" role="tabpanel" aria-labelledby="paths-tab-${i}" aria-roledescription="slajd" data-index="${i}">
      <div class="paths__txt">
        <small class="paths__label">0${i + 1} · ${esc(p.label)}</small>
        <h3 class="paths__title">${t(p.title)}</h3>
        <p class="paths__desc">${t(p.desc)}</p>
        <a class="btn" href="#porozmawiajmy" data-paths-apply="${i}">Porozmawiajmy ${arrowRight}</a>
      </div>
      <div class="paths__vis">
        <div class="paths__glow paths__glow--${(i % 4) + 1}" aria-hidden="true"></div>
        <div class="flute" aria-hidden="true"></div>
        <dl class="paths__facts">
          <div><dt>Format</dt><dd>${t(p.format)}</dd></div>
          <div><dt>Efekt</dt><dd>${t(p.result)}</dd></div>
        </dl>
      </div>
    </article>`).join('');

  dots.innerHTML = paths.map((p, i) => `
    <button type="button" class="paths__dot-btn" aria-label="${esc(p.label)}" aria-controls="paths-panel-${i}"><span class="dot"></span></button>`).join('');

  const tabs = [...tablist.children];
  const slides = [...track.children];
  const dotBtns = [...dots.children];

  function render() {
    track.style.setProperty('--i', index);
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
    });
    slides.forEach((slide, i) => {
      const on = i === index;
      slide.classList.toggle('is-active', on);
      // Przygaszone karty są widoczne, ale niedostępne z klawiatury i dla czytników.
      slide.setAttribute('aria-hidden', String(!on));
      slide.querySelectorAll('a, button').forEach((el) => { el.tabIndex = on ? 0 : -1; });
    });
    dotBtns.forEach((btn, i) => {
      const on = i === index;
      btn.setAttribute('aria-pressed', String(on));
      btn.firstElementChild.classList.toggle('is-active', on);
    });
  }

  function go(i, { focusTab = false } = {}) {
    const next = (i + n) % n;
    if (next === index) return;
    index = next;
    render();
    if (focusTab) tabs[index].focus();
    root.dispatchEvent(new CustomEvent('paths:change', { detail: { index } }));
  }

  tablist.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (tab) go(tabs.indexOf(tab));
  });
  tablist.addEventListener('keydown', (e) => {
    const keys = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: n - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    go(keys[e.key], { focusTab: true });
  });

  dots.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn) go(dotBtns.indexOf(btn));
  });
  dots.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    go(index + (e.key === 'ArrowRight' ? 1 : -1));
    dotBtns[index].focus();
  });

  root.querySelector('[data-paths-prev]').addEventListener('click', () => go(index - 1));
  root.querySelector('[data-paths-next]').addEventListener('click', () => go(index + 1));

  track.addEventListener('click', (e) => {
    const slide = e.target.closest('.paths__slide');
    if (!slide) return;
    const i = Number(slide.dataset.index);
    const apply = e.target.closest('[data-paths-apply]');
    if (i !== index) {
      // klik w przygaszoną kartę tylko ją aktywuje
      e.preventDefault();
      go(i);
      return;
    }
    if (apply) {
      document.dispatchEvent(new CustomEvent('apply:preselect', { detail: { stage: paths[i].stage } }));
    }
  });

  let startX = null;
  let startY = null;
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    startX = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    go(index + (dx < 0 ? 1 : -1));
  }, { passive: true });

  render();
  return { go, get index() { return index; } };
}
