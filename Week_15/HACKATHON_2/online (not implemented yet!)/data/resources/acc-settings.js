const username = sessionStorage.getItem("username");
const useruid = sessionStorage.getItem("useruid");

document.querySelector("#acc-set-form b").textContent = username || "Guest";

// Load current user info
async function loadUserInfo() {
  const res = await fetch(`/api/user/${useruid}`);
  const data = await res.json();
  const bTags = document.querySelectorAll("#acc-set-form b");
  bTags[0].textContent = data.username || "";
  bTags[1].textContent = data.email || "";
  bTags[2].textContent = data.username || "";
}
loadUserInfo();

// Change email
document
  .querySelector("#submitEmailChanges")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value.trim();
    if (!email) return;
    const res = await fetch("/api/user/email", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ useruid, email }),
    });
    const data = await res.json();
    if (data.updated) {
      document.querySelector("#email").value = "";
      loadUserInfo();
    } else {
      document.querySelector("#email").placeholder = data.error;
    }
  });

// Change username
document
  .querySelector("#submitUsernameChanges")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value.trim();
    if (!username) return;
    const res = await fetch("/api/user/username", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ useruid, username }),
    });
    const data = await res.json();
    if (data.updated) {
      sessionStorage.setItem("username", username);
      document.querySelector("#username").value = "";
      loadUserInfo();
    } else {
      document.querySelector("#username").placeholder = data.error;
    }
  });

// Change password
document
  .querySelector("#submitPassChanges")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const currentPassword = document.querySelector("#password").value;
    const newPassword = document.querySelector("#new-password").value;
    const confirmPassword = document.querySelector(
      "#new-password-confirm",
    ).value;
    if (newPassword !== confirmPassword) {
      document.querySelector("#new-password-confirm").value = "";
      document.querySelector("#new-password-confirm").placeholder =
        "Passwords do not match";
      return;
    }
    const res = await fetch("/api/user/password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ useruid, currentPassword, newPassword }),
    });
    const data = await res.json();
    if (data.updated) {
      document.querySelector("#password").value = "";
      document.querySelector("#new-password").value = "";
      document.querySelector("#new-password-confirm").value = "";
      document.querySelector("#new-password-confirm").placeholder =
        "Password changed!";
    } else {
      document.querySelector("#password").value = "";
      document.querySelector("#password").placeholder = data.error;
    }
  });

// Delete account
document.querySelector("#accountDelete").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#delete-modal").style.display = "block";
});

document.querySelector("#delete-cancel").addEventListener("click", () => {
  document.querySelector("#delete-modal").style.display = "none";
  document.querySelector("#delete-password").value = "";
  document.querySelector("#delete-error").style.display = "none";
});

document
  .querySelector("#delete-confirm")
  .addEventListener("click", async () => {
    const password = document.querySelector("#delete-password").value;
    if (!password) return;
    const res = await fetch("/api/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ useruid, password }),
    });
    const data = await res.json();
    if (data.deleted) {
      sessionStorage.clear();
      window.location.href = "../index.html";
    } else {
      const err = document.querySelector("#delete-error");
      err.textContent = data.error;
      err.style.display = "block";
      document.querySelector("#delete-password").value = "";
    }
  });
