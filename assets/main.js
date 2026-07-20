// GROWITHRAGHUL — shared interactions
document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Tabs (mission / vision / story)
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    const panelWrap = document.querySelector(tabGroup.dataset.target);
    if (!panelWrap) return;
    const panels = panelWrap.querySelectorAll('.tab-panel');
    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        panels[i].classList.add('active');
      });
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Contact form (static demo — opens mail client with prefilled message)
  const form = document.getElementById('contact-form');
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzY4L_5zqEkfmKbaHq0DQKBG5depgSln1019QFOrIA9KdSZtX97Lfoka224NNQhTxmb/exec";

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = document.getElementById('form-note');
      const submitBtn = form.querySelector('button[type="submit"]');

      const payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        service: form.service.value,
        message: form.message.value.trim()
      };

      if (submitBtn) submitBtn.disabled = true;
      if (note) note.textContent = "Sending...";

      fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      })
      .then(() => {
        if (note) note.textContent = "Thanks! Your message has been sent — we'll get back to you soon.";
        form.reset();
      })
      .catch(() => {
        if (note) note.textContent = "Something went wrong. Please email us directly at growithraghul@gmail.com";
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }
  // Lead-capture popup (shows on every page load)
  (function () {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzY4L_5zqEkfmKbaHq0DQKBG5depgSln1019QFOrIA9KdSZtX97Lfoka224NNQhTxmb/exec";

    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.id = 'lead-popup';
    overlay.innerHTML = `
      <div class="popup-modal">
        <button type="button" class="popup-close" aria-label="Close">&times;</button>
        <img src="https://i.ibb.co/5Wf4BJgJ/Header.png" alt="GROWITHRAGHUL" class="popup-logo">
        <h3>Get a Free Growth Consultation</h3>
        <p class="popup-sub">Tell us a bit about you — we'll get back with a free plan.</p>
        <form id="popup-form">
          <div class="form-field">
            <label for="popup-name">Full Name</label>
            <input type="text" id="popup-name" name="name" placeholder="Your name" required>
          </div>
          <div class="form-field">
            <label for="popup-phone">Phone Number</label>
            <input type="tel" id="popup-phone" name="phone" placeholder="+91 00000 00000" required>
          </div>
          <div class="form-field">
            <label for="popup-service">Service Interested In</label>
            <select id="popup-service" name="service">
              <option>SEO & AEO</option>
              <option>Social Media Marketing</option>
              <option>Google Business Profile</option>
              <option>Google Ads</option>
              <option>Meta Ads</option>
              <option>YouTube Marketing</option>
              <option>YouTube Ads</option>
              <option>Website Design & Development</option>
              <option>Branding</option>
              <option>Content Marketing</option>
              <option>Performance Marketing</option>
              <option>Influencer Marketing</option>
              <option>Social Media Handling</option>
              <option>Email Marketing</option>
              <option>WhatsApp Marketing</option>
              <option>Not Sure Yet</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Get My Free Quote <span class="btn-arrow">→</span></button>
          <p id="popup-note" class="popup-note"></p>
        </form>
      </div>`;
    document.body.appendChild(overlay);

    function closePopup() { overlay.classList.remove('open'); }
    overlay.querySelector('.popup-close').addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });

    // Show shortly after the page loads
    setTimeout(() => overlay.classList.add('open'), 700);

    // Submit handler — reuses the same Apps Script endpoint
    const popupForm = overlay.querySelector('#popup-form');
    popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = overlay.querySelector('#popup-note');
      const submitBtn = popupForm.querySelector('button[type="submit"]');

      const payload = {
        name: popupForm.name.value.trim(),
        email: "",
        phone: popupForm.phone.value.trim(),
        service: popupForm.service.value,
        message: "(submitted via popup)"
      };

      if (submitBtn) submitBtn.disabled = true;
      if (note) note.textContent = "Sending...";

      fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      })
      .then(() => {
        if (note) note.textContent = "Thanks! We'll get back to you soon.";
        popupForm.reset();
        setTimeout(closePopup, 1500);
      })
      .catch(() => {
        if (note) note.textContent = "Something went wrong. Please email us at growithraghul@gmail.com";
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  })();
});
