document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("id");
  if (!taskId) {
    alert("ID tugas tidak ditemukan.");
    window.location.href = "index.html";
    return;
  }

  const form = document.getElementById("edit-task-form");
  const judulInput = document.getElementById("judul");
  const deskripsiInput = document.getElementById("deskripsi");
  const deadlineInput = document.getElementById("deadline");
  const doneInput = document.getElementById("done");

  try {
    const response = await fetch(`http://localhost:8000/ambil-tugas/${taskId}`, {
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
      const res = await fetch(`http://localhost:8000/tasks/${taskId}`, {
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

      alert("Tugas berhasil diperbarui.");
      window.location.href = "task.html";

    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  }, { once: true });
});
