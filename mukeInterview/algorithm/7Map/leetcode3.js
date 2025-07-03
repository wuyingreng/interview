var lengthOfLongestSubstring = function (s) {
  let l = 0;
  // 这个res是用来什么的呢？
  let res = 0;
  const map = new Map();
  // 字符串遍历
  for (let r = 0; r < s.length; r++) {
    // map.get(s[r]) 没有看懂
    if (map.has(s[r]) && map.get(s[r]) > 1) {
      l = map.get(s[r]) + 1;
      res = Math.max(res, res - l + 1);
      map.set(s[r], r)
    }
  }
  return res
};

lengthOfLongestSubstring("abcabcbb")