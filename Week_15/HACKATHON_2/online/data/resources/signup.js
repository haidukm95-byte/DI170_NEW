const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordConfirmInput = document.querySelector("#passwordConfirm");
const loginButton = document.querySelector("#loginButton");
const showPassword = document.querySelector("#show-password");

showPassword.addEventListener("change", () => {
  passwordInput.type = showPassword.checked ? "text" : "password";
});

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!emailInput.value.trim()) {
    emailInput.placeholder = "Enter your email";
    emailInput.focus();
    return;
  }
  if (!usernameInput.value.trim()) {
    usernameInput.placeholder = "Enter your username";
    usernameInput.focus();
    return;
  }
  if (!passwordInput.value.trim()) {
    passwordInput.placeholder = "Enter your password";
    passwordInput.focus();
    return;
  }
  if (!passwordConfirmInput.value.trim()) {
    passwordConfirmInput.placeholder = "Confirm your password";
    passwordConfirmInput.focus();
    return;
  }
  if (passwordInput.value !== passwordConfirmInput.value) {
    passwordConfirmInput.value = "";
    passwordConfirmInput.placeholder = "Passwords do not match";
    passwordConfirmInput.focus();
    return;
  }

  try {
    const checkRes = await fetch("/api/check-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
      }),
    });
    const { usernameTaken, emailTaken } = await checkRes.json();

    if (emailTaken) {
      emailInput.value = "";
      emailInput.placeholder = "This email is already registered";
      emailInput.focus();
      return;
    }
    if (usernameTaken) {
      usernameInput.value = "";
      usernameInput.placeholder = "This username is already taken";
      usernameInput.focus();
      return;
    }

    // Username and email are free — proceed to create the account
    const createRes = await fetch("/api/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value,
      }),
    });
    if (createRes.ok) {
      const createData = await createRes.json();
      sessionStorage.setItem("username", createData.username);
      sessionStorage.setItem("useruid", createData.uid);
      window.location.href = "main.html";
    }
  } catch (err) {
    console.error("Signup error:", err);
  }
});
