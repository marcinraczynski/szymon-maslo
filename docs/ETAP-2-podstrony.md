# Etap 2: podstrony (Współpraca, Startupy, O mnie, Kontakt)

Ten plik uzupełnia `CLAUDE.md`. Zasady z `CLAUDE.md` (stack, typografia, dostępność, wydajność, „pod WordPressa”) obowiązują dalej.

## Cel

Dobudować do statycznego frontu cztery podstrony w tym samym stylu co strona główna, **z animacjami**, i wystawić całość na GitHub Pages. Marcin pokaże ją Szymonowi jako działającą stronę. Szymon będzie poprawiał głównie treści i drobne elementy układu. **WordPressa jeszcze nie stawiamy.** Przeniesienie do motywu będzie po akceptacji, więc front ma być do tego gotowy (sekcje jako osobne bloki, treści list w danych, nie w kodzie logiki).

## Źródła prawdy

| Plik | Co zawiera |
|---|---|
| `docs/design-reference/wspolpraca.dc.html` | Projekt podstrony Współpraca |
| `docs/design-reference/startupy.dc.html` | Projekt podstrony Startupy |
| `docs/design-reference/o-mnie.dc.html` | Projekt podstrony O mnie |
| `docs/design-reference/kontakt.dc.html` | Projekt podstrony Kontakt |
| `docs/tresci-podstrony.md` | Te same teksty w czytelnej formie (do poprawek klienta) |
| `assets/img/podstrony/` | Nowe zdjęcia do hero i sekcji |

Pliki `.dc.html` czytaj tak jak `strona-glowna.dc.html` (patrz `docs/design-reference/README.md`). Każdy ma pełny CSS, także wspólne style ze strony głównej. **Nie kopiuj CSS-a czterokrotnie.** Wspólne rzeczy weź z tego, co już jest w repo, a dopisz tylko style nowych sekcji.

Projekty są tylko na desktop. Wersje mobilne zrób według reguł `@media` (1100 px i 640 px), które już są w plikach, i według wzorców ze strony głównej (slidery z kropkami, jedna kolumna, menu mobilne). Miejsca, w których nie jesteś pewien, wypisz.

## Adresy

Takie same jak docelowo w WordPressie:

- `/wspolpraca/`
- `/startupy/`
- `/o-mnie/`
- `/kontakt/`

Podepnij menu, stopkę, okruszki i linki między stronami (np. „Pełna historia” na stronie głównej → `/o-mnie/`, karty ścieżek na głównej → odpowiednie bloki na `/wspolpraca/`: `#pomysl`, `#firma`, `#kapital`, `#startup`, przycisk „Porozmawiajmy” w nagłówku → formularz na bieżącej stronie albo `/kontakt/`). Aktywna pozycja menu ma klasę `on` i `aria-current="page"`. Blog to na razie `#`.

## Wspólne komponenty (zrób raz, używaj wszędzie)

- **Hero podstrony** (`.sub-hero`): tło z korytarzem, zdjęcie z prawej z maską, szkło `.flute` z lewej, okruszki, H1, lead, 4 komórki na dole. Różni się tylko zdjęciem, tekstami i komórkami.
- **FAQ** (akordeon): Współpraca, Startupy, Kontakt. Pierwsze pytanie otwarte, `aria-expanded`.
- **Formularz krokowy**: Współpraca używa tego samego co strona główna (te same pytania). Startupy mają własne pytania (4 kroki: Firma, Sprzedaż, Skala, Kontakt). Zrób jeden komponent sterowany konfiguracją kroków.
- **Formularz prosty**: Kontakt (temat, imię i nazwisko, firma, e-mail, telefon, wiadomość, zgoda). Kliknięcie komórki w hero ustawia temat i przewija do formularza.
- **Newsletter** i **stopka**: jak na stronie głównej.

Wysyłka wszystkich formularzy to nadal atrapa (dane do obiektu, ekran podziękowania). Nic nie wysyłaj na zewnątrz.

## Rzeczy specyficzne dla stron

