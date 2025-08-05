import './global.css'
import doc from './doc.md'
import { } from 'lodash'

console.log(doc)
// console.log(css)

import { foo } from './demo'

const name = 'jiusi'

// 这个是style-loader要做的事情。这个要手写下。
// let style = document.createElement('style')
// style.innerText = css[0][1]
// document.head.appendChild(style)

const sayHello = () => {
  console.log('first message')

  return () => {
    console.log('test')
    console.log(foo())
  }
}

console.log(sayHello())

const renderMd = () => {
  const app = document.getElementById('app')
  const div = document.createElement('div')
  div.innerHTML = doc
  app.appendChild(div)
}

renderMd()
