import { t, esc } from '../utils/typography.js';

/**
 * Akordeon opinii (sekcja 5). Karty to <button aria-pressed>.
 * Klawiatura: Tab między kartami, Enter/Spacja rozwija, strzałki przenoszą i rozwijają.
 */
export function initPeople(root, { people, initial = 0 }) {
  const list = root.querySelector('[data-people-list]');
  const sizes = '(max-width: 1100px) calc(100vw - 56px), 640px';

  list.innerHTML = people.map((p) => `
    <button type="button" class="people__card">
      ${p.img
        ? `<img src="${p.img}-600.webp" srcset="${p.img}-600.webp 600w, ${p.img}-900.webp 900w" sizes="${sizes}" width="900" height="900" alt="${esc(p.name)}" loading="lazy" decoding="async">`
        : '<span class="people__placeholder" aria-hidden="true">S</span>'}
      <span class="people__in">
        <small class="people__role">${esc(p.role)}</small>
        <b class="people__name">${esc(p.name)}</b>
        <span class="people__quote-wrap"><q class="people__quote">${t(p.quote)}</q></span>
      </span>
    </button>`).join('');

  const cards = [...list.children];
  let index = initial;

  function render() {
    cards.forEach((c, i) => c.setAttribute('aria-pressed', String(i === index)));
  }
  function go(i, focus = false) {
    index = (i + cards.length) % cards.length;
    render();
    if (focus) cards[index].focus();
    root.dispatchEvent(new CustomEvent('people:change', { detail: { index } }));
  }

  list.addEventListener('click', (e) => {
    const card = e.target.closest('.people__card');
    if (card) go(cards.indexOf(card));
  });
  list.addEventListener('keydown', (e) => {
    const card = e.target.closest('.people__card');
    if (!card) return;
    const i = cards.indexOf(card);
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    go(i + delta, true);
  });

  render();
}
