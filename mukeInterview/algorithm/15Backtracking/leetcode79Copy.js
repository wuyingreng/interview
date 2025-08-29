function exist(board, word) {
  if (!board || board.length === 0 || !word) return false;
  const rows = board.length;
  const cols = board[0].length;
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [-1, 0]
  ];
  function backtrack(row, col, index, visited) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
    if (visited[row][col]) return false;
    if (board[row][col] !== word[index]) return false;
    //  4. 找到完整单词
    if (index === word.length - 1) return true
    visited[row][col] = true;
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = row + dy;
      if (backtrack(newRow, newCol, index + 1, visited)) {
        return true;
      }
    };
    // ? 这里没有看懂，为什么又要设置为false呢
    visited[row][col] = false;
    return false;
  };

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < cols.length; col++) {
      const visited = Array(rows).fill().map(() => Array(cols).fill(false));
      if (backtrack(row, col, 0, visited)) {
        return true;
      }

    }
  }
  return false
}