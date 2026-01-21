/**
 * Model Page JavaScript
 * Handles feature sliders and color selector functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initFeatureSliders();
  initColorSelector();
  initTestDriveModal();
});

/**
 * Feature Sliders
 * Horizontal scrolling sliders for exterior, smart, and comfort features
 */
function initFeatureSliders() {
  const sections = document.querySelectorAll('.feature-section');

  sections.forEach(section => {
    const track = section.querySelector('.feature-slider-track');
    const prevBtn = section.querySelector('.feature-slider-btn.prev');
    const nextBtn = section.querySelector('.feature-slider-btn.next');

    if (!track) return;

    // Calculate scroll amount (one card width + gap)
    const getScrollAmount = () => {
      const card = track.querySelector('.feature-card');
      if (!card) return 300;
      const cardWidth = card.offsetWidth;
      const gap = parseInt(getComputedStyle(track).gap) || 24;
      return cardWidth + gap;
    };

    // Previous button click
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const scrollAmount = getScrollAmount();

        if (track.scrollLeft <= 10) {
          // If at start, scroll to end
          track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      });
    }

    // Next button click
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const scrollAmount = getScrollAmount();
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (track.scrollLeft >= maxScroll - 10) {
          // If at end, scroll back to start
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      });
    }

    // Touch/swipe support is handled natively by overflow-x: auto
  });
}

/**
 * Color Selector
 * Swaps car image when color swatch is clicked
 */
function initColorSelector() {
  const swatches = document.querySelectorAll('.color-swatch');
  const carImage = document.querySelector('.color-car-image');

  if (!swatches.length || !carImage) return;

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      // Remove active class from all swatches
      swatches.forEach(s => s.classList.remove('active'));

      // Add active class to clicked swatch
      swatch.classList.add('active');

      // Get new image path
      const newImageSrc = swatch.dataset.image;
      const colorName = swatch.dataset.color;

      if (newImageSrc) {
        // Fade out, swap image, fade in
        carImage.style.opacity = '0';

        setTimeout(() => {
          carImage.src = newImageSrc;
          carImage.alt = `DongFeng Box in ${colorName.charAt(0).toUpperCase() + colorName.slice(1)}`;
          carImage.style.opacity = '1';
        }, 150);
      }
    });
  });
}

/**
 * Test Drive Modal
 * Opens modal when page-specific Book Test Drive buttons are clicked
 */
function initTestDriveModal() {
  const modal = document.getElementById('testDriveModal');
  const closeBtn = modal?.querySelector('.modal-close');
  const form = document.getElementById('testDriveForm');

  if (!modal) return;

  // Get all Book Test Drive buttons on the page (excluding nav)
  const testDriveButtons = document.querySelectorAll('main .btn-primary[href="#book"], main .btn-primary:not(.nav-cta)');

  // Filter to only buttons that contain "Test Drive" text
  testDriveButtons.forEach(btn => {
    if (btn.textContent.toLowerCase().includes('test drive')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    }
  });

  // Close button click
  closeBtn?.addEventListener('click', closeModal);

  // Click outside modal to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Form submission
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // For now, just log and show success (would send to server in production)
    console.log('Test drive request:', data);

    // Show success message
    modal.querySelector('.modal-content').innerHTML = `
      <div style="text-align: center; padding: var(--space-8) 0;">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" style="margin-bottom: var(--space-4);">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h2 class="modal-title" style="margin-bottom: var(--space-2);">Thank You!</h2>
        <p class="modal-subtitle" style="margin-bottom: var(--space-6);">We've received your request. Our team will contact you shortly to arrange your test drive.</p>
        <button type="button" class="btn btn-primary" onclick="document.getElementById('testDriveModal').classList.remove('active'); document.body.style.overflow = '';">Close</button>
      </div>
    `;
  });

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus first input
    setTimeout(() => {
      modal.querySelector('input')?.focus();
    }, 100);
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Hero Slider (placeholder for future implementation)
 * Would handle multiple hero images if needed
 */
function initHeroSlider() {
  const prevBtn = document.querySelector('.hero-nav-btn.prev');
  const nextBtn = document.querySelector('.hero-nav-btn.next');
  const dots = document.querySelectorAll('.model-hero-dots .dot');

  // Placeholder: Hero slider functionality would go here
  // This would handle cycling through multiple hero background images
}
