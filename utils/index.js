/**
 * @param {Array} [sorting=[]]
 * @return {String}
 */
export function serializeSorting(sorting = []) {
  return (sorting || []).map(([field, dir]) => {
    return dir === 'desc' ? `-${field}` : field;
  }).join(',');
}

/**
 * @param {string} [sortingString='']
 * @returns {Array}
 */
export function unserializeSorting(sortingString = '') {
  return parseStringFromQS(sortingString, '')
    .split(',')
    .filter(Boolean)
    .map((it) => {
      return it.slice(0, 1) === '-'
        ? [it.slice(1), 'desc']
        : [it, 'asc'];
    });
}

/**
 * @param val
 * @param {Number} [def]
 * @return {Number|undefined}
 */
export function parseNumberFromQS(val, def) {
  if (typeof val === 'string' && !val.trim()) return def;

  const num = +val;
  return !isNaN(num) ? num : def;
}

/**
 * @param val
 * @param {String} [def]
 * @return {String|undefined}
 */
export function parseStringFromQS(val, def) {
  if (typeof val === 'string' && !val.trim()) return def;

  return val !== null ? String(val).trim() : def;
}
