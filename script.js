const selectButtons = document.querySelectorAll('.select');
const modal = document.getElementById('checkout');
const modalClose = modal.querySelector('.close');
const checkoutForm = document.getElementById('checkout-form');

selectButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tier = btn.closest('.ticket-tier');
    const name = tier.dataset.name;
    const price = tier.dataset.price;
    modal.querySelector('h2').textContent = `Checkout - ${name} ($${price})`;
    modal.querySelector('#ticket-tier').value = name;
    modal.classList.remove('hidden');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});

checkoutForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Payment processing would occur here.');
  modal.classList.add('hidden');
});

const rsvpForm = document.getElementById('rsvp-form');
rsvpForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('RSVP submitted. Confirmation email would be sent.');
});
