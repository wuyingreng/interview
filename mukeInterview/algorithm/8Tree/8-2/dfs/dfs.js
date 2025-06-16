
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
   * forEach在空数组上不会执行任何操作。调用栈就往上一层走了
   * 遍历是为了访问，所以要打印console.log
  */
  console.log('root.val==>', root, root.val)
  return root.children.forEach(dfs);
}

const emptyChildrenTree = {
  val: 'a',
  children: []
}
dfs(emptyChildrenTree)