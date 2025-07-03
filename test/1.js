function longestCommonSubsequence(text1, text2) {
  // write code here
  const result = ''
  for (const index in text1) {
    const text1str = text1[index];
    console.log('text1str==>', text1str)
    const str2 = text2;
    for (const j in text2) {
      if (text1str === text2[j]) {
        result += text2[j]
      }
    }

  }
}
longestCommonSubsequence("abcde", "ace")
// "abcde", "ace"  3

// "abc", "abc" 3

// "abc", "def"  0