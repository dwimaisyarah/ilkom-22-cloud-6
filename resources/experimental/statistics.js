// mock statistik tugas
export function calculateStats(tasks) {
    const completed = tasks.filter(t => t.status === 'done').length;
    const pending = tasks.length - completed;
    return { completed, pending };
}

// Fungsi untuk menghitung rata-rata waktu penyelesaian tugas
export function averageCompletionTime(tasks) {
    const completedTasks = tasks.filter(t => t.status === 'done' && t.completedAt && t.createdAt);
    if (completedTasks.length === 0) return 0;
    const totalTime = completedTasks.reduce((sum, t) => {
        const start = new Date(t.createdAt).getTime();
        const end = new Date(t.completedAt).getTime();
        return sum + (end - start);
    }, 0);
    return totalTime / completedTasks.length;
}

// Fungsi untuk menghitung jumlah tugas berdasarkan prioritas
export function countByPriority(tasks) {
    return tasks.reduce((acc, t) => {
        acc[t.priority] = (acc[t.priority] || 0) + 1;
        return acc;
    }, {});
}

// Fungsi untuk mendapatkan daftar tugas yang overdue
export function getOverdueTasks(tasks, now = new Date()) {
    return tasks.filter(t => t.dueDate && new Date(t.dueDate) < now && t.status !== 'done');
}

// Fungsi untuk menghitung persentase penyelesaian tugas
export function completionPercentage(tasks) {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.status === 'done').length;
    return (completed / tasks.length) * 100;
}

// Fungsi untuk mengelompokkan tugas berdasarkan status
export function groupByStatus(tasks) {
    return tasks.reduce((acc, t) => {
        acc[t.status] = acc[t.status] || [];
        acc[t.status].push(t);
        return acc;
    }, {});
}

// Fungsi untuk mendapatkan tugas yang paling lama belum selesai
export function getOldestPendingTask(tasks) {
    const pendingTasks = tasks.filter(t => t.status !== 'done' && t.createdAt);
    if (pendingTasks.length === 0) return null;
    return pendingTasks.reduce((oldest, t) => {
        return new Date(t.createdAt) < new Date(oldest.createdAt) ? t : oldest;
    });
}

// Fungsi untuk menghitung jumlah tugas per hari
export function countTasksPerDay(tasks) {
    return tasks.reduce((acc, t) => {
        const date = t.createdAt ? new Date(t.createdAt).toISOString().slice(0, 10) : 'unknown';
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});
}

// Fungsi untuk mendapatkan statistik lengkap
export function getFullStatistics(tasks) {
    return {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'done').length,
        pending: tasks.filter(t => t.status !== 'done').length,
        overdue: getOverdueTasks(tasks).length,
        averageCompletionTime: averageCompletionTime(tasks),
        byPriority: countByPriority(tasks),
        completionPercentage: completionPercentage(tasks),
        oldestPending: getOldestPendingTask(tasks),
        tasksPerDay: countTasksPerDay(tasks),
        groupedByStatus: groupByStatus(tasks)
    };
}

// Contoh penggunaan fungsi-fungsi di atas
// const tasks = [
//   { status: 'done', priority: 'high', createdAt: '2024-06-01', completedAt: '2024-06-02', dueDate: '2024-06-03' },
//   { status: 'pending', priority: 'low', createdAt: '2024-06-02', dueDate: '2024-06-04' },
//   // ...data lainnya
// ];
// console.log(getFullStatistics(tasks));
