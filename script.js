function handleSubmit() {
  const name = document.getElementById('fname').value;
  const email = document.getElementById('email').value;

  if (!name || !email) {
    alert('Please fill in your name and email address.');
    return;
  }

  const btn = document.querySelector('.form-submit');
  btn.textContent = '✓ Enquiry Sent!';
  btn.style.background = '#4A7C4A';

  setTimeout(() => {
    btn.textContent = 'Send Enquiry';
    btn.style.background = '';
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
    document.getElementById('product').value = '';
  }, 3000);
}
