// Menunggu sampai seluruh isi dokumen HTML dimuat
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("access_token"); // Mengambil token dari localStorage (digunakan untuk autentikasi)
  if (!token) {                                       // Jika tidak ada token, artinya belum login → redirect ke halaman login
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }
  // Mengambil ID tugas dari parameter URL (contoh: edit-task.html?id=123)
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("id");
  // Jika ID tugas tidak ditemukan di URL, redirect ke halaman utama
  if (!taskId) {                                    
    alert("ID tugas tidak ditemukan.");
    window.location.href = "index.html";
    return;
  }
  // Mendapatkan elemen-elemen form dari HTML
  const form = document.getElementById("edit-task-form");
  const judulInput = document.getElementById("judul");
  const deskripsiInput = document.getElementById("deskripsi");
  const deadlineInput = document.getElementById("deadline");
  const doneInput = document.getElementById("done");

  // Mengambil data tugas dari backend berdasarkan ID
  try {
    const response = await fetch(`http://localhost:5500/ambil-tugas/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Gagal mengambil data tugas");

    const task = await response.json();
    judulInput.value = task.judul || "";
    deskripsiInput.value = task.deskripsi || "";
    deadlineInput.value = task.deadline ? task.deadline.split("T")[0] : "";
    doneInput.checked = task.done || false;

  } catch (err) {
    alert("Gagal memuat data tugas.");
    console.error(err);
    window.location.href = "index.html";
    return;
  }

  // Menambahkan event listener saat form disubmit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    document.getElementById("submit-btn").disabled = true;

    const updatedTask = {
      judul: judulInput.value,
      deskripsi: deskripsiInput.value,
      deadline: deadlineInput.value || null,
      done: doneInput.checked
    };

    try {
      const res = await fetch(`http://localhost:5500//tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedTask)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const msg = errorData.detail || "Gagal update tugas";
        throw new Error(msg);
      }

      // Tampilkan pesan sukses dan redirect ke halaman daftar tugas
      alert("Tugas berhasil diperbarui.");
      window.location.href = "task.html";
      
    // Tangani dan tampilkan error saat update gagal
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  }, { once: true });
});
