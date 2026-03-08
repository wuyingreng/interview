import { watch, reactive } from 'vue'

export const person = reactive({ name: '张三', age: 18 })
export const changeName = () => {
  person.name += '~'
}
export const changeAge = () => {
  person.name += 1
}
export const changePerson = () => {
  /**
   * 对象的地址没有改变，只是值的覆盖了。
   * 如果目标对象与源对象具有相同的键（属性名），则目标对象中的属性将被源对象中的属性覆盖，
   * 后面的源对象的属性将类似地覆盖前面的源对象的同名属性。
   * */
  Object.assign(person, { name: '李四', age: 20 })
}
// 如果只是属性改变的话，preVal和newVal 是一个东西。如果都是一样的话，感觉没有什么作用
export const watchPerson = watch(
  person,
  (preVal, newVal) => {
    console.log('preVal==>', preVal, 'newVal==>', newVal)
    // 自动开启深度监听，写false也是没有作用的
  },
  { deep: false },
)
