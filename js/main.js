/**
 * DongFeng - Main JavaScript
 * Handles navigation, slider, animations, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSlider();
    initStatsCounter();
    initSmoothScroll();
    initColorSwatches();
});

/**
 * Navigation functionality
 * - Scroll-based header style changes
 * - Mobile menu toggle
 */
function initNavigation() {
    const header = document.querySelector('.nav-header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll effect
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll(); // Initial check

    // Mobile menu elements
    const mobileModelsPanel = document.querySelector('.nav-mobile-models');
    const mobileBackBtn = document.querySelector('.nav-mobile-back');
    const mobileCloseBtn = document.querySelector('.nav-mobile-close');
    const mobileBookBtn = document.querySelector('.nav-mobile-book');

    function closeAllMenus() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        header.classList.remove('menu-open');
        if (mobileModelsPanel) mobileModelsPanel.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            if (navMenu.classList.contains('active') || (mobileModelsPanel && mobileModelsPanel.classList.contains('active'))) {
                closeAllMenus();
            } else {
                navToggle.classList.add('active');
                navMenu.classList.add('active');
                header.classList.add('menu-open');
                document.body.style.overflow = 'hidden';
            }
        });

        // Close menu when clicking a non-dropdown nav link
        navLinks.forEach(link => {
            const parentDropdown = link.closest('.nav-dropdown');
            if (parentDropdown) {
                // Models link — prevent navigation, on mobile open sub-panel
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (window.innerWidth <= 768 && mobileModelsPanel) {
                        navMenu.classList.remove('active');
                        mobileModelsPanel.classList.add('active');
                    }
                });
            } else {
                link.addEventListener('click', () => {
                    closeAllMenus();
                });
            }
        });
    }

    // Mobile models sub-panel — Back button
    if (mobileBackBtn) {
        mobileBackBtn.addEventListener('click', () => {
            mobileModelsPanel.classList.remove('active');
            navMenu.classList.add('active');
        });
    }

    // Mobile models sub-panel — Close button
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', () => {
            closeAllMenus();
        });
    }

    // Mobile Book Test Drive button — close menu and open modal
    if (mobileBookBtn) {
        mobileBookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllMenus();
            // Small delay so menu closes before modal opens
            setTimeout(() => {
                const modal = document.getElementById('testDriveModal');
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }, 300);
        });
    }

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
}

/**
 * Models Slider functionality
 * - Horizontal scroll-snap slider
 * - Navigate between model cards
 * - Update active dot indicator
 */
function initSlider() {
    const section = document.querySelector('.models-section--fullwidth');
    if (!section) return;

    const slider = section.querySelector('.models-slider');
    const track = slider.querySelector('.slider-track');
    const cards = slider.querySelectorAll('.model-card');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    const dots = section.querySelectorAll('.dot');

    let currentSlide = 0;
    const totalSlides = cards.length;

    // Scroll to specific slide (with looping)
    function scrollToSlide(index) {
        // Loop around if out of bounds
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }

        currentSlide = index;
        const card = cards[index];

        // Calculate scroll position to center the card
        const trackRect = track.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const scrollLeft = card.offsetLeft - (trackRect.width / 2) + (cardRect.width / 2);

        track.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });

        updateDots();
    }

    // Update dots to reflect current slide
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Detect current slide from scroll position
    function detectCurrentSlide() {
        const trackCenter = track.scrollLeft + (track.offsetWidth / 2);

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
            const distance = Math.abs(trackCenter - cardCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        if (closestIndex !== currentSlide) {
            currentSlide = closestIndex;
            updateDots();
        }
    }

    // Navigation handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            scrollToSlide(currentSlide - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            scrollToSlide(currentSlide + 1);
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToSlide(index);
        });
    });

    // Listen for scroll to update dots
    let scrollTimeout;
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(detectCurrentSlide, 100);
    });

    // Initialize - scroll to middle slide
    setTimeout(() => {
        const middleIndex = Math.floor(totalSlides / 2);
        scrollToSlide(middleIndex);
    }, 100);
}

/**
 * Stats Counter Animation
 * Animates numbers from 0 to target value
 */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    if (!stats.length) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const animateCounter = (element) => {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        const isDecimal = target % 1 !== 0;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = target * easeOut;

            if (isDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    element.textContent = target.toLocaleString();
                }
            }
        }

        requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

/**
 * Smooth Scroll
 * Enables smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.nav-header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Color Swatches
 * Handles color selection on model cards — swaps the card background image
 */
function initColorSwatches() {
    const cards = document.querySelectorAll('.model-card');

    cards.forEach(card => {
        const swatches = card.querySelectorAll('.model-swatches .swatch');
        const cardImage = card.querySelector('.model-bg');

        if (!swatches.length || !cardImage) return;

        swatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                // Remove active from siblings
                swatches.forEach(s => s.classList.remove('active'));
                // Add active to clicked
                swatch.classList.add('active');

                // Swap card image with fade
                const newSrc = swatch.dataset.image;
                const colorName = swatch.title;

                if (newSrc) {
                    cardImage.style.opacity = '0';
                    setTimeout(() => {
                        cardImage.src = newSrc;
                        cardImage.alt = `${card.querySelector('.model-name').textContent} in ${colorName}`;
                        cardImage.style.opacity = '1';
                    }, 150);
                }
            });
        });
    });
}

/**
 * Fade-in animation on scroll
 * Add 'fade-in' class to elements you want to animate
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(el => observer.observe(el));
}
