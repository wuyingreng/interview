const graph = require('./graph');


const bfs = (n) => {
  const visited = new Set();
  const q = [];
  q.push(n);
  visited.add(n)
  while (q.length) {
    const n = q.shift();
    console.log(n);
    graph[n].forEach(c => {
      if (!visited.has(c)) {
        q.push(c);
        // 入队的时候就放入集合中，防止重复读取
        visited.add(c)
      }

    });
  }
}

bfs(2)