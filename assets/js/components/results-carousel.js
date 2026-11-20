/**
 * Bento „Liczby” na telefonie: poziomy scroll-snap + kropki zsynchronizowane ze scrollem.
 * Na desktopie kropki są ukryte w CSS, a skrypt nic nie zmienia w układzie.
 */
export function initResultsCarousel(root) {
  const grid = root.querySelector('[data-results-grid]');
  const dotsBox = root.querySelector('[data-results-dots]');
  const tiles = [...grid.children].filter((el) => !el.matches('[data-results-skip]'));

  dotsBox.innerHTML = tiles.map(() => '<span class="dot"></span>').join('');
  const dots = [...dotsBox.children];

  let current = -1;
  function update() {
    const center = grid.scrollLeft + grid.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    tiles.forEach((tile, i) => {
      const mid = tile.offsetLeft + tile.offsetWidth / 2;
      const d = Math.abs(mid - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    if (best === current) return;
    current = best;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === best));
  }

  let ticking = false;
  grid.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; update(); });
  }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}
