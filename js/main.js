// ===== MAIN.JS — Global functionality =====

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollEffects();
  initAnimations();
  initParticles();
});

// ===== NAVIGATION =====
function initNavigation() {
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks = document.querySelector('.nav__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // Set active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkPage = href.split('/').pop();
      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    }
  });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (nav) {
      if (scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    lastScroll = scrollY;
  });
}

// ===== SCROLL ANIMATIONS =====
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// ===== PARTICLES =====
function initParticles() {
  const container = document.querySelector('.particles-container');
  if (!container) return;

  const colors = ['#a855f7', '#3b82f6', '#06b6d4'];
  const particleCount = 25;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = (Math.random() * 3 + 1) + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(particle);
  }
}

// ===== SMOOTH SCROLL TO SECTION =====
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offset = 80;
    const top = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// ===== COPY CODE FUNCTIONALITY =====
function copyCode(button) {
  const codeBlock = button.closest('.code-block');
  const code = codeBlock.querySelector('pre').textContent;

  navigator.clipboard.writeText(code).then(() => {
    const originalText = button.textContent;
    button.textContent = '✓ Copied!';
    button.style.color = '#22c55e';
    setTimeout(() => {
      button.textContent = originalText;
      button.style.color = '';
    }, 2000);
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const originalText = button.textContent;
    button.textContent = '✓ Copied!';
    button.style.color = '#22c55e';
    setTimeout(() => {
      button.textContent = originalText;
      button.style.color = '';
    }, 2000);
  });
}

// ===== DOWNLOAD STARTER CODE UTILITY =====
function downloadCode(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadCurrentCode(button, defaultFilename) {
  const codeBlock = button.closest('.code-block');
  const code = codeBlock ? codeBlock.querySelector('pre').textContent : '';
  if (code) {
    downloadCode(defaultFilename || 'starter-code.txt', code);
  }
}

// ===== CODE TAB SWITCHER =====
function switchCodeTab(btn, targetId) {
  const container = btn.closest('.code-tab-container') || btn.parentElement.parentElement;
  container.querySelectorAll('.code-tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  container.querySelectorAll('.code-tab-pane').forEach(pane => {
    pane.style.display = (pane.id === targetId) ? 'block' : 'none';
  });
}

// ===== PREVIEW STATE TOGGLE =====
function switchPreviewTab(btn, targetId) {
  const container = btn.closest('.preview-box--lg');
  if (!container) return;
  container.querySelectorAll('.preview-tab-btn').forEach(b => {
    b.classList.remove('active');
    b.style.background = 'transparent';
    b.style.color = 'var(--text-muted)';
  });
  btn.classList.add('active');
  btn.style.background = 'rgba(255, 255, 255, 0.1)';
  btn.style.color = '#fff';

  container.querySelectorAll('.preview-view-pane').forEach(pane => {
    pane.style.display = (pane.dataset.pane === targetId) ? 'block' : 'none';
  });
}

