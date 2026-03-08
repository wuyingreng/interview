import { watch, ref } from 'vue'

export const sum = ref(0)
export const changeSum = () => {
  sum.value += 1
}
export const watchSum = watch(sum, (sum, preSum) => {
  console.log('我正在监视sum==>', sum, 'preSum==>', preSum)
  if (sum >= 10) {
    watchSum()
  }
})
