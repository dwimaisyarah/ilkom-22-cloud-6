// Service untuk manipulasi tanggal

function getToday() {
    return new Date().toISOString().slice(0, 10);
}

function addDays(dateStr, days) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
}

function isWeekend(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDay();
    return day === 0 || day === 6;
}

module.exports = { getToday, addDays, isWeekend };