import { esc, t } from '../utils/typography.js';
import { arrowRight } from '../utils/icons.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Telefon: 9–15 cyfr, dopuszczalne +, spacje, myślniki, nawiasy.
const isPhone = (v) => /^[+\d][\d\s\-()]*$/.test(v) && v.replace(/\D/g, '').length >= 9 && v.replace(/\D/g, '').length <= 15;

/** Reguły walidacji: atrybut `data-validate` na polu. Błąd trafia do `[data-apply-error="<name>"]`. */
const RULES = {
  name: (el) => el.value.trim().length > 1,
  email: (el) => EMAIL_RE.test(el.value.trim()),
  phone: (el) => isPhone(el.value.trim()),
  'phone-optional': (el) => !el.value.trim() || isPhone(el.value.trim()),
  consent: (el) => el.checked
};

/**
 * Formularz krokowy sterowany konfiguracją (jeden komponent dla wszystkich stron).
 *
 * HTML (przyszły template-part) zawiera kroki `[data-apply-step]`, ostatni z nich to podziękowanie
 * (`data-apply-step="done"`). Opcje wyboru generuje skrypt z konfiguracji w data.js:
 *   <div data-apply-choices="stage" data-advance="2" data-arrow></div>
 *   `data-advance` – po kliknięciu przejdź do kroku N, `data-arrow` – strzałka w przycisku.
 *
 * Konfiguracja (`cfg`):
 *   choices    { [nazwa]: [{ value, label }] }   opcje dla grup `data-apply-choices`
 *   chosen     nazwa grupy, której wybór pokazujemy w prawym górnym rogu karty
 *   stepLabels opcjonalne etykiety kroków (domyślnie „Krok n z N”), doneLabel – po wysłaniu
 *   errors     komunikaty walidacji, klucze = atrybut name pola
 *
 * Wysyłka to atrapa: `submitApplication()` dostaje gotowy obiekt danych.
 * W WordPressie podmieniamy tylko tę funkcję (np. fetch do admin-ajax / REST,
 * endpoint z atrybutu data-endpoint formularza).
 */
