document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("access_token");

  // Cek apakah user sudah login
  if (!token) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  // Verifikasi token valid
  try {
    const response = await fetch("http://127.0.0.1:8000/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Token tidak valid");
    }
  } catch (error) {
    alert("Session Anda telah habis. Silakan login kembali.");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    window.location.href = "login.html";
    return;
  }

  // Tangani event submit form tambah tugas
  const form = document.getElementById("task-form");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const judul = document.getElementById("judul").value.trim();
    const deskripsi = document.getElementById("deskripsi").value.trim();
    const deadline = document.getElementById("deadline").value;

    // Validasi input sederhana
    if (!judul || !deskripsi) {
      alert("Judul dan Deskripsi wajib diisi.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/add-task", {
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          judul: judul,
          deskripsi: deskripsi,
          deadline: deadline || null,
          pushover: true
        }),
      });

      console.log("STATUS:", response.status);

      const text = await response.text();
      console.log("RAW RESPONSE:", text);

      let data = {};
      try {
        data = JSON.parse(text);
        console.log("PARSED RESPONSE JSON:", data);
      } catch (e) {
        console.warn("Gagal parse JSON response, response mungkin kosong atau bukan JSON:", e.message);
        data = { detail: text };
      }

      if (!response.ok) {
        alert(`Gagal menambahkan tugas: ${data.detail || "Terjadi kesalahan (unknown error)"}`);
        return;
      }

      alert("Tugas berhasil ditambahkan dan notifikasi dikirim ke Pushover!");
      window.location.href = "task.html";

    } catch (error) {
      console.error("NETWORK ERROR:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Stack trace:", error.stack);
      }
      alert("Terjadi kesalahan saat menambahkan tugas (network/client-side error).");
    }
  });
});
