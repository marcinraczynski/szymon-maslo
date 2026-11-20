# Design system – Szymon Masło

Źródło: `docs/design-reference/strona-glowna.dc.html` (sekcja `<style>`). Poniżej najważniejsze wartości.

## Kolory

| Token | Wartość | Użycie |
|---|---|---|
| `--page` | `#050504` | tło pod ramką strony |
| `--bg` | `#0B0A09` | tło strony (ciepła czerń) |
| `--card` | `#12110F` | karty, panele |
| `--text` | `#EEE8DE` | tekst podstawowy |
| `--text-2` | `#CFC8BC` | tekst akapitów na ciemnym |
| `--muted` | `#A39B8E` | opisy, etykiety |
| `--gold` | `#D6B88A` | jedyny akcent (beż z logo): przyciski, linie, lata, kropki |
| `--line` | `rgba(214,184,138,.22)` | beżowe linie i obramowania |
| `--line2` | `rgba(238,232,222,.09)` | neutralne linie |
| złoty gradient | `linear-gradient(135deg,#E9D3A8,#C9A46C 55%,#A9864F)` | złota karta w bento |

## Typografia

Jeden krój: **Montserrat**. Kontrast budujemy grubością, nie drugim fontem.

- Nagłówki: waga 200, `letter-spacing:-.025em`. Kluczowa fraza w `<b>` ma wagę 600.
- H1 hero: `clamp(46px, 5.4vw, 84px)`, line-height 1.
- H2 sekcji: `clamp(38px, 4vw, 62px)`, line-height 1.04.
- Duże liczby: waga 100 (np. „250” do 190 px).
- Etykiety: 11–12 px, waga 600, wersaliki, `letter-spacing:.24–.34em`, kolor `--gold` lub `--muted`.
- Akapity: 15–17 px, line-height 1.6–1.7.

## Kształty i odstępy

- Strona w ramce: padding 14 px wokół, `border-radius:28px`, obramowanie `--line2`.
- Karty: `border-radius:22–24px`. Przyciski: pigułki (`999px`).
- Kontener: `max-width:1320px`, padding boczny `clamp(24px,4vw,56px)`.
- Sekcje: `padding:120px 0` (mobile 72 px).

## Komponenty

- **`.btn`:** pigułka 56 px, beżowe tło, ciemny tekst, wersaliki 12 px. Hover: przezroczyste tło i beżowy tekst. Wariant `.ghost`: przezroczysty z jasną ramką.
- **`.flute` (fakturowane szkło):** kluczowy motyw wizualny. `backdrop-filter: blur(16px)` i `repeating-linear-gradient(90deg, …)`, które imitują pionowo żłobioną szybę. Używany w hero, w sliderze ścieżek i w bloku fundacji.
- **Szklany podpis (`.glass-tag`, `.slide-facts`):** ciemne półprzezroczyste tło, blur 12–14 px, ramka `rgba(238,232,222,.14)`, promień 16 px.
- **Złote poświaty (`.path-glow .g1–.g4`):** radialne gradienty pod szkłem w kartach ścieżek.
- **Kropki slidera (`.dot`):** 8 px, aktywna rozciąga się do 26 px w kolorze `--gold`.
- **Romb:** mały kwadrat 7–9 px obrócony o 45°, w kolorze `--gold`. Jako znacznik w etykietach i na osi.

## Breakpointy

- `≤1100px`: menu znika, bento i ścieżki przechodzą na mniejsze siatki.
- `≤640px`: telefon. Hero układa się pionowo, bento i ścieżki to slidery z kropkami, schody to lista, formularz w jednej kolumnie.
