// Math service with many functions

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b !== 0 ? a / b : null; }
function modulus(a, b) { return b !== 0 ? a % b : null; }
function power(a, b) { return Math.pow(a, b); }
function sqrt(a) { return a >= 0 ? Math.sqrt(a) : null; }
function cbrt(a) { return Math.cbrt(a); }
function abs(a) { return Math.abs(a); }
function ceil(a) { return Math.ceil(a); }
function floor(a) { return Math.floor(a); }
function round(a) { return Math.round(a); }
function max(...args) { return Math.max(...args); }
function min(...args) { return Math.min(...args); }
function random() { return Math.random(); }
function sin(a) { return Math.sin(a); }
function cos(a) { return Math.cos(a); }
function tan(a) { return Math.tan(a); }
function asin(a) { return Math.asin(a); }
function acos(a) { return Math.acos(a); }
function atan(a) { return Math.atan(a); }
function atan2(a, b) { return Math.atan2(a, b); }
function log(a) { return a > 0 ? Math.log(a) : null; }
function log10(a) { return a > 0 ? Math.log10(a) : null; }
function log2(a) { return a > 0 ? Math.log2(a) : null; }
function exp(a) { return Math.exp(a); }
function sign(a) { return Math.sign(a); }
function trunc(a) { return Math.trunc(a); }
function hypot(...args) { return Math.hypot(...args); }
function clamp(a, minVal, maxVal) { return Math.max(minVal, Math.min(a, maxVal)); }
function degToRad(deg) { return deg * (Math.PI / 180); }
function radToDeg(rad) { return rad * (180 / Math.PI); }
function gcd(a, b) {
    if (!b) return Math.abs(a);
    return gcd(b, a % b);
}
function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}
function factorial(n) {
    if (n < 0) return null;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}
function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}
function fibonacci(n) {
    if (n < 0) return null;
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a + b];
    }
    return a;
}
function sum(arr) {
    return arr.reduce((acc, val) => acc + val, 0);
}
function average(arr) {
    return arr.length ? sum(arr) / arr.length : null;
}
function median(arr) {
    if (!arr.length) return null;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
function mode(arr) {
    if (!arr.length) return null;
    const freq = {};
    arr.forEach(val => freq[val] = (freq[val] || 0) + 1);
    let maxFreq = 0, modes = [];
    for (const key in freq) {
        if (freq[key] > maxFreq) {
            maxFreq = freq[key];
            modes = [Number(key)];
        } else if (freq[key] === maxFreq) {
            modes.push(Number(key));
        }
    }
    return modes;
}
function variance(arr) {
    if (!arr.length) return null;
    const avg = average(arr);
    return average(arr.map(x => (x - avg) ** 2));
}
function stddev(arr) {
    const v = variance(arr);
    return v !== null ? Math.sqrt(v) : null;
}
function range(arr) {
    if (!arr.length) return null;
    return Math.max(...arr) - Math.min(...arr);
}
function percentile(arr, p) {
    if (!arr.length || p < 0 || p > 100) return null;
    const sorted = [...arr].sort((a, b) => a - b);
    const idx = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    if (lower === upper) return sorted[lower];
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (idx - lower);
}
function isEven(n) { return n % 2 === 0; }
function isOdd(n) { return n % 2 !== 0; }
function toFixed(a, digits) { return Number(a.toFixed(digits)); }
function cube(a) { return a * a * a; }
function square(a) { return a * a; }
function reciprocal(a) { return a !== 0 ? 1 / a : null; }
function sumOfSquares(arr) { return sum(arr.map(x => x * x)); }
function geometricMean(arr) {
    if (!arr.length) return null;
    return Math.pow(arr.reduce((acc, val) => acc * val, 1), 1 / arr.length);
}
function harmonicMean(arr) {
    if (!arr.length) return null;
    return arr.length / arr.reduce((acc, val) => acc + 1 / val, 0);
}
function rootMeanSquare(arr) {
    if (!arr.length) return null;
    return Math.sqrt(sumOfSquares(arr) / arr.length);
}
function degToGrad(deg) { return deg * (10 / 9); }
function gradToDeg(grad) { return grad * (9 / 10); }
function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function invLerp(a, b, v) { return (v - a) / (b - a); }
function mapRange(a1, a2, b1, b2, v) { return b1 + ((v - a1) * (b2 - b1)) / (a2 - a1); }
function isInteger(n) { return Number.isInteger(n); }
function isFloat(n) { return Number(n) === n && n % 1 !== 0; }
function isFiniteNumber(n) { return Number.isFinite(n); }
function isPositive(n) { return n > 0; }
function isNegative(n) { return n < 0; }
function nthRoot(a, n) { return n !== 0 ? Math.pow(a, 1 / n) : null; }
function logBase(a, base) { return a > 0 && base > 0 ? Math.log(a) / Math.log(base) : null; }
function distance2D(x1, y1, x2, y2) { return Math.hypot(x2 - x1, y2 - y1); }
function distance3D(x1, y1, z1, x2, y2, z2) { return Math.hypot(x2 - x1, y2 - y1, z2 - z1); }
function degNormalize(deg) { return ((deg % 360) + 360) % 360; }
function radNormalize(rad) { return ((rad % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI); }
function sumDigits(n) { return Math.abs(n).toString().split('').reduce((a, b) => a + Number(b), 0); }
function reverseNumber(n) { return parseInt(Math.abs(n).toString().split('').reverse().join('')) * Math.sign(n); }
function isPalindromeNumber(n) { return Math.abs(n).toString() === Math.abs(n).toString().split('').reverse().join(''); }
function countDivisors(n) {
    n = Math.abs(n);
    let count = 0;
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            count += (n / i === i) ? 1 : 2;
        }
    }
    return count;
}
function properDivisors(n) {
    n = Math.abs(n);
    let divisors = [];
    for (let i = 1; i <= n / 2; i++) {
        if (n % i === 0) divisors.push(i);
    }
    return divisors;
}
function isPerfectNumber(n) {
    return sum(properDivisors(n)) === n;
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    modulus,
    power,
    sqrt,
    cbrt,
    abs,
    ceil,
    floor,
    round,
    max,
    min,
    random,
    sin,
    cos,
    tan,
    asin,
    acos,
    atan,
    atan2,
    log,
    log10,
    log2,
    exp,
    sign,
    trunc,
    hypot,
    clamp,
    degToRad,
    radToDeg,
    gcd,
    lcm,
    factorial,
    isPrime,
    fibonacci,
    sum,
    average,
    median,
    mode,
    variance,
    stddev,
    range,
    percentile,
    isEven,
    isOdd,
    toFixed,
    cube,
    square,
    reciprocal,
    sumOfSquares,
    geometricMean,
    harmonicMean,
    rootMeanSquare,
    degToGrad,
    gradToDeg,
    sigmoid,
    lerp,
    invLerp,
    mapRange,
    isInteger,
    isFloat,
    isFiniteNumber,
    isPositive,
    isNegative,
    nthRoot,
    logBase,
    distance2D,
    distance3D,
    degNormalize,
    radNormalize,
    sumDigits,
    reverseNumber,
    isPalindromeNumber,
    countDivisors,
    properDivisors,
    isPerfectNumber
    // Export all added functions
};