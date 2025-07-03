/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = [];
  const backTrack = (path) => {
    if (path.length === nums.length) {
      return res.push(path)
    }
    nums.forEach((e) => {
      console.log('path', path, 'e', e)
      if (path.includes(e)) {
        return
      } else {
        path = path.concat(e)
        console.log('path after', path, e)
        backTrack(path.concat(e))
      }
    })
  }
  backTrack([])
  return res
};

permute([0, 1])