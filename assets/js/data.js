/**
 * Treści dynamiczne strony głównej. Źródło: docs/tresci.md.
 * W WordPressie każda tablica stanie się polem edytowalnym (ACF repeater / blok).
 * Nie zmieniać treści bez akceptacji. `[…]` = do uzupełnienia przez klienta.
 * `\n` w tekście = złamanie linii zgodne z projektem (white-space: pre-line).
 */

/** Sekcja 3: ścieżki. `stage` wskazuje opcję w kroku 1 formularza. */
export const paths = [
  { label: 'Masz pomysł', title: 'Sprawdzimy, czy ktoś za to zapłaci.', desc: 'Patrzę na pomysł oczami sprzedawcy, zanim wydasz na niego pieniądze.', format: 'Konsultacja, 90 minut', result: 'Plan pierwszej sprzedaży', stage: 'idea' },
  { label: 'Masz firmę', title: 'Pomożemy firmie znów rosnąć.', desc: 'Strategia, model biznesowy, zespół i Twoja rola lidera. Najwyższy poziom to współpraca 1:1 ze mną.', format: 'Mentoring, 1–3 miesiące', result: 'Firma, która rośnie\nbez Ciebie', stage: 'company' },
  { label: 'Szukasz kapitału', title: 'Wejdziesz na rozmowę przygotowany.', desc: 'Model, liczby i narracja, które bronią się w pierwszych minutach. Kapitału za Ciebie nie pozyskuję.', format: 'Przygotowanie do inwestora', result: 'Model, liczby i narracja', stage: 'capital' },
  { label: 'Masz startup', title: 'Wchodzę w wybrane projekty.', desc: 'Firmy po pierwszych płacących klientach, przed skalą. Buduję z Wami sprzedaż od środka.', format: 'Partnerstwo operacyjne', result: 'Odpowiedź do 10 dni roboczych', stage: 'startup' }
];
export const pathsDefault = 1; // domyślnie aktywna karta 02

/** Sekcja 4: oś kariery (schody). Ostatni element jest podświetlony. */
export const career = [
  { year: '2013', role: 'Pierwsza firma', name: 'Waves Wear', gain: 'Marka od zera' },
  { year: '2014', role: 'Teren', name: 'Sprzedaż bankowa', gain: 'Rozmowy, które kończą się decyzją' },
  { year: '2016', role: 'Własne call center', name: 'Terminale płatnicze', gain: 'Zespół sprzedaży od podstaw' },
  { year: '2018', role: 'Dyrektor krajowy', name: 'Columbus Elite', gain: 'Sieć sprzedaży w całej Polsce' },
  { year: '2019', role: 'Członek zarządu', name: 'Supreme Energy', gain: 'Strategia i ekspansja w OZE' },
  { year: '2021', role: 'Prezes zarządu', name: 'Neptun Energy', gain: '250 mln zł sprzedaży w OZE' },
  { year: '2025', role: 'Rekrutacja', name: 'HR Maker', gain: 'Pozyskiwanie specjalistów' },
  { year: 'Dziś', role: 'Buduję', name: 'Energio', gain: 'Platforma dla rynku OZE' }
];

/** Sekcja 5: opinie. `img` bez rozszerzenia: komponent dokłada warianty -600/-900.webp. */
export const people = [
  { name: 'Paweł Żygowski', role: 'Klub Biznesowy', img: 'assets/img/people/pawel-zygowski',
    quote: 'W obu tych światach pokazał jedno – jest konkretny, zdecydowany i skuteczny. W biznesie nie ma u niego miejsca na przypadkowość. Ma jasną wizję, potrafi ją wdrożyć i egzekwować.' },
  { name: 'Paweł Swinarski', role: 'Przedsiębiorca, youtuber', img: 'assets/img/people/pawel-swinarski',
    quote: '[Cytat do uzupełnienia: 2–3 zdania o współpracy z Szymonem.]' },
  { name: 'Kuba Midel', role: 'Klub Aktywny Rentier', img: 'assets/img/people/kuba-midel',
    quote: 'W sprzedaży i zarządzaniu zespołami widziałem, że ma naturalny instynkt przywódcy – ludzie chcą za nim iść. Jeśli ktoś szuka partnera, który potrafi dowozić efekty w realnym biznesie, to Szymon jest właściwym człowiekiem.' }
];
export const peopleDefault = 0;

/** Sekcja 7: formularz. `value` = wartość zapisywana w zgłoszeniu (WP / CRM). */
export const applyForm = {
  stages: [
    { value: 'idea', label: 'Mam pomysł' },
    { value: 'company', label: 'Mam działającą firmę' },
    { value: 'capital', label: 'Szukam kapitału' },
    { value: 'startup', label: 'Mam startup\nz klientami' }
  ],
  cooperation: [
    { value: 'consultation', label: 'Konsultacja' },
    { value: 'mentoring', label: 'Mentoring' },
    { value: 'partnership', label: 'Wejście w projekt' },
    { value: 'unknown', label: 'Jeszcze nie wiem' }
  ],
  // Komunikaty walidacji: nie ma ich w projekcie ani w tresci.md – propozycja do akceptacji.
  errors: {
    name: 'Podaj imię i nazwisko.',
    email: 'Podaj poprawny adres e-mail.',
    phone: 'Podaj poprawny numer telefonu.',
    consent: 'Zaznacz zgodę, żebyśmy mogli się odezwać.'
  }
};
