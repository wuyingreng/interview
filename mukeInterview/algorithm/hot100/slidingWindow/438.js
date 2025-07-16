var findAnagrams = function (s, p) {
  if (s.length < p.length) return [];

  const result = [];
  const pCount = new Array(26).fill(0);
  const sCount = new Array(26).fill(0);

  // 计算p的字符频率
  for (let c of p) {
    pCount[c.charCodeAt() - 'a'.charCodeAt()]++;
  }

  // 初始化第一个窗口
  for (let i = 0; i < p.length; i++) {
    sCount[s[i].charCodeAt() - 'a'.charCodeAt()]++;
  }

  // 检查第一个窗口
  if (pCount.join() === sCount.join()) {
    result.push(0);
  }

  // 滑动窗口
  for (let i = p.length; i < s.length; i++) {
    // 添加新字符
    sCount[s[i].charCodeAt() - 'a'.charCodeAt()]++;
    // 移除旧字符
    sCount[s[i - p.length].charCodeAt() - 'a'.charCodeAt()]--;

    // 检查当前窗口
    if (pCount.join() === sCount.join()) {
      result.push(i - p.length + 1);
    }
  }

  return result;
};
s1 = "cbaebabacd", p1 = "abc"
console.log(findAnagrams(s1, p1))