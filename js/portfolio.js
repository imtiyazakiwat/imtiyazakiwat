/* Imtiyaz Akiwat — portfolio interactions */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initBackToTop();
    showFormConfirmation();
    setCurrentYear();
});

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = [...document.querySelectorAll('.nav-link')];
    const sections = [...document.querySelectorAll('main section[id]')];

    if (!navbar || !navToggle || !navMenu) return;

    const closeMenu = ({ returnFocus = false } = {}) => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
        document.body.classList.remove('menu-open');
        if (returnFocus) navToggle.focus();
    };

    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
            closeMenu();
            return;
        }

        navToggle.classList.add('active');
        navMenu.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Close navigation menu');
        document.body.classList.add('menu-open');
        navMenu.querySelector('a')?.focus();
    });

    navLinks.forEach((link) => link.addEventListener('click', () => closeMenu()));

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu({ returnFocus: true });
        }
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
                const isActive = link.getAttribute('href') === `#${entry.target.id}`;
                link.classList.toggle('active', isActive);
                if (isActive) link.setAttribute('aria-current', 'page');
                else link.removeAttribute('aria-current');
            });
        });
    }, { rootMargin: '-35% 0px -60%', threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
            ticking = false;
        });
    }, { passive: true });
}

function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    const observerTarget = document.getElementById('about');
    if (!observerTarget) return;

    const observer = new IntersectionObserver(([entry]) => {
        backToTop.classList.toggle('visible', !entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(observerTarget);
}

function showFormConfirmation() {
    const status = document.getElementById('form-status');
    const params = new URLSearchParams(window.location.search);
    if (!status || params.get('message') !== 'sent') return;

    status.textContent = 'Thanks — your message was sent. I’ll get back to you soon.';
    status.classList.add('success');

    params.delete('message');
    const query = params.toString();
    const cleanUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', cleanUrl);
}

function setCurrentYear() {
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
}
