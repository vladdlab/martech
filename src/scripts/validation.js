// Email field
const email = document.getElementById("email");
const emailInput = document.querySelector("#email > input");
const emailError = document.querySelector("#email > p.invalid-feedback");
// Password field
const password = document.getElementById("password");
const passwordInput = document.querySelector("#password > input");
const passwordError = document.querySelector("#password > p.invalid-feedback");

emailInput.addEventListener('focus', () => {
  emailError.textContent = '';
  email.classList.remove('field--invalid');
})

passwordInput.addEventListener('focus', () => {
  passwordError.textContent = '';
  password.classList.remove('field--invalid');
})

function checkValidity() {
  showErrorsIfExist();
  return !emailInput.validity.valid || !passwordInput.validity.valid
}

function showErrorsIfExist() {
  if (!emailInput.validity.valid) {
    emailError.textContent = "Please enter a valid e-mail";
    email.classList.add('field--invalid');
  }

  if (!passwordInput.validity.valid) {
    passwordError.textContent = `Password should be at least ${passwordInput.minLength} characters; you entered ${passwordInput.value.length}.`;
    password.classList.add('field--invalid');
  }
}
