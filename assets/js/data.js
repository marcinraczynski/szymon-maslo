/**
 * Treści dynamiczne. Strona główna: docs/tresci.md, podstrony: docs/tresci-podstrony.md.
 * W WordPressie każda tablica stanie się polem edytowalnym (ACF repeater / blok).
 * Nie zmieniać treści bez akceptacji. `[…]` = do uzupełnienia przez klienta.
 * `\n` w tekście = złamanie linii zgodne z projektem (white-space: pre-line).
 */

/** Sekcja 3: ścieżki. `stage` wskazuje opcję w kroku 1 formularza, `more` – blok na /wspolpraca/. */
export const paths = [
  { label: 'Masz pomysł', title: 'Sprawdzimy, czy ktoś za to zapłaci.', desc: 'Patrzę na pomysł oczami sprzedawcy, zanim wydasz na niego pieniądze.', format: 'Konsultacja, 90 minut', result: 'Plan pierwszej sprzedaży', stage: 'idea', more: 'wspolpraca/#pomysl' },
  { label: 'Masz firmę', title: 'Pomożemy firmie znów rosnąć.', desc: 'Strategia, model biznesowy, zespół i Twoja rola lidera. Najwyższy poziom to współpraca 1:1 ze mną.', format: 'Mentoring, 1–3 miesiące', result: 'Firma, która rośnie\nbez Ciebie', stage: 'company', more: 'wspolpraca/#firma' },
  { label: 'Szukasz kapitału', title: 'Wejdziesz na rozmowę przygotowany.', desc: 'Model, liczby i narracja, które bronią się w pierwszych minutach. Kapitału za Ciebie nie pozyskuję.', format: 'Przygotowanie do inwestora', result: 'Model, liczby i narracja', stage: 'capital', more: 'wspolpraca/#kapital' },
  { label: 'Masz startup', title: 'Wchodzę w wybrane projekty.', desc: 'Firmy po pierwszych płacących klientach, przed skalą. Buduję z Wami sprzedaż od środka.', format: 'Partnerstwo operacyjne', result: 'Odpowiedź do 10 dni roboczych', stage: 'startup', more: 'wspolpraca/#startup' }
];
export const pathsDefault = 1; // domyślnie aktywna karta 02

/** Sekcja 4: oś kariery (schody). Ostatni element jest podświetlony. */
export const career = [
  { year: '2013', role: 'Pierwsza firma', name: 'Waves Wear', gain: 'Marka od zera' },
  { year: '2014', role: 'Sprzedaż', name: 'Sprzedaż bankowa', gain: 'Rozmowy, które kończą się decyzją' },
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
    quote: 'W obu tych światach pokazał jedno: jest konkretny, zdecydowany i skuteczny. W biznesie nie ma u niego miejsca na przypadkowość. Ma jasną wizję, potrafi ją wdrożyć i egzekwować.' },
  { name: 'Paweł Swinarski', role: 'Przedsiębiorca, youtuber', img: 'assets/img/people/pawel-swinarski',
    // ROBOCZY cytat (na podstawie wspólnego projektu HR Maker ze starej strony). Do akceptacji przez Pawła Swinarskiego przed publikacją.
    quote: 'Z Szymonem budujemy HR Maker. Szybko przechodzi od pomysłu do działania, a ludzie wokół niego zawsze wiedzą, za co odpowiadają. Na takiego wspólnika się stawia.' },
  { name: 'Kuba Midel', role: 'Klub Aktywny Rentier', img: 'assets/img/people/kuba-midel',
    quote: 'W sprzedaży i zarządzaniu zespołami widziałem, że ma naturalny instynkt przywódcy. Ludzie chcą za nim iść. Jeśli ktoś szuka partnera, który potrafi dowozić efekty w realnym biznesie, to Szymon jest właściwym człowiekiem.' }
];
export const peopleDefault = 0;

/** Komunikaty walidacji (wspólne dla formularzy). Klucze = atrybut name pola.
 *  Nie ma ich w projekcie ani w treściach – propozycja do akceptacji. */
const formErrors = {
  full_name: 'Podaj imię i nazwisko.',
  email: 'Podaj poprawny adres e-mail.',
  phone: 'Podaj poprawny numer telefonu.',
  consent: 'Zaznacz zgodę, żebyśmy mogli się odezwać.'
};

