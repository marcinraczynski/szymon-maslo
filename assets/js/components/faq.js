import { t } from '../utils/typography.js';

/**
 * FAQ (akordeon): Współpraca, Startupy, Kontakt. Pytania z data.js (`faq[<data-faq>]`),
 * w WordPressie pole powtarzalne. Pierwsze pytanie otwarte, jedno otwarte naraz.
 * Odpowiedź rozwija się płynnie (grid-template-rows 0fr → 1fr), zamknięta jest `visibility: hidden`,
 * więc nie łapie fokusu i nie jest czytana.
 */
let uid = 0;
export function initFaq(root, items) {
  const list = root.querySelector('[data-faq-list]');
  if (!list || !items) return;
  const base = `faq-${++uid}`;
  list.innerHTML = items.map(([q, a], i) => `
    <div class="faq__item${i === 0 ? ' is-open' : ''}">
      <h3 class="faq__q"><button type="button" class="faq__btn" id="${base}-q${i}" aria-expanded="${i === 0}" aria-controls="${base}-a${i}">
        <span>${t(q)}</span><i class="faq__ic" aria-hidden="true"></i></button></h3>
      <div class="faq__panel" id="${base}-a${i}" role="region" aria-labelledby="${base}-q${i}">
        <div class="faq__panel-in"><p class="faq__a">${t(a)}</p></div>
      </div>
    </div>`).join('');

  const rows = [...list.children];
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq__btn');
    if (!btn) return;
    const row = btn.closest('.faq__item');
    const open = !row.classList.contains('is-open');
    rows.forEach((r) => {
      const on = r === row && open;
      r.classList.toggle('is-open', on);
      r.querySelector('.faq__btn').setAttribute('aria-expanded', String(on));
    });
  });
}
