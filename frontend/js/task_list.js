// Tunggu hingga semua konten halaman dimuat
document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("access_token"); // Ambil token dari localStorage
  const taskList = document.getElementById("task-list"); // Elemen untuk menampilkan daftar tugas
  const searchInput = document.getElementById("search-task"); // Input pencarian
  const filterButtons = document.querySelectorAll(".filter-btn"); // Tombol filter

  // Jika token tidak ditemukan, redirect ke halaman login
  if (!token) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  let allTasks = []; // Menyimpan semua tugas yang diambil dari server

  // Fungsi untuk mengambil semua tugas dari server
  async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:5500/all-tasks", {
        headers: {
          Authorization: `Bearer ${token}`, // Kirim token untuk otorisasi
        },
      });

      if (!response.ok) throw new Error("Gagal ambil tugas");

      allTasks = await response.json(); // Simpan hasilnya ke allTasks
      renderTasks(allTasks); // Tampilkan tugas ke HTML
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data tugas.");
    }
  }

  // Fungsi untuk menampilkan daftar tugas ke halaman HTML
  function renderTasks(tasks) {
    taskList.innerHTML = ""; // Kosongkan elemen sebelum render ulang

    // Jika tidak ada tugas, tampilkan pesan
    if (tasks.length === 0) {
      taskList.innerHTML = "<p>Tidak ada tugas ditemukan.</p>";
      return;
    }

    // Iterasi setiap tugas dan buat elemen HTML
    tasks.forEach((task) => {
      const card = document.createElement("div");
      card.classList.add("task-card");

      // Warna deadline merah jika belum selesai, abu jika sudah selesai
      const deadlineColor = task.done ? "#999" : "#f00";

      // Tambahkan konten tugas
      card.innerHTML = `
        <h3>${task.judul}</h3>
        <p>${task.deskripsi}</p>
        <p style="color: ${deadlineColor}">Deadline: ${task.deadline || "Tidak ada"}</p>
        <div class="task-actions">
          <button class="done-btn" data-id="${task.id}">
            ${task.done ? "Batal Selesai" : "Selesai"}
          </button>
          <button class="edit-btn" onclick="window.location.href='edit_task.html?id=${task.id}'">Edit</button>
          <button class="delete-btn" data-id="${task.id}">Hapus</button>
        </div>
      `;

      // Jika tugas sudah selesai, tambahkan kelas tambahan
      if (task.done) {
        card.classList.add("task-done");
      }

      // Masukkan elemen tugas ke dalam halaman
      taskList.appendChild(card);
    });

    // Pasang ulang event handler setelah render
    attachEventHandlers();
  }

  // Fungsi untuk memasang event listener pada tombol selesai dan hapus
  function attachEventHandlers() {
    // Event tombol selesai
    document.querySelectorAll(".done-btn").forEach((btn) => {
      btn.addEventListener("click", async function () {
        const id = this.dataset.id;
        const task = allTasks.find(t => t.id == id); // Cari task berdasarkan ID
        if (!task) return alert("Task tidak ditemukan");

        try {
          // Toggle status selesai (done)
          await fetch(`http://localhost:5500/tasks/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ done: !task.done }), // Toggle done
          });
          await fetchTasks(); // Refresh daftar tugas
        } catch (err) {
          alert("Gagal menandai selesai");
        }
      });
    });

    // Event tombol hapus
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async function () {
        const id = this.dataset.id;
        if (!confirm("Yakin ingin menghapus tugas ini?")) return;

        try {
          // Kirim permintaan hapus ke backend
          await fetch(`http://localhost:5500/tasks/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          await fetchTasks(); // Refresh daftar tugas
        } catch (err) {
          alert("Gagal menghapus tugas");
        }
      });
    });
  }

  // Filter tugas berdasarkan status (semua, selesai, belum selesai)
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Hapus kelas aktif dari semua tombol filter
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active"); // Tambahkan ke tombol yang diklik

      const filter = btn.dataset.filter;
      let filteredTasks = [];

      // Filter berdasarkan status tugas
      if (filter === "done") {
        filteredTasks = allTasks.filter((task) => task.done);
      } else if (filter === "not_done") {
        filteredTasks = allTasks.filter((task) => !task.done);
      } else {
        filteredTasks = allTasks; // Semua tugas
      }

      renderTasks(filteredTasks);
    });
  });

  // Pencarian tugas berdasarkan judul atau deskripsi
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = allTasks.filter(
      (task) =>
        task.judul.toLowerCase().includes(keyword) ||
        task.deskripsi.toLowerCase().includes(keyword)
    );
    renderTasks(filtered); // Tampilkan hasil pencarian
  });

  // Ambil data tugas pertama kali saat halaman dimuat
  await fetchTasks();
});
