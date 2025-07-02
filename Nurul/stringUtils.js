/**
 * Kumpulan fungsi utilitas untuk manipulasi string
 */

function repeat(str, times) {
    let result = '';
    for (let i = 0; i < times; i++) result += str;
    return result;
}

function padLeft(str, length, char = ' ') {
    str = String(str);
    while (str.length < length) str = char + str;
    return str;
}

function padRight(str, length, char = ' ') {
    str = String(str);
    while (str.length < length) str = str + char;
    return str;
}

function camelCase(str) {
    return str
        .replace(/[-_ ]+(\w)/g, (_, c) => c ? c.toUpperCase() : '')
        .replace(/^\w/, c => c.toLowerCase());
}

function titleCase(str) {
    return str.replace(/\w\S*/g, txt =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

function removeVowels(str) {
    return str.replace(/[aeiou]/gi, '');
}

function countChar(str, char) {
    return (str.match(new RegExp(char, 'g')) || []).length;
}

function reverseWords(str) {
    return str.split(' ').reverse().join(' ');
}

function isAlpha(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function isNumeric(str) {
    return /^[0-9]+$/.test(str);
}

function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

function truncateWords(str, num) {
    return str.split(' ').slice(0, num).join(' ');
}

module.exports = {
    repeat,
    padLeft,
    padRight,
    camelCase,
    titleCase,
    removeVowels,
    countChar,
    reverseWords,
    isAlpha,
    isNumeric,
    isAlphanumeric,
    truncateWords
};