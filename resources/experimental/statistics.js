// mock statistik tugas
export function calculateStats(tasks) {
  const completed = tasks.filter(t => t.status === 'done').length;
  const pending = tasks.length - completed;
  return { completed, pending };
}
