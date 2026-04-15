(() => {
  // 1. Năm tự động & Theme
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const btn = document.getElementById('themeBtn');
  const key = 'personal_site_theme';
  const apply = (t) => {
    if (!t) {
      document.documentElement.removeAttribute('data-theme');
      return;
    }
    document.documentElement.setAttribute('data-theme', t);
  };
  const saved = localStorage.getItem(key);
  if (saved) apply(saved);
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? '' : 'light';
      apply(next);
      localStorage.setItem(key, next);
    });
  }

  // 2. Hiệu ứng 3D Tilt
  const tilts = document.querySelectorAll('.tilt');
  tilts.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const dx = x - xc;
      const dy = y - yc;
      
      // Tính toán độ nghiêng (max 10deg)
      const rx = (dy / yc) * -8; 
      const ry = (dx / xc) * 8;
      
      el.style.setProperty('--rx', `${rx}deg`);
      el.style.setProperty('--ry', `${ry}deg`);
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });

  // 3. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.section, .grid-3, .photo-grid, .hero');
  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
})();
