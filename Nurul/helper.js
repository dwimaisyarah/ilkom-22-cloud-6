// Utility functions for the resources project

/**
 * Capitalizes the first character of a string.
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Reverses a string.
 * @param {string} str
 * @returns {string}
 */
function reverseString(str) {
    if (!str) return '';
    return str.split('').reverse().join('');
}

/**
 * Checks if a string is a palindrome.
 * @param {string} str
 * @returns {boolean}
 */
function isPalindrome(str) {
    if (!str) return false;
    const clean = str.replace(/[\W_]/g, '').toLowerCase();
    return clean === clean.split('').reverse().join('');
}

/**
 * Counts the number of words in a string.
 * @param {string} str
 * @returns {number}
 */
function countWords(str) {
    if (!str) return 0;
    return str.trim().split(/\s+/).length;
}

/**
 * Truncates a string to a specified length and adds ellipsis if needed.
 * @param {string} str
 * @param {number} length
 * @returns {string}
 */
function truncate(str, length) {
    if (!str || str.length <= length) return str;
    return str.slice(0, length) + '...';
}

/**
 * Converts a string to kebab-case.
 * @param {string} str
 * @returns {string}
 */
function toKebabCase(str) {
    if (!str) return '';
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/\s+/g, '-')
        .toLowerCase();
}

/**
 * Converts a string to snake_case.
 * @param {string} str
 * @returns {string}
 */
function toSnakeCase(str) {
    if (!str) return '';
    return str
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/\s+/g, '_')
        .toLowerCase();
}

/**
 * Removes all whitespace from a string.
 * @param {string} str
 * @returns {string}
 */
function removeWhitespace(str) {
    if (!str) return '';
    return str.replace(/\s+/g, '');
}

module.exports = {
    capitalize,
    reverseString,
    isPalindrome,
    countWords,
    truncate,
    toKebabCase,
    toSnakeCase,
    removeWhitespace
};