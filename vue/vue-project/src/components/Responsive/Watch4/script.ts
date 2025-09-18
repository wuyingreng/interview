import { watch, reactive } from 'vue'

export const person = reactive({name:'张三',age:18,car:{
  car1:"奔驰",
  car2:"宝马"
}});
export const changeName=()=>{
  person.name+='~'
}
export const changeAge=()=>{
  person.age+=1
}
export const changeCar1=()=>{
  person.car.car1='奥迪'
}
export const changeCar2=()=>{
  person.car.car2='大众'
}

export const changeCar=()=>{
  // 整个person不可以一次性改，但是里面的东西可以改
  person.car={
     car1:"雅迪",
     car2:"艾玛"
  }
}
/**
 * 如果只是属性改变的话，preVal和newVal 是一个东西。如果都是一样的话，感觉没有什么作用
 * 
 * */ 
export const watchPerson = watch(()=>person.name,(preVal,newVal) => {
    console.log('preVal==>',preVal,'newVal==>',newVal)
},{deep:false})


// 这么写只能监视car里面的属性变化，比如点击更改第一台车，第二台车。整个car被替换了触发不了
export const watchCar = watch(person.car,(preVal,newVal) => {
    console.log(' watchCar preVal==>',preVal,'newVal==>',newVal)  
})

// 这么写整个car的替换可以监控到，但是比如点击更改第一台车，第二台车监视不了。
export const watchCar1 = watch(()=>person.car,(preVal,newVal) => {
    console.log('watchCar1 preVal==>',preVal,'newVal==>',newVal)
    
})

/**
 *  完美解决方案
 * 这么写整个car的替换可以监控到，但是比如点击更改第一台车，第二台车也能监视到。
 * */
export const watchCar2 = watch(()=>person.car,(preVal,newVal) => {
    console.log('watchCar1 preVal==>',preVal,'newVal==>',newVal)
    
},{deep:true})