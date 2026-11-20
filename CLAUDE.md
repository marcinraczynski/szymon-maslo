# Szymon Masło – strona WWW (marka osobista)

Wykonawca: Detal Studio (Marcin). Klient: Szymon Masło (Szymon Masło Consulting). Integracje (formularze, skrypty, GA, płatności) robi Tommy.

## Cel tego etapu

Wdrożyć **stronę główną jako statyczny front** (HTML, CSS, JS) i wystawić go na GitHub Pages, żeby klient mógł go obejrzeć i zaakceptować.

**Docelowo strona trafi do WordPressa** jako własny motyw na serwerze klienta (FTP i baza danych). Front piszemy więc tak, żeby dało się go potem przenieść do motywu bez przepisywania. Szczegóły w sekcji „Pod WordPressa”.

Animacje, przejścia i efekty przy przewijaniu Marcin opisze osobno. Na tym etapie zbuduj układ, treści i interakcje 1:1 z projektem, a w miejscach na animacje zostaw czyste punkty zaczepienia.

## Źródła prawdy

| Plik | Co zawiera |
|---|---|
| `docs/design-reference/strona-glowna.dc.html` | Zaakceptowany projekt. Pełny CSS, markup i logika interakcji (patrz `docs/design-reference/README.md`, jak go czytać). |
| `docs/tresci.md` | Ostateczne teksty wszystkich sekcji, łącznie z danymi do sliderów, osi i opinii. |
| `docs/design-system.md` | Kolory, typografia, odstępy, komponenty, breakpointy. |
| `docs/stara-strona/tresci-szymonmaslo-pl.md` | Treści z obecnej strony szymonmaslo.pl. Tylko jako tło, nie kopiuj stamtąd niczego bez pytania. |
| `assets/` | Zdjęcia, grafiki 3D i logotypy gotowe do użycia. `assets/source/` to oryginały. |

Projekt ma pierwszeństwo przed twoimi pomysłami na wygląd. Jeśli coś w nim jest technicznie złym rozwiązaniem, zaproponuj zmianę zamiast wprowadzać ją po cichu.

## Stack

- Czysty HTML, CSS i JavaScript (moduły ES). Bez frameworków, bez jQuery, bez Tailwinda.
- Opcjonalnie Vite jako serwer deweloperski i do budowania, ale wynik musi działać jako zwykłe pliki statyczne na GitHub Pages.
- Font: Montserrat (100–800). Na start Google Fonts, docelowo samodzielnie hostowany woff2 z podzbiorem latin-ext.
- Bez zewnętrznych bibliotek do animacji, dopóki Marcin o nie nie poprosi. Jeśli będą potrzebne, najpierw zapytaj.

## Proponowana struktura repo

```
/
├─ index.html
├─ assets/
│  ├─ css/
│  │  ├─ tokens.css        # zmienne: kolory, fonty, promienie, odstępy
│  │  ├─ base.css          # reset, typografia, .wrap, .btn, .flute
│  │  └─ sections/*.css    # jeden plik na sekcję
│  ├─ js/
│  │  ├─ main.js
│  │  ├─ data.js           # treści dynamiczne (ścieżki, oś, opinie, opcje formularza)
│  │  └─ components/*.js   # paths-slider, bento-carousel, people, apply-wizard, mobile-menu
│  ├─ img/  logo/  fonts/
└─ docs/
```

Każda sekcja to osobny, samodzielny blok HTML z własnym plikiem CSS i, jeśli trzeba, JS. To będą później `template-parts` motywu.

## Sekcje strony głównej (kolejność)

1. **Hero:** tło z rozmytym korytarzem, Szymon wycięty z tła, lewa część za „fakturowanym szkłem” (`.flute`), menu w szklanej pigułce, przycisk „Porozmawiajmy”, ikony LinkedIn i Instagram po prawej, cztery komórki „Masz pomysł / Masz firmę / Szukasz kapitału / Masz startup” na dole (prowadzą do sekcji ścieżek).
2. **Liczby, które stoją za radą:** bento: 250 mln zł (grafika 3D), zdjęcie z logotypami firm, 12 lat, 1000+, 100+, złota karta „Dziś pomagam founderom”, pasek „W mediach”. Na telefonie poziomy slider (scroll-snap) z kropkami.
3. **Gdzie jesteś dzisiaj?:** zakładki i strzałki, a pod nimi slider: jedna duża karta na środku, sąsiednie przygaszone i pomniejszone. Na telefonie zamiast zakładek kropki i przesuwanie palcem. Przycisk „Porozmawiajmy” w karcie przewija do formularza **i ustawia etap w kroku 1, od razu przechodząc do kroku 2**.
4. **Przeszedłem każdy szczebel:** „schody” z 8 etapami (każdy wyższy), ostatni „Dziś / Energio” podświetlony. Pod nimi blok fundacji i link „Pełna historia”. Na telefonie pionowa lista.
5. **Ludzie, z którymi działam:** trzy portrety jako akordeon poziomy. Kliknięty się rozszerza i pokazuje cytat. Na telefonie pionowo.
6. **Newsletter:** spokojny pas z polem e-mail i „Zapisz się”.
7. **Porozmawiajmy o Twojej firmie:** po lewej opis i informacja o limicie 3 firm w miesiącu, po prawej formularz krok po kroku (4 kroki z paskiem postępu, ekran podziękowania).
8. **Stopka:** logo, menu, LinkedIn i Instagram, prawa autorskie, ogromny napis „SZYMON MASŁO” znikający w gradiencie.

