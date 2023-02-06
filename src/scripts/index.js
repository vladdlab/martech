const form = document.querySelector("form");
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (checkValidity()) return;

  const credentials = Object.fromEntries(new FormData(event.target));
  try {
    await signIn(credentials)
  } catch {
    await signUp(credentials);
  }
  form.classList.add('signup-form--success');
  setTimeout(() => redirectToMain(), 500)
})
