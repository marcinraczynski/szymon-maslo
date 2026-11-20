/**
 * Newsletter: narzędzie niewybrane. Formularz ma zwykły `action`, który można podmienić
 * w HTML (np. na adres z MailerLite / Brevo). Dopóki `data-newsletter-mock` jest ustawiony,
 * nic nie jest wysyłane – tylko walidacja przeglądarki i log w konsoli.
 */
export function initNewsletter(form) {
  if (!form || !form.hasAttribute('data-newsletter-mock')) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.elements.email.value.trim();
    console.info('[newsletter] zapis (atrapa, nic nie zostało wysłane)', { email });
    form.dispatchEvent(new CustomEvent('newsletter:submit', { bubbles: true, detail: { email } }));
  });
}
