/**
 * Pasek nawigacji po przewinięciu: pojawia się, gdy górny pasek hero zniknie z ekranu.
 * Ukryty pasek jest `inert`, więc nie łapie fokusu ani kliknięć.
 */
export function initStickyHeader(bar, trigger) {
  if (!bar || !trigger) return;
  const set = (show) => {
    bar.classList.toggle('is-shown', show);
    bar.inert = !show;
  };
  set(false);
  new IntersectionObserver(([e]) => set(!e.isIntersecting && e.boundingClientRect.top < 0))
    .observe(trigger);
}
