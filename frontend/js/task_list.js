document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("access_token");
  const taskList = document.getElementById("task-list");
  const searchInput = document.getElementById("search-task");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!token) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  let allTasks = [];
  

  // Ambil semua tugas dari endpoint /tasks
  async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:8000/all-tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Gagal ambil tugas");

      allTasks = await response.json();
      renderTasks(allTasks);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data tugas.");
    }
  }

  // Render tugas ke HTML
  function renderTasks(tasks) {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
      taskList.innerHTML = "<p>Tidak ada tugas ditemukan.</p>";
      return;
    }

    tasks.forEach((task) => {
      const card = document.createElement("div");
      card.classList.add("task-card");

      const deadlineColor = task.done ? "#999" : "#f00";

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

      if (task.done) {
        card.classList.add("task-done");
      }

      taskList.appendChild(card);
    });

    attachEventHandlers();
  }

  // Event tombol selesai & hapus
  function attachEventHandlers() {
    document.querySelectorAll(".done-btn").forEach((btn) => {
      btn.addEventListener("click", async function () {
        const id = this.dataset.id;
        // Cari task dari allTasks dulu, supaya tahu status done-nya
        const task = allTasks.find(t => t.id == id);
        if (!task) return alert("Task tidak ditemukan");

        try {
          await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            // Toggle done: kalau sudah done jadi false, kalau belum jadi true
            body: JSON.stringify({ done: !task.done }),
          });
          await fetchTasks();
        } catch (err) {
          alert("Gagal menandai selesai");
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async function () {
        const id = this.dataset.id;
        if (!confirm("Yakin ingin menghapus tugas ini?")) return;

        try {
          await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          await fetchTasks();
        } catch (err) {
          alert("Gagal menghapus tugas");
        }
      });
    });
  }

  // Filter status tugas
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      let filteredTasks = [];

      if (filter === "done") {
        filteredTasks = allTasks.filter((task) => task.done);
      } else if (filter === "not_done") {
        filteredTasks = allTasks.filter((task) => !task.done);
      } else {
        filteredTasks = allTasks;
      }

      renderTasks(filteredTasks);
    });
  });

  // Pencarian tugas
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = allTasks.filter(
      (task) =>
        task.judul.toLowerCase().includes(keyword) ||
        task.deskripsi.toLowerCase().includes(keyword)
    );
    renderTasks(filtered);
  });

  // Fetch & render awal
  await fetchTasks();
});
