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


export const watchCar2 = watch([()=>person.car,()=>person.name],(preVal,newVal) => {
    console.log('watchCar2 preVal==>',preVal,'newVal==>',newVal)
    
},{deep:true})