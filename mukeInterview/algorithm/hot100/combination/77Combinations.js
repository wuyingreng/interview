/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const res = [];
  const backTracking = (path, startIndex) => {
    if (path.length === k) {
      return res.push(path)
    }
    for (let i = startIndex; i <= n - (k - path.length) + 1; i++) {
      backTracking(path.concat(i), i + 1)
    }
  }

  backTracking([], 1)
  return res
};
combine(4, 2)