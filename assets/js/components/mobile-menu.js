/**
 * Menu mobilne (propozycja do akceptacji): pełnoekranowy <dialog>.
 * <dialog>.showModal() daje pułapkę fokusu i zamykanie klawiszem Esc.
 */
export function initMobileMenu(buttons, dialog) {
  if (!buttons.length || !dialog) return;
  const html = document.documentElement;
  let opener = buttons[0];

  function open(e) {
    opener = e.currentTarget;
    dialog.showModal();
    html.classList.add('is-menu-open');
    opener.setAttribute('aria-expanded', 'true');
  }
  function close() {
    if (dialog.open) dialog.close();
  }

  buttons.forEach((b) => b.addEventListener('click', open));
  dialog.addEventListener('close', () => {
    html.classList.remove('is-menu-open');
    opener.setAttribute('aria-expanded', 'false');
    opener.focus();
  });
  dialog.addEventListener('click', (e) => {
    if (e.target.closest('[data-mmenu-close]') || e.target.closest('a')) close();
  });
  // zamknij, gdy ekran urośnie powyżej breakpointu z pełnym menu
  matchMedia('(min-width: 1101px)').addEventListener('change', (e) => { if (e.matches) close(); });
}
