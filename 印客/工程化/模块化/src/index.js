// 测试两种 CSS 导入方式

// 方式1：命名导入 - 获取 CSS 内容
import css from './global.css';
console.log('方式1 - CSS 内容:', css);
console.log('方式1 - CSS 类型:', typeof css);
import doc from './doc.md'
// 方式2：副作用导入 - 只应用样式
// import './global.css';
// console.log('方式2 - 样式已应用到页面');

// 演示 CSS 内容的使用
// console.log('CSS 内容长度:', css.length);
// console.log('CSS 内容前50个字符:', css.substring(0, 50));

// 没有style-loader需要手动的写
// let style = document.createElement('style');
// style.innerText = css[0][1];
// console.log('style==>', style)
// document.head.appendChild(style);

const name = 'Emily';
const sayHello = () => {
  console.log('i am emily')
}
console.log(sayHello())
const renderMd = () => {
  console.log('doc==>', typeof doc)
  const app = document.getElementById('app');
  const div = document.createElement('div');
  div.innerHTML = doc;
  app.appendChild(div)
}
renderMd()