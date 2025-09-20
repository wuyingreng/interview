import { defineStore } from 'pinia'

export const useCountStore = defineStore('counter', {
  state:()=>{
    return {
          sum:6
        }
      },
  actions:{
    /*
     * mukeInterview/一面/6ScopeClosures/6-4/this.js
    * 这里面涉及到对象里面的普通函数的this是对象本身
    * 这里的对象actions的
    * 对象里面可以放普通的函数
     * 
     * **/
  
      increment(value:number) {
        console.log('this==>',this)
      this.sum+=value
    },
  }
})
