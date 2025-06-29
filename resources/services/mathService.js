// Math service with many functions

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b !== 0 ? a / b : null; }

// Tambahkan banyak fungsi matematika lain di sini

module.exports = {
    add,
    subtract,
    multiply,
    divide
    // Export semua fungsi yang kamu tambahkan
};