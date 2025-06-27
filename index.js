// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})

// IntersectionObserver for fade-in sections
function fadeInSections() {
  const sections = document.querySelectorAll('.section-fade');
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.animationPlayState = 'running';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(section => {
    observer.observe(section);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fadeInSections();
  setupThemeSwitcher();
  setupMobileMenuFocusTrap();
});

// Theme switcher logic
function setupThemeSwitcher() {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  let theme = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.checked = theme === 'dark';
    themeToggle.addEventListener('change', () => {
      theme = themeToggle.checked ? 'dark' : 'light';
      root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }
}

// Focus trap for mobile menu
function setupMobileMenuFocusTrap() {
  const menu = document.querySelector('.header__sm-menu');
  if (!menu) return;
  menu.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') return;
    const focusable = menu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  });
}

document.querySelectorAll('.home-hero__social').forEach(social => {
  social.addEventListener('click', function(e) {
    // Remove fixed from all
    document.querySelectorAll('.home-hero__social').forEach(s => {
      s.classList.remove('social-fixed');
      const closeBtn = s.querySelector('.social-fixed__close');
      if (closeBtn) closeBtn.remove();
    });
    // Add fixed to clicked
    this.classList.add('social-fixed');
    // Add close button if not present
    if (!this.querySelector('.social-fixed__close')) {
      const btn = document.createElement('button');
      btn.className = 'social-fixed__close';
      btn.setAttribute('aria-label', 'Unfix social icon');
      btn.type = 'button';
      btn.innerHTML = '&times;';
      btn.tabIndex = 0;
      btn.onclick = (ev) => {
        ev.stopPropagation();
        this.classList.remove('social-fixed');
        btn.remove();
      };
      btn.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          this.classList.remove('social-fixed');
          btn.remove();
        }
      });
      this.appendChild(btn);
    }
  });
});
