document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("access_token");
  console.log("Token dari localStorage:", token);

  if (!token) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  // Verifikasi token
  try {
    const response = await fetch("http://127.0.0.1:8000/me", {
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
      const response = await fetch("http://127.0.0.1:8000/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          judul: judul,
          deskripsi: deskripsi,
          deadline: deadline,
          pushover: true
        }),
      });

      if (response.ok) {
        console.log("Task berhasil ditambahkan");
        alert("Task berhasil ditambahkan!");
        window.location.href = "task.html";
      } else {
        const errorData = await response.json();
        console.error("Gagal menambahkan task:", errorData.detail || response.statusText);
        alert("Gagal menambahkan task: " + (errorData.detail || response.statusText));
      }
    } catch (error) {
      console.error("Error saat menambahkan task:", error);
      alert("Terjadi kesalahan saat menambahkan task.");
    }
  });
});
