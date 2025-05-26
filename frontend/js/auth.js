const API_BASE_URL = "http://localhost:8000";

// === REGISTER USER ===
async function registerUser(username, password, pushoverKey) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        pushover_user_key: pushoverKey || null,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Registrasi gagal: ${data.detail}`);
      return;
    }

    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "login.html";
  } catch (error) {
    alert("Terjadi kesalahan saat registrasi.");
    console.error("Register Error:", error);
  }
}

// === LOGIN USER ===
async function loginUser(username, password) {
  try {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(`${API_BASE_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Login gagal: ${data.detail}`);
      return;
    }

    // Simpan token dan status login ke localStorage
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("isLoggedIn", "true");

    alert("Login berhasil!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Terjadi kesalahan saat login.");
    console.error("Login Error:", error);
  }
}

// === AMBIL TOKEN DARI LOCALSTORAGE ===
function getAccessToken() {
  return localStorage.getItem("access_token");
}

// === LOGOUT USER ===
function logoutUser() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html"; // Biasanya redirect ke home setelah logout
}