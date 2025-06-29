// ekspor ke CSV format
export function exportToCSV(tasks) {
  const header = "id,task,status\\n";
  const rows = tasks.map(t => `${t.id},${t.name},${t.status}`).join("\\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  return URL.createObjectURL(blob);
}
