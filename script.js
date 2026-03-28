// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Header Scroll Effect =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Animated Counter =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        if (counter.dataset.animated) return;

        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(eased * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
                counter.dataset.animated = 'true';
            }
        }

        requestAnimationFrame(update);
    });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger counter animation when stats are visible
            if (entry.target.closest('.hero-stats') || entry.target.querySelector('.stat-number')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.dept-card, .offer-card, .testimonial-card, .contact-card, .about-feature, .gallery-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Observe hero stats
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    observer.observe(heroStats);
}

// ===== Stagger animation delay for grid items =====
document.querySelectorAll('.departments-grid, .offers-grid, .testimonials-grid, .contact-grid, .gallery-grid').forEach(grid => {
    grid.querySelectorAll('.fade-in').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});

// ===== Smooth parallax on hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero && window.scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${window.scrollY * 0.15}px)`;
        hero.style.opacity = 1 - (window.scrollY / (window.innerHeight * 0.8));
    }
});
