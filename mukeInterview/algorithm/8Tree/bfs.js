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

const simpleTree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [

      ]
    },
    {
      val: 'e',
      children: [

      ]
    }
  ]
}
// 用simpleTree方便理解一点
const bfs = (root) => {
  const q = [];
  q.push(root)
  while (q.length > 0) {
    const n = q.shift()
    console.log('n==>', n.val)
    n.children.forEach(children => {
      q.push(children)
    });
  }
}
bfs(tree)