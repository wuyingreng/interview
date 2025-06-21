const json = {
  a: { b: { c: 1 } },
  d: [1, 2, 3]
}

const dfs = (root, path) => {
  if (!root) return;
  console.log('root=>', root, path);
  Object.keys(root).forEach((key) => {
    console.log('key', key);
    // 注意这里不能用path.push因为返回值是个新数组的长度。而我需要的是个数组。
    dfs(root[key], path.concat(key))
  })
}
dfs(json, [])