- **Współpraca:** bloki form współpracy z kotwicami `#pomysl`, `#firma`, `#kapital`, `#startup` (komórki hero do nich prowadzą), sekcja „Jak wygląda współpraca” (4 kroki + rytm), pas cytatu, FAQ, formularz.
- **Startupy:** karty „Szukam / Nie szukam”, 4 branże, „Co wnoszę”, proces selekcji, pas „Zasada”, formularz startupowy, FAQ. Ostatnia odpowiedź w FAQ to placeholder `[…]`. Zostaw go.
- **O mnie:** oś 9 rozdziałów generowana z danych (`ch` w skrypcie). Sekcja „W co wierzę” ze zdjęciem. Firmy z logotypami (ENERGIO na razie jako napis, logo dojdzie). Złota linia pod hero (`.om-hero::after`).
- **Kontakt:** opisany wyżej formularz prosty, sekcja „Dla kogo jest ten formularz”, newsletter, FAQ.

## Animacje

Użyj tego samego systemu animacji co na stronie głównej (te same czasy, krzywe i sposób wejścia sekcji), żeby całość była spójna. Dodatkowo:

- **O mnie, oś rozdziałów:** rozdziały pojawiają się jeden po drugim przy przewijaniu.
- Wszystko wyłączone przy `prefers-reduced-motion`.

Jeśli na stronie głównej animacji jeszcze nie ma, zatrzymaj się i zapytaj Marcina, zanim cokolwiek wymyślisz.

## Znany błąd w plikach projektu: odstępy

W CSS projektu jest reset `.sm h1,.sm h2,.sm h3,.sm p,… {margin:0;padding:0}`. Ma wyższą specyficzność niż pojedyncze klasy, więc część zaplanowanych odstępów (np. `.offer-lead{margin-top}`, `.bl-list{margin-top}`) w podglądzie projektu nie działała i było za ciasno. W `o-mnie.dc.html` i `kontakt.dc.html` jest już poprawiony na:

```css
:where(.sm) :where(h1,h2,h3,p,ul,ol,figure,blockquote){margin:0;padding:0}
```

W repo zastosuj reset o niskiej specyficzności (np. przez `:where()`) dla wszystkich stron, tak żeby marginesy z CSS sekcji działały. Potem porównaj stronę główną z projektem i powiedz Marcinowi, gdzie odstępy się zmieniły.

## Podgląd dla klienta

- Na czas podglądu dodaj `<meta name="robots" content="noindex, nofollow">` na każdej stronie i `robots.txt` z `Disallow: /`, żeby GitHub Pages nie trafił do Google.
- Bez ciasteczek, analityki i zewnętrznych skryptów (poza Google Fonts, o ile jeszcze nie jest hostowany lokalnie).

## Do potwierdzenia przez klienta (nie zmieniaj sam)

- ~~Słowo „teren”~~ Rozstrzygnięte: Marcin nie chce kojarzenia ze sprzedażą „w terenie”. Zamiany: lead „Przeszedłem każdy szczebel” → „Od handlowca po zarząd spółki.”, branża 01 na Startupach → „Od własnego call center po ogólnopolską sieć handlowców.”, „Co wnoszę / Doświadczenie” → „Od handlowca po zarząd spółki, która sprzedała za ponad 250 mln zł.” (do akceptacji Szymona).
- Adres e-mail i telefon do sekcji „Wolisz napisać bezpośrednio?” na Kontakcie (na razie tylko LinkedIn i Instagram).
- Logo ENERGIO, linki do Neptun Energy, Energio, fundacji i artykułów prasowych.
- Liczby (250 mln, 12 lat, 1000+, 100+), lista rezerwowa w FAQ Kontaktu, zasady wejścia w startupy.

## Kolejność pracy

1. Wspólne komponenty i adresy stron (szkielet czterech stron z hero, menu i stopką).
2. Sekcje każdej strony 1:1 z projektem, desktop i mobile.
3. Interakcje (FAQ, formularze, linki z komórek i kotwic).
4. Animacje jak na stronie głównej + oś na O mnie.
5. Deploy na GitHub Pages i lista rzeczy do decyzji Marcina.
