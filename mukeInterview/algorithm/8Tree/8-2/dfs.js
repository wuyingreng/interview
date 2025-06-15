
const tree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        {
          val: 'c',
          children: [
            {
              val: 'd',
              children: []
            }
          ]
        }
      ]
    },
    {
      val: 'e',
      children: [
        {
          val: 'f',
          children: [
            {
              val: 'g',
              children: []
            }
          ]
        }
      ]
    }
  ]
}

const dfs = (root) => {
  /**
   * for each遇到空数组会自动退出
   * 遍历是为了访问，所以要打印console.log
  */
  console.log('root.val==>', root.val)
  return root.children.forEach(dfs);
}

const emptyChildrenTree = {
  val: 'a',
  children: []
}
dfs(emptyChildrenTree)