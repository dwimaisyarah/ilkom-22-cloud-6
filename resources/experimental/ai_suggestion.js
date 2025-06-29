// experimental AI suggestion module
const tasks = [
  "Coba kerjakan tugas yang belum selesai",
  "Luangkan waktu untuk membaca dokumentasi",
  "Selesaikan task harian kamu",
  "Review tugas yang sudah kamu submit"
];

export function getSuggestedTask() {
  return tasks[Math.floor(Math.random() * tasks.length)];
}
