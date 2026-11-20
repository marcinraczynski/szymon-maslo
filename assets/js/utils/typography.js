/**
 * Polska typografia: twarda spacja po jednoliterowych spójnikach i przyimkach,
 * żeby nie zostawały na końcu linii. Odpowiednik w WP: filtr na the_content i pola.
 * Wzór z projektu (nb()), rozszerzony o kolejne wystąpienia pod rząd („i w”).
 */
export function nb(text) {
  if (typeof text !== 'string') return text;
  return text.replace(/(^|[\s ])([aiouwzAIOUWZ])\s/g, '$1$2 ').replace(/(^|[\s ])([aiouwzAIOUWZ])\s/g, '$1$2 ');
}

/** Bezpieczne wstawianie tekstu do HTML (dane z data.js / przyszłego WP). */
export function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** nb() + esc() w jednym, do szablonów. */
export const t = (text) => esc(nb(text));
