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
});
