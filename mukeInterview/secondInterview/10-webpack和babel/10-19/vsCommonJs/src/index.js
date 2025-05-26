// 引入 css
import './style/style1.css'
import './style/style2.less'
import { sum } from './math.js'
import _ from 'lodash'
console.log(_.each)

console.log('window.ENV', ENV)

const print = (info) => {
    console.log(info)
}
print('hello webpack 5')


/**
 * 增加，开启热更新之后的代码逻辑
 * './math' 是监听范围之内的东西，修改./match里面的东西
 * 会发现页面没有重载，sumRes in hot 重新计算了
*/
// // 
if (module.hot) {
    module.hot.accept(['./math'], () => {
        const sumRes = sum(10, 30)
        console.log('sumRes in hot', sumRes)
    })
}


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



if (isDev) {
    import apiList from '../config/api.js'
}
// 编译时报错，只能静态引入import apiList from'../config/api dev.js
