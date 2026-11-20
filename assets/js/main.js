import { paths, pathsDefault, people, peopleDefault, applyForm } from './data.js';
import { initPathsSlider } from './components/paths-slider.js';
import { initResultsCarousel } from './components/results-carousel.js';
import { initPeople } from './components/people.js';
import { initApplyWizard } from './components/apply-wizard.js';
import { initNewsletter } from './components/newsletter.js';
import { initMobileMenu } from './components/mobile-menu.js';
import { renderCareer } from './components/career.js';
import { initMotion } from './components/motion.js';

const $ = (sel) => document.querySelector(sel);


initMobileMenu($('[data-mmenu-open]'), $('#mobile-menu'));
initResultsCarousel($('#liczby'));
initPathsSlider($('#sciezki'), { paths, initial: pathsDefault });
renderCareer($('#droga'));
initPeople($('#opinie'), { people, initial: peopleDefault });
initNewsletter($('[data-newsletter]'));
initApplyWizard($('#porozmawiajmy'), { form: applyForm });

// animacje na końcu: potrzebują wyrenderowanych list (schody, opinie)
initMotion();
document.documentElement.classList.add('motion-ready');
