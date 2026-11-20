import { career } from '../data.js';
import { t, esc } from '../utils/typography.js';

/** Schody kariery (sekcja 4). Wysokość stopnia rośnie o 44 px (jak w projekcie). */
export function renderCareer(root, items = career) {
  const list = root.querySelector('[data-career-list]');
  list.innerHTML = items.map((s, i) => {
    const now = i === items.length - 1;
    return `<li class="career__step${now ? ' career__step--now' : ''}" style="--h:${230 + i * 44}px"${now ? ' aria-current="step"' : ''}>
      <span class="career__year">${esc(s.year)}</span>
      <small class="career__role">${esc(s.role)}</small>
      <h3 class="career__name">${esc(s.name)}</h3>
      <p class="career__gain">${t(s.gain)}</p>
    </li>`;
  }).join('');
}