export function initApplyWizard(root, { form: cfg }) {
  const form = root.querySelector('[data-apply-form]');
  if (!form) return;
  const stepLabel = form.querySelector('[data-apply-step-label]');
  const chosenLabel = form.querySelector('[data-apply-chosen]');
  const bar = [...form.querySelectorAll('[data-apply-bar] i')];
  const steps = [...form.querySelectorAll('[data-apply-step]')];
  const total = steps.length - 1; // ostatni krok to podziękowanie
  const groups = [...form.querySelectorAll('[data-apply-choices]')];

  const state = { step: 1, choices: {} };

  // ===== opcje wyboru =====
  groups.forEach((box) => {
    const name = box.dataset.applyChoices;
    const icon = box.hasAttribute('data-arrow') ? arrowRight : '';
    box.innerHTML = (cfg.choices[name] || []).map((o, i) => `
      <button type="button" style="--i:${i}" class="apply__choice" data-choice="${esc(o.value)}" aria-pressed="false"><span>${t(o.label)}</span>${icon}</button>`).join('');
  });
  const groupOf = (name) => groups.find((g) => g.dataset.applyChoices === name);
  const labelOf = (name, value) => ((cfg.choices[name] || []).find((o) => o.value === value) || {}).label || '';
  const flat = (s) => s.replace(/\n/g, ' ');

  function render({ focus = true } = {}) {
    steps.forEach((el, i) => { el.hidden = i + 1 !== state.step; });
    if (stepLabel) {
      const labels = cfg.stepLabels;
      stepLabel.textContent = state.step > total
        ? (cfg.doneLabel || 'Wysłane')
        : (labels ? labels[state.step - 1] : `Krok ${state.step} z ${total}`);
    }
    if (chosenLabel) {
      const v = state.choices[cfg.chosen];
      chosenLabel.textContent = v ? flat(labelOf(cfg.chosen, v)) : '';
    }
    bar.forEach((i, n) => i.classList.toggle('is-on', n + 1 <= state.step));
    groups.forEach((g) => {
      const v = state.choices[g.dataset.applyChoices];
      g.querySelectorAll('[data-choice]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.choice === v)));
    });
    if (focus) {
      const q = steps[state.step - 1]?.querySelector('[data-apply-heading]');
      q?.focus({ preventScroll: true });
    }
    root.dispatchEvent(new CustomEvent('apply:step', { detail: { step: state.step } }));
  }

  function goTo(step, opts) {
    state.step = Math.min(total + 1, Math.max(1, step));
    render(opts);
  }

  // ===== walidacja (tylko pola z bieżącego kroku) =====
  const errorBox = (input) => form.querySelector(`[data-apply-error="${input.name}"]`);
  function check(input) {
    const ok = RULES[input.dataset.validate](input);
    const box = errorBox(input);
    input.setAttribute('aria-invalid', String(!ok));
    if (box) box.textContent = ok ? '' : (cfg.errors?.[input.name] || '');
    return ok;
  }
  function validateStep() {
    const inputs = [...steps[state.step - 1].querySelectorAll('[data-validate]')];
    const bad = inputs.filter((el) => !check(el));
    if (bad.length) bad[0].focus();
    return !bad.length;
  }
  // po pierwszej próbie poprawiaj komunikat na bieżąco
  form.querySelectorAll('[data-validate]').forEach((input) => {
    input.addEventListener(input.type === 'checkbox' ? 'change' : 'input', () => {
      if (input.getAttribute('aria-invalid') === 'true') check(input);
    });
  });
  function clearErrors() {
    form.querySelectorAll('[data-validate]').forEach((input) => {
      input.removeAttribute('aria-invalid');
      const box = errorBox(input);
      if (box) box.textContent = '';
    });
  }

  // ===== zdarzenia =====
  form.addEventListener('click', (e) => {
    const choice = e.target.closest('[data-choice]');
    const nav = e.target.closest('[data-apply-nav]');
    if (choice) {
      const box = choice.closest('[data-apply-choices]');
      state.choices[box.dataset.applyChoices] = choice.dataset.choice;
      if (box.dataset.advance) goTo(Number(box.dataset.advance));
      else render({ focus: false });
    } else if (nav) {
      const action = nav.dataset.applyNav;
      if (action === 'back') goTo(state.step - 1);
      if (action === 'next' && validateStep()) goTo(state.step + 1);
      if (action === 'restart') { form.reset(); clearErrors(); state.choices = {}; goTo(1); }
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (state.step !== total || !validateStep()) return;
    try {
      await submitApplication(collect(), form.dataset.endpoint);
      goTo(total + 1);
    } catch (err) {
      console.error('[apply] wysyłka nieudana', err);
    }
  });

  function collect() {
    const data = {};
    new FormData(form).forEach((value, key) => { data[key] = typeof value === 'string' ? value.trim() : value; });
    form.querySelectorAll('input[type="checkbox"][name]').forEach((el) => { data[el.name] = el.checked; });
    Object.keys(cfg.choices).forEach((name) => {
      data[name] = state.choices[name] || null;
      data[`${name}_label`] = flat(labelOf(name, state.choices[name]));
    });
    return {
      ...data,
      source: form.dataset.source || 'home',
      page_url: location.href,
      submitted_at: new Date().toISOString()
    };
  }

  // Preselekcja z innych miejsc strony (karta ścieżki, oferta, komórka w hero):
  // ustaw wybór i, jeśli grupa ma data-advance, przejdź od razu do kolejnego kroku.
  document.addEventListener('apply:preselect', (e) => {
    const d = e.detail || {};
    const name = d.name || (d.stage ? 'stage' : null);
    const value = d.value || d.stage;
    const box = name && groupOf(name);
    if (!box || !(cfg.choices[name] || []).some((o) => o.value === value)) return;
    state.choices[name] = value;
    if (box.dataset.advance) goTo(Number(box.dataset.advance), { focus: false });
    else goTo(Math.max(1, steps.findIndex((s) => s.contains(box)) + 1), { focus: false });
    // Fokus po zakończeniu przewijania do sekcji (smooth scroll).
    const target = steps[state.step - 1].querySelector('textarea, input:not([type="checkbox"])');
    if (target) setTimeout(() => target.focus({ preventScroll: true }), 700);
  });

  render({ focus: false });
}

/**
 * Linki i przyciski z `data-preselect="nazwa:wartość"` (np. „Zgłoś pomysł”, komórki hero na Kontakcie)
 * wysyłają `apply:preselect`. Nawigację (#kotwica) robi sam link.
 */
export function initPreselectLinks() {
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-preselect]');
    if (!el) return;
    const [name, value] = el.dataset.preselect.split(':');
    document.dispatchEvent(new CustomEvent('apply:preselect', { detail: { name, value } }));
  });
}

/**
 * ATRAPA wysyłki. Do podmiany przy integracji (Tommy).
 * @param {object} payload dane zgłoszenia
 * @param {string} [endpoint] adres z data-endpoint
 */
export async function submitApplication(payload, endpoint) {
  window.lastApplication = payload;
  console.info('[apply] zgłoszenie (atrapa, nic nie zostało wysłane)', endpoint || '(brak endpointu)', payload);
  return { ok: true };
}
