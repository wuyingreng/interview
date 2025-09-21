<template>
  <div class="father">
    <h3>父组件</h3>

    <h4>{{ password }}</h4>
    <div>
      <!-- v-model用在html标签上 -->
      <span>defineModal实现的v-modal:</span>
      <h4>{{ usernameDefineModal }}</h4>
      <input type="text" v-model="usernameDefineModal" />
      <br />
    </div>

    <div>
      <span>v3.4以前的版本</span>
      <h4>{{ username }}</h4>
      <input type="text" v-model="username" />
    </div>

    <div>
      <span>等同于:value+@input的写法</span>
      <h4>{{ usernameOrigin }}</h4>
      <input
        type="text"
        :value="usernameOrigin"
        @input="usernameOrigin = (<HTMLInputElement>$event.target).value"
      />
    </div>
    <!-- <input type="text" :value="username" @input="username = (<HTMLInputElement>$event.target).value"> -->

    <!-- v-model用在组件标签上 -->
    <!-- <AtguiguInput v-model="username"/> -->
    <!-- <AtguiguInput 
      :modelValue="username" 
      @update:modelValue="username = $event"
    /> -->

    <div>
      <div>v-modal组件形式</div>
      <div>{{ usernameDefineModalCom }}</div>
      <div>{{ password }}</div>
      <!-- 修改modelValue -->
      <AtguiguInput v-model:ming="usernameDefineModalCom" v-model:mima="password" />
    </div>
  </div>
</template>

<script setup lang="ts" name="Father">
  import { ref } from 'vue'
  import AtguiguInput from './AtguiguInput.vue'
  // 数据
  let username = ref('zhansgan')
  let usernameOrigin = ref('zhansgan')
  let usernameDefineModal = ref('zhansgan')
  let password = ref('123456')
  let usernameDefineModalCom = ref('zhansgan')
</script>

<style scoped>
  .father {
    padding: 20px;
    background-color: rgb(165, 164, 164);
    border-radius: 10px;
  }
</style>
