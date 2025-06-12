// Event listener akan dijalankan setelah seluruh konten DOM dimuat
document.addEventListener("DOMContentLoaded", async function () {
  // Ambil token dari localStorage
  const token = localStorage.getItem("access_token");
  console.log("Token dari localStorage:", token);

  // Jika token tidak ada, arahkan pengguna ke halaman login
  if (!token) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  // Verifikasi token saat halaman dimuat
  try {
    const response = await fetch("http://localhost:5500//me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}` // Sertakan token di header
      }
    });

    // Jika response tidak ok, lempar error
    if (!response.ok) throw new Error("Token tidak valid");
  } catch (error) {
    // Jika terjadi error saat verifikasi token, hapus token dari localStorage dan arahkan ke login
    alert("Session Anda telah habis. Silakan login kembali.");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    window.location.href = "login.html";
    return;
  }

  // Ambil elemen form dengan id "task-form"
  const form = document.getElementById("task-form");
  if (!form) {
    console.error("Form task tidak ditemukan!");
    return;
  }

  // Tambahkan event listener untuk submit form
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // Ambil nilai dari input judul dan deskripsi
    const judul = document.getElementById("judul").value.trim();
    const deskripsi = document.getElementById("deskripsi").value.trim();
    const deadlineInput = document.getElementById("deadline").value; // format: "YYYY-MM-DD"
    let deadline = null;

    // Jika input deadline ada, ubah format ke ISO 8601 dengan waktu default 00:00:00
    if (deadlineInput) {
      deadline = deadlineInput + "T00:00:00";
    }

    try {
      // Kirim permintaan POST ke endpoint add-task dengan data task
      const response = await fetch("http://localhost:5500//add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Sertakan token di header
        },
        body: JSON.stringify({
          judul,
          deskripsi,
          deadline,
          pushover: true // Properti tambahan (misalnya untuk notifikasi)
        }),
      });

      // Jika status 401, berarti session habis
      if (response.status === 401) {
        alert("Session Anda telah habis. Silakan login kembali.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        window.location.href = "login.html";
        return;
      }

      // Jika request berhasil, tampilkan pesan sukses dan arahkan ke halaman task
      if (response.ok) {
        alert("Task berhasil ditambahkan!");
        window.location.href = "task.html";
      } else {
        // Jika gagal, tampilkan pesan error dari response
        const errorData = await response.json();
        alert("Gagal menambahkan task: " + (errorData.detail || response.statusText));
      }
    } catch (error) {
      // Tangani error jaringan atau kesalahan lain saat request
      alert("Terjadi kesalahan saat menambahkan task.");
      console.error("Error saat menambahkan task:", error);
    }
  });
});
