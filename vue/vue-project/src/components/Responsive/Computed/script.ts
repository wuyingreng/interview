import { computed, ref } from 'vue'

export const firstName = ref('')
export const lastName = ref('')
export const fullName = computed(() => {
  return `${firstName.value}-${lastName.value}`
})


export const count=ref(2);
export const alwasySmall=computed({
  get(previous){
    console.log('count==>',count)
    if(count.value<=10){
      return count.value
    }
    return previous
  },
  set(newValue:number){
    console.log('newValue==>',newValue)
    count.value= newValue*2
  }
})