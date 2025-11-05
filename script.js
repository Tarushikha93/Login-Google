const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const togglePasswordBtn = document.getElementById('toggle-password');

function validateEmail(value) {
  if (!value) return 'Email is required';
  const at = value.indexOf('@');
  const dot = value.lastIndexOf('.');
  if (at < 1 || dot <= at + 1 || dot === value.length - 1) return 'Enter a valid email address';
  return '';
}

function validatePassword(value) {
  if (!value) return 'Password is required';
  if (value.length < 6) return 'Password must be at least 6 characters';
  return '';
}

emailInput.addEventListener('input', () => {
  emailError.textContent = validateEmail(emailInput.value.trim());
});

passwordInput.addEventListener('input', () => {
  passwordError.textContent = validatePassword(passwordInput.value);
});

togglePasswordBtn.addEventListener('click', () => {
  const isPassword = passwordInput.getAttribute('type') === 'password';
  passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
  togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
  togglePasswordBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailMsg = validateEmail(emailInput.value.trim());
  const passMsg = validatePassword(passwordInput.value);
  emailError.textContent = emailMsg;
  passwordError.textContent = passMsg;

  if (emailMsg || passMsg) {
    return;
  }

  const payload = {
    email: emailInput.value.trim(),
    password: passwordInput.value,
    remember: document.getElementById('remember').checked,
  };

  // Demo: replace with real request.
  console.log('Signing in with', payload);

  // Simulate success
  const btn = form.querySelector('.btn');
  const original = btn.textContent;
  btn.textContent = 'Signing in…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
    alert('Signed in successfully (demo)');
    form.reset();
    togglePasswordBtn.textContent = 'Show';
    passwordInput.setAttribute('type', 'password');
  }, 900);
});

// Google Identity Services: handle the credential response
// Replace the console.log with a call to your backend to verify the ID token.
window.handleCredentialResponse = function (response) {
  // response.credential is a JWT ID token. Send it to your server for verification.
  console.log('Google credential received', response);
  // Example POST (uncomment and point to your endpoint):
  // fetch('/api/auth/google', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ idToken: response.credential })
  // }).then(r => r.json()).then(data => {
  //   // handle success (e.g., redirect)
  // }).catch(err => {
  //   console.error(err);
  // });
};


