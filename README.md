# Szymon Masło – statyczny front (etap 1: strona główna, etap 2: podstrony)

Czysty HTML, CSS i JS (moduły ES), bez zależności i bez kroku budowania. Podgląd publikowany na GitHub Pages przez `.github/workflows/pages.yml` (strony HTML, `robots.txt` i `assets/` bez `assets/source/`). Na czas podglądu każda strona ma `noindex`, a `robots.txt` blokuje wszystko.

## Uruchomienie lokalnie

Moduły ES wymagają serwera HTTP (nie `file://`):

```
python3 -m http.server 8000
# albo: npx serve .
```

## Struktura

- `index.html`: wszystkie sekcje. Każda zaczyna się komentarzem `template-part: home/<sekcja>`, to przyszłe pliki motywu WP.
- `wspolpraca/`, `startupy/`, `o-mnie/`, `kontakt/`: podstrony pod docelowymi adresami WP. Sekcje mają komentarze `template-part: <strona>/<sekcja>`. Nagłówek, menu mobilne, pasek po przewinięciu i stopka są w każdym pliku takie same (w WP: `header.php` i `footer.php`). Ścieżki do zasobów są względne (`../assets/…`), żeby działały na GitHub Pages pod `/szymon-maslo/`.
- Wspólne komponenty podstron: hero (`.hero.hero--sub`, `sections/subhero.css`), FAQ (`components/faq.js`, pytania w `data.js → faq`), formularz krokowy (`components/apply-wizard.js`, konfiguracja w `data.js`: `applyForm`, `startupForm`, `contactForm`; wybór przez `data-apply-config` na sekcji), newsletter i stopka jak na stronie głównej.
- `assets/css/tokens.css`, `base.css`, `sections/*.css` (jeden plik na sekcję, klasy z prefiksem sekcji), `motion.css` (wszystkie animacje).
- `assets/js/data.js`: treści dynamiczne (ścieżki, oś, opinie, opcje formularza). W WP to pola edytowalne.
- `assets/js/components/*.js`: slider ścieżek, bento na telefonie, opinie, formularz krokowy, newsletter, menu mobilne, animacje.
- `assets/js/utils/typography.js`: `nb()` (twarde spacje po jednoliterowych wyrazach). W WP to samo jako filtr `the_content`.
- `assets/img/*-<szerokość>.webp`: warianty do `srcset`, wygenerowane z plików w `assets/img/`.

## Animacje

Tylko `transform` i `opacity`, jeden `IntersectionObserver`, bez bibliotek. Włączają się, gdy `<html>` ma klasę `motion` (ustawiana w `<head>`; pomijana przy `prefers-reduced-motion`). Atrybuty w HTML:

- `data-reveal` (`fade`, `scale`, `left`, `right`): element pojawia się przy przewijaniu,
- `data-stagger` (`scale`, `fade`, `stairs`): dzieci pojawiają się kaskadowo,
- `data-split`: nagłówek odsłaniany słowo po słowie,
- `data-count`: licznik od 0 do wartości z HTML,
- `data-reveal="chapter"`: rozdziały osi na /o-mnie/ (pojawiają się po kolei, także gdy kilka wchodzi naraz),
- `data-reveal="zoom"`, `data-stagger="left"`, `data-stagger="process"` (łączniki między krokami),
- `--delay` w `style`: opóźnienie.

## Integracje (Tommy)

- Formularze (główna, Współpraca, Startupy, Kontakt) to jeden komponent. `submitApplication()` w `assets/js/components/apply-wizard.js` dostaje gotowy obiekt: wszystkie pola `name` z formularza, wybory z etykietami (`stage`/`stage_label`, `cooperation`, `sector`, `clients`, `topic`) oraz `source` (`home`, `wspolpraca`, `startupy`, `kontakt`), `page_url`, `submitted_at`. Endpoint w `data-endpoint` formularza.
  - Startupy: `company_name`, `website`, `sector`, `offer`, `clients`, `blocker`, `full_name`, `email`, `phone`, `consent`.
  - Kontakt: `topic`, `full_name`, `company`, `email`, `phone` (opcjonalny), `message`, `consent`.
- Newsletter: zwykły `<form>`; po wyborze narzędzia ustaw `action` i usuń `data-newsletter-mock`.