/** Sekcja 7 strony głównej i formularz na /wspolpraca/. `value` = wartość zapisywana w zgłoszeniu (WP / CRM). */
export const applyForm = {
  chosen: 'stage',
  choices: {
    stage: [
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
    ]
  },
  errors: formErrors
};

/* =====================================================================
   Podstrony (etap 2). Źródło: docs/tresci-podstrony.md.
   ===================================================================== */

/** FAQ: pierwsza pozycja otwarta. Klucz = atrybut data-faq sekcji. */
export const faq = {
  wspolpraca: [
    ['Czy jestem na odpowiednim etapie?', 'Jeśli masz firmę, zespół albo stałe przychody i czujesz, że doszedłeś do bariery rozwoju, to dobry moment na mentoring. Jeśli dopiero masz pomysł, zacznij od konsultacji.'],
    ['Co, jeśli nie wykonam zadań między spotkaniami?', 'Wtedy nie będzie efektów. Mogę wskazać drogę i dać Ci narzędzia, ale pracę w firmie wykonujesz Ty. To współpraca dla osób gotowych na działanie.'],
    ['Czy spotkania odbywają się na żywo?', 'Spotykamy się online w stałym rytmie, zwykle co dwa tygodnie. W wyjątkowych przypadkach możliwe jest spotkanie stacjonarne. Każde kończy się jasnym planem działań.'],
    ['Czy poznam innych uczestników?', 'Nie. To indywidualna współpraca, w pełni skupiona na Twojej firmie i Twoich wyzwaniach.'],
    ['Czy zgłoszenie gwarantuje współpracę?', 'Nie. Każde zgłoszenie przechodzi selekcję. Pracuję z firmami, które mają realny potencjał wzrostu i są gotowe na egzekucję.'],
    ['Co, jeśli wszystkie miejsca są zajęte?', 'Przyjmuję maksymalnie trzy nowe firmy w miesiącu. Gdy miejsca się skończą, trafisz na listę rezerwową, a my odezwiemy się, gdy zwolni się termin.'],
    ['Czy mogę zrezygnować w trakcie?', 'Tak. Selekcja na starcie sprawia, że zdarza się to rzadko, ale masz pełne prawo przerwać współpracę.']
  ],
  startupy: [
    ['Czy muszę mieć już przychody?', 'Tak. Szukam firm po pierwszych płacących klientach. Jeśli masz dopiero pomysł, zacznij od konsultacji na stronie Współpraca.'],
    ['Dlaczego nie pytacie o kwotę?', 'Bo na tym etapie liczy się sprzedaż, a nie wycena. O pieniądzach rozmawiamy dopiero wtedy, gdy wiemy, że chcemy działać razem.'],
    ['Kto czyta zgłoszenie?', 'Wstępną selekcję robi mój zespół. Jeśli projekt pasuje do etapu i branży, trafia do mnie.'],
    ['Ile czeka się na odpowiedź?', 'Do 10 dni roboczych. Odpowiadamy na każde zgłoszenie, także wtedy, gdy decyzja jest odmowna.'],
    ['Na jakich zasadach wchodzisz w projekt?', '[Do uzupełnienia przez Szymona: forma partnerstwa i zasady współpracy.]']
  ],
  kontakt: [
    ['Czy wysłanie wiadomości gwarantuje współpracę?', 'Nie. Każde zgłoszenie przechodzi selekcję. Pracuję z firmami, które mają realny potencjał wzrostu i są gotowe działać.'],
    ['Jakie są minimalne wymagania?', 'Do stałej współpracy potrzebujesz działającej firmy, zespołu albo stałych przychodów, które można skalować. Jeśli masz dopiero pomysł, zacznij od konsultacji.'],
    ['Czy mogę zacząć od jednej konsultacji?', 'Tak. Warunki ustalamy po wstępnej rozmowie, gdy wiemy już, czy konsultacja jest w stanie Ci pomóc.'],
    ['Co, jeśli wszystkie miejsca są zajęte?', 'Możesz dołączyć do listy rezerwowej. Damy znać, gdy zwolni się miejsce.'],
    ['Co, jeśli w trakcie uznam, że to nie dla mnie?', 'Możesz przerwać współpracę. Dzięki selekcji na starcie zdarza się to rzadko. Efekty przychodzą wtedy, gdy dasz sobie czas na wdrożenie.']
  ]
};

