const API_BASE_URL = "http://100.24.60.248:5500";

// === REGISTER USER ===
async function registerUser(username, password, pushoverKey = null) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        pushover_user_key: pushoverKey,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Registrasi gagal: ${data.detail || "Terjadi kesalahan."}`);
      return;
    }

    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Register Error:", error);
    alert("Terjadi kesalahan saat registrasi.");
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
      alert(`Login gagal: ${data.detail || "Username atau password salah."}`);
      return;
    }

    // Simpan token & user ID ke localStorage
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("isLoggedIn", "true");

    alert("Login berhasil!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Login Error:", error);
    alert("Terjadi kesalahan saat login.");
  }
}

// === GET ACCESS TOKEN ===
function getAccessToken() {
  return localStorage.getItem("access_token");
}

// === LOGOUT USER ===
function logoutUser() {
  localStorage.clear();
  window.location.href = "index.html";
}
