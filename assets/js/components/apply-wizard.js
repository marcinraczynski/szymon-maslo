import { esc } from '../utils/typography.js';
import { arrowRight } from '../utils/icons.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Telefon: 9–15 cyfr, dopuszczalne +, spacje, myślniki, nawiasy.
const isPhone = (v) => /^[+\d][\d\s\-()]*$/.test(v) && v.replace(/\D/g, '').length >= 9 && v.replace(/\D/g, '').length <= 15;

/**
 * Formularz krokowy (sekcja 7).
 * Kroki: 1 etap → 2 blokada → 3 forma współpracy → 4 kontakt → 5 podziękowanie.
 * Wysyłka to atrapa: `submitApplication()` dostaje gotowy obiekt danych.
 * W WordPressie podmieniamy tylko tę funkcję (np. fetch do admin-ajax / REST,
 * endpoint z atrybutu data-endpoint formularza).
 */
export function initApplyWizard(root, { form: cfg }) {
  const form = root.querySelector('[data-apply-form]');
  const stepLabel = root.querySelector('[data-apply-step-label]');
  const chosenLabel = root.querySelector('[data-apply-chosen]');
  const bar = [...root.querySelectorAll('[data-apply-bar] i')];
  const steps = [...root.querySelectorAll('[data-apply-step]')];
  const stageBox = root.querySelector('[data-apply-stages]');
  const coopBox = root.querySelector('[data-apply-coop]');

  const state = { step: 1, stage: null, cooperation: null };

  const choiceHtml = (opt, name, i) => `
    <button type="button" style="--i:${i}" class="apply__choice" data-${name}="${esc(opt.value)}" aria-pressed="false"><span>${esc(opt.label)}</span>${arrowRight}</button>`;
  stageBox.innerHTML = cfg.stages.map((o, i) => choiceHtml(o, 'stage', i)).join('');
  coopBox.innerHTML = cfg.cooperation.map((o, i) => choiceHtml(o, 'coop', i)).join('');

  const labelOf = (list, value) => (list.find((o) => o.value === value) || {}).label || '';

  function render({ focus = true } = {}) {
    steps.forEach((el) => { el.hidden = Number(el.dataset.applyStep) !== state.step; });
    stepLabel.textContent = state.step <= 4 ? `Krok ${state.step} z 4` : 'Wysłane';
    chosenLabel.textContent = state.stage ? labelOf(cfg.stages, state.stage).replace(/\n/g, ' ') : '';
    bar.forEach((i, n) => i.classList.toggle('is-on', n + 1 <= state.step));
    stageBox.querySelectorAll('[data-stage]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.stage === state.stage)));
    coopBox.querySelectorAll('[data-coop]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.coop === state.cooperation)));
    if (focus) {
      const q = steps.find((el) => !el.hidden)?.querySelector('[data-apply-heading]');
      q?.focus({ preventScroll: true });
    }
    root.dispatchEvent(new CustomEvent('apply:step', { detail: { step: state.step } }));
  }

  function goTo(step, opts) {
    state.step = Math.min(5, Math.max(1, step));
    render(opts);
  }

  // ===== walidacja =====
  const fields = {
    name: form.elements.full_name,
    email: form.elements.email,
    phone: form.elements.phone,
    consent: form.elements.consent
  };
  const checks = {
    name: () => fields.name.value.trim().length > 1,
    email: () => EMAIL_RE.test(fields.email.value.trim()),
    phone: () => isPhone(fields.phone.value.trim()),
    consent: () => fields.consent.checked
  };
  function setError(key, ok) {
    const input = fields[key];
    const box = root.querySelector(`[data-apply-error="${key}"]`);
    input.setAttribute('aria-invalid', String(!ok));
    box.textContent = ok ? '' : cfg.errors[key];
    return ok;
  }
  function validate() {
    const results = Object.keys(checks).map((k) => [k, setError(k, checks[k]())]);
    const firstBad = results.find(([, ok]) => !ok);
    if (firstBad) fields[firstBad[0]].focus();
    return !firstBad;
  }
  // po pierwszej próbie poprawiaj komunikat na bieżąco
  Object.entries(fields).forEach(([k, input]) => {
    input.addEventListener(k === 'consent' ? 'change' : 'input', () => {
      if (input.getAttribute('aria-invalid') === 'true') setError(k, checks[k]());
    });
  });

  // ===== zdarzenia =====
  form.addEventListener('click', (e) => {
    const stage = e.target.closest('[data-stage]');
    const coop = e.target.closest('[data-coop]');
    const nav = e.target.closest('[data-apply-nav]');
    if (stage) { state.stage = stage.dataset.stage; goTo(2); }
    else if (coop) { state.cooperation = coop.dataset.coop; goTo(4); }
    else if (nav) {
      const action = nav.dataset.applyNav;
      if (action === 'back') goTo(state.step - 1);
      if (action === 'next') goTo(state.step + 1);
      if (action === 'restart') { form.reset(); Object.keys(fields).forEach((k) => setError(k, true)); state.stage = null; state.cooperation = null; goTo(1); }
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (state.step !== 4) return;
    if (!validate()) return;
    const payload = collect();
    try {
      await submitApplication(payload, form.dataset.endpoint);
      goTo(5);
    } catch (err) {
      console.error('[apply] wysyłka nieudana', err);
    }
  });

  function collect() {
    return {
      stage: state.stage,
      stage_label: labelOf(cfg.stages, state.stage).replace(/\n/g, ' '),
      blocker: form.elements.blocker.value.trim(),
      cooperation: state.cooperation,
      cooperation_label: labelOf(cfg.cooperation, state.cooperation),
      full_name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim(),
      consent: fields.consent.checked,
      source: 'home',
      page_url: location.href,
      submitted_at: new Date().toISOString()
    };
  }

  // Z karty ścieżki: ustaw etap i od razu przejdź do kroku 2.
  document.addEventListener('apply:preselect', (e) => {
    const { stage } = e.detail || {};
    if (!cfg.stages.some((o) => o.value === stage)) return;
    state.stage = stage;
    goTo(2, { focus: false });
    // Fokus po zakończeniu przewijania do sekcji (smooth scroll).
    setTimeout(() => form.elements.blocker.focus({ preventScroll: true }), 700);
  });

  render({ focus: false });
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