/** /startupy/: formularz zgłoszenia projektu (4 kroki). */
export const startupForm = {
  chosen: 'sector',
  stepLabels: ['Krok 1 z 4 · Firma', 'Krok 2 z 4 · Sprzedaż', 'Krok 3 z 4 · Skala', 'Krok 4 z 4 · Kontakt'],
  doneLabel: 'Wysłane',
  choices: {
    sector: [
      { value: 'direct-sales', label: 'Sprzedaż bezpośrednia' },
      { value: 'energy', label: 'Energetyka i OZE' },
      { value: 'hr', label: 'Rekrutacja i HR' },
      { value: 'marketplace', label: 'Marketplace / platforma' },
      { value: 'other', label: 'Inna branża' }
    ],
    clients: [
      { value: '1-10', label: '1–10' },
      { value: '11-50', label: '11–50' },
      { value: '51-200', label: '51–200' },
      { value: '200+', label: 'Ponad 200' }
    ]
  },
  errors: formErrors
};

/** /kontakt/: formularz prosty (jeden krok + podziękowanie). Komórki hero ustawiają temat. */
export const contactForm = {
  chosen: 'topic',
  stepLabels: ['Wiadomość'],
  doneLabel: 'Wysłane',
  choices: {
    topic: [
      { value: 'cooperation', label: 'Współpraca 1:1' },
      { value: 'consultation', label: 'Konsultacja' },
      { value: 'media', label: 'Media i wystąpienia' },
      { value: 'other', label: 'Inna sprawa' }
    ]
  },
  errors: formErrors
};

/** /o-mnie/: oś rozdziałów. [rok, rola, firma, opis, lekcja]. Ostatni rozdział jest podświetlony. */
export const chapters = [
  ['2013', 'Pierwsza firma', 'Waves Wear', 'Własna marka ubraniowa. Od pomysłu, przez projekt, po sprzedaż: pełny cykl biznesu przy ograniczonych zasobach.', 'Dobry produkt bez marketingu się nie sprzeda.'],
  ['2014–2016', 'Sprzedaż bezpośrednia', 'Produkty bankowe i pożyczki', 'Sprzedaż bezpośrednia, negocjacje i ambitne targety w wymagającym środowisku, gdzie liczyły się efekty i dyscyplina.', 'Rozmowa ma się kończyć decyzją.'],
  ['2016–2018', 'Własne call center', 'Terminale płatnicze', 'Call center sprzedające terminale w programie „Polska Bezgotówkowa”. Zespół od podstaw, operacje, rekrutacja i wyniki w skali kraju.', 'Ludzie dowożą wyniki, gdy rozumieją proces.'],
  ['2018–2019', 'Dyrektor krajowy', 'Columbus Elite', 'Odpowiedzialność za wyniki sprzedaży w całej Polsce i strukturę setek handlowców oraz liderów.', 'Cele operacyjne muszą wynikać z wizji.'],
  ['2019–2021', 'Członek zarządu', 'Supreme Energy', 'Współtworzenie strategii i ekspansji w branży OZE. Decyzje na poziomie zarządu i bezpośredni wpływ na rozwój spółki.', 'Na firmę trzeba patrzeć całościowo.'],
  ['2021', 'Prezes zarządu', 'Neptun Energy', 'Pełne przywództwo: od strategii, przez sprzedaż, po kulturę organizacji. Ponad 250 mln zł sprzedaży w OZE i tysiące wyszkolonych handlowców.', 'Firma rośnie, gdy rosną w niej ludzie.'],
  ['2025', 'Rekrutacja', 'HR Maker', 'Narzędzia i procesy, które zmieniają pozyskiwanie talentów. Sprzedażowe DNA przeniesione na budowanie zespołów.', 'Wygrywa ten, kto zbuduje lepszy zespół.'],
  ['2025', 'Misja', 'Fundacja Razem w Walce', 'Projekty wspierające dzieci chore onkologicznie. Biznesowa skuteczność w służbie misji społecznej.', 'Sukces mierzę też wpływem na ludzi.'],
  ['Dziś', 'Buduję', 'Energio', 'Platforma, która ma skończyć z podpisywaniem umów OZE po jednej rozmowie z handlowcem.', 'Najlepsze lekcje zamieniam w produkt.']
];
