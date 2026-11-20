/**
 * Menu mobilne (propozycja do akceptacji): pełnoekranowy <dialog>.
 * <dialog>.showModal() daje pułapkę fokusu i zamykanie klawiszem Esc.
 */
export function initMobileMenu(button, dialog) {
  if (!button || !dialog) return;
  const html = document.documentElement;

  function open() {
    dialog.showModal();
    html.classList.add('is-menu-open');
    button.setAttribute('aria-expanded', 'true');
  }
  function close() {
    if (dialog.open) dialog.close();
  }

  button.addEventListener('click', open);
  dialog.addEventListener('close', () => {
    html.classList.remove('is-menu-open');
    button.setAttribute('aria-expanded', 'false');
    button.focus();
  });
  dialog.addEventListener('click', (e) => {
    if (e.target.closest('[data-mmenu-close]') || e.target.closest('a')) close();
  });
  // zamknij, gdy ekran urośnie powyżej breakpointu z pełnym menu
  matchMedia('(min-width: 1101px)').addEventListener('change', (e) => { if (e.matches) close(); });
}
