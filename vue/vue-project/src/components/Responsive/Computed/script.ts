import { computed, ref } from 'vue'

export const firstName = ref('')
export const lastName = ref('')
export const fullName = computed(() => {
  return `${firstName.value}-${lastName.value}`
})