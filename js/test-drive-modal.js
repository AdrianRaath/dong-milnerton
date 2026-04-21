/**
 * Test Drive Modal (Multi-Step)
 * Used on general pages (home, about) for model selection + booking form
 */

document.addEventListener('DOMContentLoaded', () => {
  initTestDriveModal();
});

function initTestDriveModal() {
  const modal = document.getElementById('testDriveModal');
  if (!modal) return;

  const overlay = modal;
  const closeBtn = modal.querySelector('.td-modal-close');
  const step1 = modal.querySelector('[data-step="1"]');
  const step2 = modal.querySelector('[data-step="2"]');
  const modelCards = modal.querySelectorAll('.model-select-card');
  const nextBtn = modal.querySelector('.td-modal-next');
  const backBtn = modal.querySelector('.td-modal-back');
  const form = modal.querySelector('#testDriveForm');
  const previewImg = modal.querySelector('.selected-model-img');
  const previewName = modal.querySelector('.selected-model-preview-name');

  // Map model names to their preview images
  const modelImages = {
    '007': 'images/car-models/007/colors/black.avif',
    'Box': 'images/car-models/box/colors/blue.avif',
    '06': 'images/car-models/06/colors/green.avif'
  };

  let selectedModel = null;

  // Bind all #book links to open the modal
  function bindButton(btn) {
    if (btn.hasAttribute('data-td-bound')) return;
    btn.setAttribute('data-td-bound', 'true');

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // If button has a data-model attribute, skip to step 2 with that model
      const preselectedModel = btn.getAttribute('data-model');
      if (preselectedModel) {
        openModalWithModel(preselectedModel);
      } else {
        openModal();
      }
    });
  }

  // Bind nav CTA
  const navCta = document.querySelector('.nav-cta[href="#book"]');
  if (navCta) bindButton(navCta);

  // Bind all #book links in main
  document.querySelectorAll('main a[href="#book"]').forEach(bindButton);

  // Model card selection (inside the modal)
  modelCards.forEach(card => {
    card.addEventListener('click', () => {
      modelCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedModel = card.getAttribute('data-model');
      nextBtn.classList.add('enabled');
    });
  });

  // Next button — go to step 2
  nextBtn?.addEventListener('click', () => {
    if (!selectedModel) return;
    goToStep2();
  });

  // Back button — return to step 1
  backBtn?.addEventListener('click', () => {
    step2.classList.remove('active');
    step1.classList.add('active');
  });

  // Close button
  closeBtn?.addEventListener('click', closeModal);

  // Click outside to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Form submission
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append('model', selectedModel);

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    fetch('https://formspree.io/f/xqednydg', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        // Show success message
        const content = modal.querySelector('.td-modal-content');
        content.innerHTML = `
          <div class="td-modal-step active">
            <div class="td-modal-success">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h2 class="td-modal-title">Thank You!</h2>
              <p class="td-modal-subtitle">We've received your request for a <strong>${selectedModel}</strong> test drive. Our team will contact you shortly.</p>
              <button type="button" class="btn btn-primary td-btn-full" id="tdSuccessClose">Close</button>
            </div>
          </div>
        `;

        document.getElementById('tdSuccessClose').addEventListener('click', () => {
          closeModal();
          setTimeout(resetModal, 300);
        });
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again.');
    });
  });

  function openModal() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updatePreview(modelName) {
    previewName.textContent = modelName;
    previewImg.src = modelImages[modelName] || '';
    previewImg.alt = 'Dongfeng ' + modelName;
  }

  function openModalWithModel(modelName) {
    // Pre-select the model card in step 1
    modelCards.forEach(c => {
      c.classList.remove('selected');
      if (c.getAttribute('data-model') === modelName) {
        c.classList.add('selected');
      }
    });
    selectedModel = modelName;
    nextBtn.classList.add('enabled');

    // Skip straight to step 2
    updatePreview(modelName);
    step1.classList.remove('active');
    step2.classList.add('active');

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      form?.querySelector('input')?.focus();
    }, 100);
  }

  function goToStep2() {
    updatePreview(selectedModel);
    step1.classList.remove('active');
    step2.classList.add('active');

    // Focus first input
    setTimeout(() => {
      form?.querySelector('input')?.focus();
    }, 100);
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(resetModal, 300);
  }

  function resetModal() {
    if (overlay.classList.contains('active')) return;

    // Check if we need to rebuild (after success state replaced the content)
    const existingStep1 = modal.querySelector('[data-step="1"]');
    if (!existingStep1) {
      location.reload();
      return;
    }

    // Reset to step 1
    step1.classList.add('active');
    step2.classList.remove('active');

    // Clear selection
    modelCards.forEach(c => c.classList.remove('selected'));
    selectedModel = null;
    nextBtn.classList.remove('enabled');

    // Reset form
    form?.reset();
  }
}
