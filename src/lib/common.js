'use strict';
export function change_alias(alias) {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    str = str.replace(/\s/g, "_");
    return str;
}

/**
 *
 * @param {number} size
 * @returns {number[]}
 */

export function rangeArr(size) {
    if (Number.isInteger(size))
        return Array.from(Array(size).keys());
    throw new Error("Size must be an integer!");
}

/**
 *
 * @param {Array<*>} array
 * @returns {[*]}
 */

export function returnUnique(array) {
    if(!Array.isArray(array))
        throw new Error("Input must be an array!");
    if (array.some(el => !['string', 'number'].includes(typeof el)))
        throw new Error("Input must be an array of string or number!");
    return Array.from(new Set(array));
}