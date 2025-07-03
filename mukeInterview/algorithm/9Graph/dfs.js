const graph = require('./graph');

const visited = new Set();
const dfs = function (n) {
  console.log(n);
  // 表示已经访问过了
  visited.add(n);
  graph[n].forEach(c => {
    if (!visited.has(c)) {
      dfs(c)
    }
  });
}

dfs(2)