Dokładne wymiary, kolory i stany są w pliku projektu. Breakpointy: 1100 px i 640 px.

## Interakcje do zbudowania

- **Slider ścieżek:** stan aktywnej karty, zakładki, strzałki, kropki (mobile), przesuwanie palcem, klawiatura (strzałki), poprawne role ARIA (`tablist`/`tab`/`tabpanel`).
- **Bento na telefonie:** `scroll-snap` i kropki zsynchronizowane ze scrollem.
- **Opinie:** akordeon, `aria-pressed` na kartach, przełączanie klawiaturą.
- **Formularz krokowy:** 4 kroki, „Wstecz”, „Dalej”, walidacja (e-mail, telefon, zgoda), ekran podziękowania. Na tym etapie wysyłka to atrapa: zbierz dane do obiektu i pokaż podziękowanie. Struktura danych ma być gotowa do podpięcia pod WordPressa.
- **Menu mobilne:** w projekcie jest tylko przycisk. Zaproponuj pełnoekranowe menu w stylu strony (ciemne tło, szkło, beż) i pokaż je Marcinowi przed dopracowaniem.

## Zasady, których pilnuj

- **Polska typografia:** żadne pojedyncze litery (i, a, w, z, o, u) na końcu linii. W statycznym HTML używaj `&nbsp;`, a dla treści z JS lub WordPressa zrób funkcję pomocniczą (wzór jest w pliku projektu: `nb()`). W WordPressie to samo jako filtr na `the_content` i pola.
- **Nie zmieniaj treści** bez pytania. Teksty w nawiasach kwadratowych `[…]` to miejsca do uzupełnienia przez klienta. Zostaw je widoczne.
- **Nie dopisuj liczb ani faktów.** Wszystkie liczby na stronie wymagają jeszcze potwierdzenia przez Szymona (lista w `docs/tresci.md`).
- **Dostępność:** prawdziwe `<button>` i `<a href>`, etykiety pól, `alt` na zdjęciach, kontrast min. 4.5:1, focus widoczny, `prefers-reduced-motion` wyłącza animacje.
- **Wydajność:** obrazy w WebP lub AVIF z `srcset` i `sizes`, `loading="lazy"` poniżej hero, preload hero i fontu. Animuj tylko `transform` i `opacity`. `backdrop-filter` (szkło) jest kosztowny, więc nie mnóż go bez potrzeby. Cel: Lighthouse 90+ w Performance i Accessibility na mobile.
- **Bez ciasteczek i skryptów śledzących** na tym etapie. Meta Pixel i GA dojdą w WordPressie, razem z banerem zgód.

## Pod WordPressa (docelowo)

Front jest pierwszym krokiem do motywu WordPress. Pisz z myślą o tym:

- Każda sekcja to przyszły `template-parts/home/<sekcja>.php`. Treści z `data.js` staną się polami edytowalnymi w panelu (Marcin wybierze: ACF lub własne bloki).
- Klasy CSS nazywaj po sekcjach i komponentach, nie po wyglądzie, i bez globalnych kolizji (np. prefiks sekcji).
- Formularz zgłoszeniowy w WP: wysyłka z powiadomieniem e-mail, a docelowo przekazanie do CRM lub asystentki (integracje robi Tommy). Pola: etap, blokada (tekst), forma współpracy, imię i nazwisko, e-mail, telefon, zgoda.
- Newsletter: narzędzie jeszcze niewybrane. Zostaw formularz z łatwą do podmiany akcją.
- Na późniejszy etap: czat (np. Chatbase), płatności (operator do wyboru przez Szymona), strefa kursowa, podstrony (Współpraca, Startupy, O mnie, Blog, Kontakt).
- Klient nie chce przycisku „kup teraz”. Ścieżka to zgłoszenie, potem kwalifikacja przez zespół, potem rozmowa.

## Jak pracować z Marcinem

- Odpowiadaj po polsku, krótko i konkretnie.
- Pracuj iteracyjnie: najpierw szkielet i sekcje 1:1 z projektem, potem interakcje, potem animacje według instrukcji Marcina.
- Przed dodaniem zależności, zmianą struktury repo albo pracą wykraczającą poza zadanie zapytaj.
- Zgłaszaj rozjazdy między projektem a realną przeglądarką, zamiast je ukrywać.
