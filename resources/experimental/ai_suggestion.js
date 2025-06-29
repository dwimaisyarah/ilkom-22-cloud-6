// experimental AI suggestion module
const tasks = [
    "Coba kerjakan tugas yang belum selesai",
    "Luangkan waktu untuk membaca dokumentasi",
    "Selesaikan task harian kamu",
    "Review tugas yang sudah kamu submit"
];

// Tambahan: Daftar kategori tugas
const categories = [
    "Belajar",
    "Pekerjaan",
    "Pribadi",
    "Kesehatan",
    "Sosial"
];

// Tambahan: Daftar motivasi
const motivations = [
    "Kamu pasti bisa!",
    "Jangan menyerah, terus semangat!",
    "Setiap langkah kecil itu berarti.",
    "Fokus pada tujuanmu.",
    "Istirahat sejenak jika lelah."
];

// Fungsi untuk mendapatkan motivasi acak
function getRandomMotivation() {
    return motivations[Math.floor(Math.random() * motivations.length)];
}

// Fungsi untuk mendapatkan kategori acak
function getRandomCategory() {
    return categories[Math.floor(Math.random() * categories.length)];
}

// Fungsi untuk menambahkan tugas baru
export function addTask(newTask) {
    if (typeof newTask === "string" && newTask.trim().length > 0) {
        tasks.push(newTask.trim());
        return true;
    }
    return false;
}

// Fungsi untuk menghapus tugas berdasarkan indeks
export function removeTask(index) {
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        return true;
    }
    return false;
}

// Fungsi untuk mendapatkan semua tugas
export function getAllTasks() {
    return [...tasks];
}

// Fungsi untuk mendapatkan saran tugas dengan motivasi dan kategori
export function getDetailedSuggestion() {
    const task = getSuggestedTask();
    const category = getRandomCategory();
    const motivation = getRandomMotivation();
    return {
        task,
        category,
        motivation
    };
}

// Fungsi untuk mencari tugas berdasarkan kata kunci
export function searchTasks(keyword) {
    if (!keyword) return [];
    return tasks.filter(task => task.toLowerCase().includes(keyword.toLowerCase()));
}

// Fungsi untuk mengupdate tugas berdasarkan indeks
export function updateTask(index, newTask) {
    if (
        index >= 0 &&
        index < tasks.length &&
        typeof newTask === "string" &&
        newTask.trim().length > 0
    ) {
        tasks[index] = newTask.trim();
        return true;
    }
    return false;
}

// Fungsi untuk mendapatkan jumlah tugas
export function getTaskCount() {
    return tasks.length;
}

// Fungsi untuk mengosongkan semua tugas
export function clearTasks() {
    tasks.length = 0;
}

// Fungsi utama yang sudah ada
export function getSuggestedTask() {
    return tasks[Math.floor(Math.random() * tasks.length)];
}
