/**
 * Model Page JavaScript
 * Handles feature sliders and color selector functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initFeatureSliders();
  initColorSelector();
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

