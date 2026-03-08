import {reactive} from 'vue'
import {defineStore} from 'pinia'
  import axios from 'axios'
  import { nanoid } from 'nanoid'
// export const useLoveTalkStore=defineStore('loveTalk',{
//   state:()=>{
//     return {
//       talkList:localStorage.getItem('talkList')?JSON.parse(localStorage.getItem('talkList') as string):[]
//     }
//   },
//   actions:{
//     // 在对象里面写函数是不需要加function 了
//      async  getLoveTalk() {
//     // 发请求，下面这行的写法是：连续解构赋值+重命名
//     let {
//       data: { content: title },
//     } = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
//     // 把请求回来的字符串，包装成一个对象
//     let obj = { id: nanoid(), title }
//     // 放到数组中
//     this.talkList.unshift(obj)
//   }
//   }
// })


export const useLoveTalkStore=defineStore('loveTalk',()=>{
  const talkList=reactive(localStorage.getItem('talkList')?JSON.parse(localStorage.getItem('talkList') as string):[])
// 在对象里面写函数是不需要加function 了
    const getLoveTalk = async  () =>{
    // 发请求，下面这行的写法是：连续解构赋值+重命名
    let {
      data: { content: title },
    } = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
    // 把请求回来的字符串，包装成一个对象
    let obj = { id: nanoid(), title }
    // 放到数组中
    talkList.unshift(obj)
  }
  return {talkList,getLoveTalk}
})