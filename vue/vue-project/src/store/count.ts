import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 方式一：option store
// export const useCountStore = defineStore('counter', {
//   state:()=>{
//     return {
//           sum:6,
//           school:'尚硅谷',
//           adress:'北京'
//         }
//       },
//   actions:{
//     /*
//      * mukeInterview/一面/6ScopeClosures/6-4/this.js
//     * 这里面涉及到对象里面的普通函数的this是对象本身
//     * 这里的对象actions的
//     * 对象里面可以放普通的函数
//      * 
//      * **/
  
//       increment(value:number) {
//         console.log('this==>',this)
//       this.sum+=value
//     },
//   },
//   getters:{
//     plusSum(){
//      return this.sum*10
//     },
//     upperSchool(){
//       return this.school.toUpperCase()
//     }
//   }


// 方式二：Setup store
export const useCountStore = defineStore('counter', () => {
  // state 的所有属性都要全部抛出去
  const sum = ref(6)
  const school = ref('尚硅谷')
  const adress = ref('北京')

  // actions
  const increment = (value: number) => {
    console.log('increment called with:', value)
    sum.value += value
  }

  // getters
  const plusSum = computed(() => {
    return sum.value * 10
  })

  const upperSchool = computed(() => {
    return school.value.toUpperCase()
  })

  return {
    // state
    sum,
    school,
    adress,
    // actions
    increment,
    // getters
    plusSum,
    upperSchool
  }
})
