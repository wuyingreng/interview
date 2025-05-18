const snabbdom = window.snabbdom

// 定义 patch
const patch = snabbdom.init([
    snabbdom_class,
    snabbdom_props,
    snabbdom_style,
    snabbdom_eventlisteners
])

/*** --------- 开始生成VDOM ------------*/
// 定义 h
const h = snabbdom.h

const container = document.getElementById('container')

// 生成 vnode
let vnode = h('ul#list', {}, [
    h('li.item', {}, 'Item 1'),
    h('li.item', {}, 'Item 2')
])
console.log('timenow==>', new Date())
/*** --------- VDOM到真实的DOM ------------*/
patch(container, vnode)
console.log('timenow==>', new Date())
document.getElementById('btn-change').addEventListener('click', () => {
    // 生成 newVnode
    const newVnode = h('ul#list', {}, [
        h('li.item', {}, 'Item 1'),
        h('li.item', {}, 'Item B'),
        h('li.item', {}, 'Item 3')
    ])
    patch(vnode, newVnode)
    // 前后是一样的，多次点击后面的就无效了
    vnode = newVnode // patch 之后，应该用新的覆盖现有的 vnode ，否则每次 change 都是新旧对比
})
