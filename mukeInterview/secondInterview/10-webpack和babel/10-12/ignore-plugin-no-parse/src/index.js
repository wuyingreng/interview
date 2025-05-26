// 引入 css
import './style/style1.css'

import _ from 'lodash'
console.log(_.each)

console.log('window.ENV', ENV)

const print = (info) => {
    console.log(info)
}
print('hello webpack 5')

import { sum } from './math.js'
const sumRes = sum(10, 20)
console.log('sumRes', sumRes)

// 引入图片
function insertImgElem(imgFile) {
    const img = new Image()
    img.src = imgFile
    document.body.appendChild(img)
}
import imgFile1 from './img/1.png'
insertImgElem(imgFile1)
import imgFile2 from './img/2.jpeg'
insertImgElem(imgFile2)
// 动态懒加载


// 引入动态数据- 懒加载

setTimeout(() => {
    import('./dynamic-data.js').then((res) => {
        console.log('res.default.message==>', res.default.message)
    })
}, 1500)


import moment from 'moment';
// moment.locale('zh-cn')//设置语言为中文

// 手动引入中文语言包
import 'moment/locale/zh-cn';

console.log('locale', moment.locale())
console.log('date', moment().format('ll'))// 2020年xx月xx日