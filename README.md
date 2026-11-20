# Szymon Masło – strona główna (etap 1, statyczny front)

Czysty HTML, CSS i JS (moduły ES), bez zależności i bez kroku budowania. Podgląd publikowany na GitHub Pages przez `.github/workflows/pages.yml` (tylko `index.html` i `assets/` bez `assets/source/`).

## Uruchomienie lokalnie

Moduły ES wymagają serwera HTTP (nie `file://`):

```
python3 -m http.server 8000
# albo: npx serve .
```

## Struktura

- `index.html`: wszystkie sekcje. Każda zaczyna się komentarzem `template-part: home/<sekcja>`, to przyszłe pliki motywu WP.
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
- `--delay` w `style`: opóźnienie.

## Integracje (Tommy)

- Formularz zgłoszeniowy: `submitApplication()` w `assets/js/components/apply-wizard.js` dostaje gotowy obiekt (`stage`, `blocker`, `cooperation`, `full_name`, `email`, `phone`, `consent`, …). Endpoint w `data-endpoint` formularza.
- Newsletter: zwykły `<form>`; po wyborze narzędzia ustaw `action` i usuń `data-newsletter-mock`.
