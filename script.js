// Smooth scroll is native via CSS scroll-behavior, but we handle active nav link highlighting and others here

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = [...navLinks].map(link => document.querySelector(link.getAttribute('href')));
  const backToTopBtn = document.getElementById('back-to-top');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // 1. Active nav link on scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight / 3;

    sections.forEach((section, i) => {
      if (!section) return;
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[i].classList.add('active');
      }
    });

    // Show/hide back to top button
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // 2. Back to top button click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 3. Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Dark/Light mode toggle
  // Save preference to localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light');
    themeToggleBtn.textContent = '🌞';
  }

  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    if (body.classList.contains('light')) {
      themeToggleBtn.textContent = '🌞';
      localStorage.setItem('theme', 'light');
    } else {
      themeToggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'dark');
    }
  });

  // 5. Typing text effect for intro heading
  const typedText = document.getElementById('typed-text');
  const textToType = "Hi, I'm Aditya Kumar Shrivastava";
  let idx = 0;

  function type() {
    if (idx < textToType.length) {
      typedText.textContent += textToType.charAt(idx);
      idx++;
      setTimeout(type, 100);
    }
  }
  type();

  // 6. Contact form submission (basic client-side validation + fake send)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in all fields.";
      formStatus.style.color = "#f44336";
      return;
    }

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = "Please enter a valid email.";
      formStatus.style.color = "#f44336";
      return;
    }

    // Simulate form submission
    formStatus.style.color = "#4CAF50";
    formStatus.textContent = "Thank you for your message! I'll get back to you soon.";

    contactForm.reset();
  });
});
