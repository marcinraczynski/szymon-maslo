# Jak czytać `strona-glowna.dc.html`

To źródło zaakceptowanego projektu z narzędzia do projektowania (format „Design Component”). Nie uruchamiaj go bezpośrednio, bo wymaga runtime'u edytora. Traktuj go jako specyfikację:

- **`<style>` w `<helmet>`:** cały CSS projektu, z responsywnością (`@media` 1100 px i 640 px). Możesz go przenieść niemal 1:1 i podzielić na pliki sekcji.
- **Markup w `<x-dc>`:** struktura HTML sekcji.
- **`{{nazwa}}`:** wartość wyliczana w skrypcie na dole pliku (`renderVals()`).
- **`<sc-for list="{{x}}" as="y">`:** pętla po tablicy. W statycznym froncie wygeneruj te elementy z `data.js`.
- **`<sc-if value="{{x}}">`:** blok widoczny warunkowo (np. kroki formularza).
- **`onClick="{{fn}}"`:** obsługa zdarzenia zdefiniowana w `renderVals()`.
- **Skrypt `class Component extends DCLogic`:** dane (ścieżki, oś, opinie, opcje formularza) i logika stanów (aktywna ścieżka, aktywna opinia, krok formularza). Odtwórz ją w czystym JS.
- **`--gold: {{accent}}`:** kolor akcentu, domyślnie `#D6B88A`.

Ścieżki do obrazów w tym pliku są podmienione na pliki z `assets/`.
