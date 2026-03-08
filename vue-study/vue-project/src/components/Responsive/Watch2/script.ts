import { watch, ref } from 'vue'

export const person = ref({ name: '张三', age: 18 })
export const changeName = () => {
  person.value.name += '~'
}
export const changeAge = () => {
  person.value.name += 1
}
export const changePerson = () => {
  // 只要对象地址改变了，这两种都会触发
  // person.value = { name: '李四', age: 20 }
  person.value = { name: '张三', age: 18 }
}

// 如果只是属性改变的话，preVal和newVal 是一个东西。如果都是一样的话，感觉没有什么作用
export const watchPerson = watch(
  person,
  (preVal, newVal) => {
    console.log('preVal==>', preVal, 'newVal==>', newVal)
  },
  /*
  * 不加true的会只监视第一层，就是shadowRef一起理解，只监视整个地址改变。属性改变是进入不了里面的回调导函数的
  **/
  { deep: true },
)
