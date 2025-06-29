// Utility functions for the resources project

function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

module.exports = {
    capitalize,
    reverseString
};