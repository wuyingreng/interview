import {ref,computed} from 'vue'


export const useSum=()=>{
  const sum=ref(0);

  const addSum=()=>{
      sum.value+=1
  }
  let plusSum=computed(()=>sum.value*10)
  return {sum,addSum,plusSum}

}