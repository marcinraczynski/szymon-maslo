import { paths, pathsDefault, people, peopleDefault, applyForm, startupForm, contactForm, faq } from './data.js';
import { initPathsSlider } from './components/paths-slider.js';
import { initResultsCarousel } from './components/results-carousel.js';
import { initPeople } from './components/people.js';
import { initApplyWizard, initPreselectLinks } from './components/apply-wizard.js';
import { initNewsletter } from './components/newsletter.js';
import { initMobileMenu } from './components/mobile-menu.js';
import { initStickyHeader } from './components/sticky-header.js';
import { renderCareer } from './components/career.js';
import { renderChapters } from './components/chapters.js';
import { initFaq } from './components/faq.js';
import { initMotion } from './components/motion.js';

/**
 * Jeden skrypt dla wszystkich stron: każdy komponent startuje tylko wtedy,
 * gdy jego sekcja jest na stronie (w WordPressie: gdy template-part jest użyty).
 */
const $ = (sel) => document.querySelector(sel);
const on = (sel, fn) => { const el = $(sel); if (el) fn(el); };

// wspólne: nagłówek, menu, newsletter
initMobileMenu([...document.querySelectorAll('[data-mmenu-open]')], $('#mobile-menu'));
initStickyHeader($('[data-stickybar]'), $('.topbar'));
document.querySelectorAll('[data-newsletter]').forEach(initNewsletter);

// strona główna
on('#liczby', initResultsCarousel);
on('#sciezki', (el) => initPathsSlider(el, { paths, initial: pathsDefault }));
on('#droga', renderCareer);
on('#opinie', (el) => initPeople(el, { people, initial: peopleDefault }));

// podstrony
on('[data-chapters]', renderChapters);
document.querySelectorAll('[data-faq]').forEach((el) => initFaq(el, faq[el.dataset.faq]));

// formularze: konfiguracja wybierana atrybutem data-apply-config
const forms = { apply: applyForm, startup: startupForm, contact: contactForm };
document.querySelectorAll('[data-apply-config]').forEach((el) => initApplyWizard(el, { form: forms[el.dataset.applyConfig] }));
initPreselectLinks();

// animacje na końcu: potrzebują wyrenderowanych list (schody, opinie, rozdziały, FAQ)
initMotion();
document.documentElement.classList.add('motion-ready');
