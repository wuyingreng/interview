import { watch, ref } from 'vue'

export const person = ref({name:'张三',age:18});
export const changeName=()=>{
  person.value.name+='~'
}
export const changeAge=()=>{
  person.value.name+=1
}
export const changePerson=()=>{
  person.value={name:'李四',age:20}
}
// 如果只是属性改变的话，preVal和newVal 是一个东西。如果都是一样的话，感觉没有什么作用
export const watchPerson = watch(person,(preVal,newVal) => {
    console.log('preVal==>',preVal,'newVal==>',newVal)
},{deep:true})