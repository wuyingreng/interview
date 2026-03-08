1. 什么是临时DOM状态？
临时DOM状态是指直接存储在 DOM 元素上的状态，而不是通过 Vue 的数据绑定（如 v-model）管理的状态。
临时DOM状态示例：
使用原生 <input> 的 value 属性，且没有使用 v-model 绑定
用户在输入框中输入的内容（如果未绑定到 data）
元素的滚动位置
未绑定的 checkbox 的 checked 状态
非临时DOM状态（使用 v-model 绑定）：
使用 v-model="item.inputValue" 时，输入值存储在 Vue 的 data 中，不是临时DOM状态
即使没有 key，状态也能正确保持，因为状态在 Vue 的数据中管理
核心区别：
临时DOM状态：状态在 DOM 元素上，Vue 无法追踪
绑定状态：状态在 Vue 的 data 中，Vue 可以追踪和管理