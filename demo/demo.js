(function () {
  const toast = document.querySelector('[data-demo-toast]');
  const toastMessage = toast ? toast.querySelector('small') : null;
  let toastTimer;

  const showToast = (message) => {
    if (!toast || !toastMessage) return;
    window.clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 6500);
  };

  const messages = {
    phone: 'A live page would call the verified number supplied by the client.',
    whatsapp: 'A live page would open the client\'s verified WhatsApp conversation.',
    service: 'A live service link would lead to the client-approved enquiry route.'
  };

  document.querySelectorAll('[data-demo-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const type = button.getAttribute('data-demo-action');
      showToast(messages[type] || 'This interaction is illustrative only.');
    });
  });

  if (toast) {
    toast.querySelector('button').addEventListener('click', () => {
      window.clearTimeout(toastTimer);
      toast.hidden = true;
    });
  }

  const form = document.querySelector('[data-demo-form]');
  const status = document.querySelector('[data-demo-status]');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      if (status) status.textContent = 'Demo complete: nothing was sent or stored.';
      showToast('Form submission demonstrated. The entered details remain only in this browser page.');
    });
  }
})();
