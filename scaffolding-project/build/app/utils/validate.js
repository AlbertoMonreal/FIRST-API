"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidString = void 0;
function isValidString(s, { minLength, maxLength }) {
    if (typeof s !== 'string') {
        return false;
    }
    if (minLength && minLength > s.length)
        return false;
    if (maxLength && maxLength < s.length)
        return false;
    return true;
}
exports.isValidString = isValidString;
