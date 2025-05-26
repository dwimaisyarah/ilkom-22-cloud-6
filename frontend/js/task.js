document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("access_token");
  console.log("Token dari localStorage:", token);

  if (!token) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  // Verifikasi token saat halaman dimuat
  try {
    const response = await fetch("http://127.0.0.1:5500/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Token tidak valid");
  } catch (error) {
    alert("Session Anda telah habis. Silakan login kembali.");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById("task-form");
  if (!form) {
    console.error("Form task tidak ditemukan!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const judul = document.getElementById("judul").value.trim();
    const deskripsi = document.getElementById("deskripsi").value.trim();
    const deadlineInput = document.getElementById("deadline").value; // format: "YYYY-MM-DD"
    let deadline = null;

    if (deadlineInput) {
      // Format deadline jadi ISO 8601 dengan waktu default 00:00:00
      deadline = deadlineInput + "T00:00:00";
    }

    try {
      const response = await fetch("http://127.0.0.1:5500/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          judul,
          deskripsi,
          deadline,
          pushover: true
        }),
      });

      if (response.status === 401) {
        alert("Session Anda telah habis. Silakan login kembali.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        window.location.href = "login.html";
        return;
      }

      if (response.ok) {
        alert("Task berhasil ditambahkan!");
        window.location.href = "task.html";
      } else {
        const errorData = await response.json();
        alert("Gagal menambahkan task: " + (errorData.detail || response.statusText));
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menambahkan task.");
      console.error("Error saat menambahkan task:", error);
    }
  });
});
