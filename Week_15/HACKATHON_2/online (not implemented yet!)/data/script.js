const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginButton = document.querySelector("#loginButton");
const showPassword = document.querySelector("#show-password");

showPassword.addEventListener("change", () => {
  passwordInput.type = showPassword.checked ? "text" : "password";
});

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!usernameInput.value.trim()) {
    usernameInput.placeholder = "Enter your email or username";
    usernameInput.focus();
    return;
  }
  if (!passwordInput.value.trim()) {
    passwordInput.placeholder = "Enter your password";
    passwordInput.focus();
    return;
  }

  try {
    const res = await fetch("/api/check-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameInput.value.trim(),
        password: passwordInput.value,
      }),
    });
    const data = await res.json();

    if (data.exists && !data.passwordWrong) {
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("useruid", data.uid);
      window.location.href = "resources/main.html";
    } else if (!data.exists) {
      usernameInput.value = "";
      usernameInput.placeholder = "Username or email not found";
      usernameInput.focus();
    } else {
      passwordInput.value = "";
      passwordInput.placeholder = "Incorrect password";
      passwordInput.focus();
    }
  } catch (err) {
    console.error("Login error:", err);
  }
});
