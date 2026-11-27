import { chapters } from '../data.js';
import { t, esc } from '../utils/typography.js';

/**
 * Oś rozdziałów na /o-mnie/. Każdy rozdział ma własny `data-reveal`,
 * więc przy przewijaniu pojawiają się jeden po drugim (motion.css → CHAPTERS).
 */
export function renderChapters(root, items = chapters) {
  const list = root.querySelector('[data-chapters-list]');
  if (!list) return;
  list.innerHTML = items.map(([year, role, name, text, lesson], i) => {
    const now = i === items.length - 1;
    return `<li class="chapters__item${now ? ' chapters__item--now' : ''}" data-reveal="chapter"${now ? ' aria-current="step"' : ''}>
      <div class="chapters__when"><span class="chapters__year">${esc(year)}</span><small class="chapters__role">${esc(role)}</small></div>
      <div class="chapters__what"><h3 class="chapters__name">${t(name)}</h3><p class="chapters__text">${t(text)}</p></div>
      <div class="chapters__lesson"><small>Lekcja</small><p>${t(lesson)}</p></div>
    </li>`;
  }).join('');
}
