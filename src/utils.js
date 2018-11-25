/**
 * Datamapper JS returns async iterators for speed, but AWS can't handle those uncompiled.
 * This little util wraps them, and returns the first value that matches, exiting pre-done.
 *
 * @param {AsyncIterableIterator} asyncIterable - Async iterator, resolves to value & done on next
 * @param {Number} count - limiter of iterations able to be tried
 * @returns {Object} the first matching result of the async iterator query
 */
const getFirst = async (asyncIterable, count = 5000) => {
  let iterations = 0;
  let result = null;

  const iterator = asyncIterable[Symbol.asyncIterator]();

  while (iterations < count) {
    const { value, done } = await iterator.next();

    if (value) {
      result = value;
    }

    if (done || result) break;
    iterations += 1;
  }

  return result;
};

/**
 * This is the same as `getFirst` but iterates All matches until done, and returns them all
 *
 * @param {AsyncIterableIterator} asyncIterable - Async iterator, resolves to value & done on next
 * @param {Number} count - limiter of iterations able to be tried
 * @returns {Object[]} all matching results
 */
const getAll = async (asyncIterable, count = 5000) => {
  const result = [];
  const iterator = asyncIterable[Symbol.asyncIterator]();

  while (result.length < count) {
    const { value, done } = await iterator.next();
    if (done) break;
    result.push(value);
  }

  return result;
};

module.exports = {
  getFirst,
  getAll,
};
