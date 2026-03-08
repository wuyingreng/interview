<template>
  <div class="v-html-demo">
    <h2>问题2：不能使用 v-html 来拼接组合模板是什么意思？</h2>

    <div class="explanation-box">
      <p class="explanation">
        Vue 不是基于字符串的模板引擎，不能通过拼接 HTML 字符串来组合组件。
        <strong>应该使用组件系统来构建和组合 UI。</strong>
      </p>
    </div>

    <!-- 错误示例 -->
    <section class="demo-section error-section">
      <h3>❌ 错误示例：尝试用字符串拼接"组件"</h3>
      <div class="demo-box">
        <h4>错误的思路：</h4>
        <div class="code-example">
          <pre><code>// ❌ 错误：尝试通过字符串拼接来组合组件
const htmlContent = `
  &lt;div class="card"&gt;
    &lt;MyComponent :prop="value" /&gt;
    &lt;h3&gt;{{ title }}&lt;/h3&gt;
    &lt;p&gt;{{ content }}&lt;/p&gt;
  &lt;/div&gt;
`

// 在模板中使用
&lt;div v-html="htmlContent"&gt;&lt;/div&gt;</code></pre>
        </div>
        <h4>实际效果：</h4>
        <div class="result error-result">
          <div v-html="attemptedComponentString"></div>
          <p class="warning-note">
            ❌ <strong>失败原因</strong>：<br>
            1. MyComponent 不会被解析为 Vue 组件<br>
            2. {{ title }} 和 {{ content }} 不会被解析<br>
            3. 只会显示为纯 HTML 文本字符串
          </p>
        </div>
      </div>
    </section>

    <!-- 正确示例 -->
    <section class="demo-section success-section">
      <h3>✅ 正确示例：使用组件系统</h3>
      <div class="demo-box">
        <h4>正确的做法：</h4>
        <div class="code-example">
          <pre><code>// ✅ 正确：使用 Vue 组件系统
&lt;template&gt;
  &lt;div class="card"&gt;
    &lt;MyComponent :prop="value" /&gt;
    &lt;h3&gt;{{ title }}&lt;/h3&gt;
    &lt;p&gt;{{ content }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
        <h4>实际效果：</h4>
        <div class="result success-result">
          <div class="card">
            <SimpleComponent :message="'这是通过组件传递的消息'" />
            <h3>{{ title }}</h3>
            <p>{{ content }}</p>
          </div>
          <p class="success-note">
            ✅ <strong>成功原因</strong>：<br>
            1. SimpleComponent 正常渲染为 Vue 组件<br>
            2. {{ title }} 和 {{ content }} 正确解析<br>
            3. 支持响应式和所有 Vue 特性
          </p>
        </div>
      </div>
    </section>

    <!-- 详细对比 -->
    <section class="demo-section comparison-section">
      <h3>📊 详细对比：字符串拼接 vs 组件组合</h3>
      
      <div class="comparison-container">
        <!-- 错误方式 -->
        <div class="comparison-card wrong-way">
          <div class="card-header">
            <span class="icon">❌</span>
            <h4>错误方式（基于字符串）</h4>
          </div>
          <div class="code-example-small">
            <pre><code>// 错误：字符串拼接
const template = `
  &lt;div class="card"&gt;
    &lt;h3&gt;{{ title }}&lt;/h3&gt;
    &lt;p&gt;{{ content }}&lt;/p&gt;
    &lt;MyComponent :prop="value" /&gt;
  &lt;/div&gt;
`
&lt;div v-html="template"&gt;&lt;/div&gt;</code></pre>
          </div>
          <div class="problems-list">
            <h5>存在的问题：</h5>
            <ul>
              <li>❌ {{ title }} 和 {{ content }} 不会被解析</li>
              <li>❌ MyComponent 不会被渲染为组件</li>
              <li>❌ 无法使用 Vue 的响应式特性</li>
              <li>❌ 无法使用 Vue 指令（v-if、v-for 等）</li>
              <li>❌ 没有类型检查</li>
              <li>❌ 无法享受 Vue 的编译优化</li>
              <li>⚠️ 存在 XSS 安全风险</li>
            </ul>
          </div>
        </div>

        <!-- 正确方式 -->
        <div class="comparison-card right-way">
          <div class="card-header">
            <span class="icon">✅</span>
            <h4>正确方式（基于组件）</h4>
          </div>
          <div class="code-example-small">
            <pre><code>// 正确：使用组件
&lt;template&gt;
  &lt;div class="card"&gt;
    &lt;h3&gt;{{ title }}&lt;/h3&gt;
    &lt;p&gt;{{ content }}&lt;/p&gt;
    &lt;MyComponent :prop="value" /&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
          </div>
          <div class="advantages-list">
            <h5>优势：</h5>
            <ul>
              <li>✅ 完整的响应式支持</li>
              <li>✅ 组件可以正常渲染和复用</li>
              <li>✅ 享受 Vue 编译时优化</li>
              <li>✅ 类型检查和工具支持</li>
              <li>✅ 支持所有 Vue 指令</li>
              <li>✅ 更好的性能和用户体验</li>
              <li>✅ 默认 XSS 防护</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 实际应用场景 -->
    <section class="demo-section use-case-section">
      <h3>💡 实际应用场景对比</h3>
      
      <div class="use-case-box">
        <h4>场景：动态渲染商品卡片列表</h4>
        
        <div class="use-case-comparison">
          <div class="use-case-item wrong">
            <h5>❌ 错误做法（字符串拼接）</h5>
            <div class="code-example-small">
              <pre><code>// 错误：字符串拼接
const generateCards = (products) => {
  return products.map(p => `
    &lt;div class="product-card"&gt;
      &lt;img src="${p.image}" /&gt;
      &lt;h3&gt;${p.name}&lt;/h3&gt;
      &lt;p&gt;¥${p.price}&lt;/p&gt;
      &lt;button @click="addToCart(${p.id})"&gt;
        加入购物车
      &lt;/button&gt;
    &lt;/div&gt;
  `).join('')
}

&lt;div v-html="generateCards(products)"&gt;&lt;/div&gt;</code></pre>
            </div>
            <div class="issues">
              <p><strong>问题：</strong></p>
              <ul>
                <li>@click 事件不会生效</li>
                <li>如果 products 更新，不会自动重新渲染</li>
                <li>没有组件复用</li>
              </ul>
            </div>
          </div>

          <div class="use-case-item right">
            <h5>✅ 正确做法（组件系统）</h5>
            <div class="code-example-small">
              <pre><code>// 正确：使用组件
&lt;template&gt;
  &lt;div v-for="product in products" :key="product.id"&gt;
    &lt;ProductCard 
      :product="product"
      @add-to-cart="handleAddToCart"
    /&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
            </div>
            <div class="benefits">
              <p><strong>优势：</strong></p>
              <ul>
                <li>事件正常触发</li>
                <li>响应式更新，products 变化自动渲染</li>
                <li>组件可复用，易于维护</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section class="demo-section summary-section">
      <h3>📝 总结</h3>
      <div class="summary-box">
        <div class="key-points">
          <h4>核心要点：</h4>
          <ol>
            <li>
              <strong>Vue 不是字符串模板引擎</strong>：
              Vue 会将模板编译成虚拟 DOM，而不是简单的字符串替换
            </li>
            <li>
              <strong>v-html 的局限性</strong>：
              v-html 只能渲染纯 HTML，不能解析 Vue 语法和组件
            </li>
            <li>
              <strong>组件是 UI 组合的基本单元</strong>：
              应该使用组件系统来构建和组合 UI，而不是字符串拼接
            </li>
            <li>
              <strong>动态组件的正确方式</strong>：
              如果需要动态组件，使用 <code>&lt;component :is="..."&gt;</code> 
              或条件渲染 <code>v-if</code>
            </li>
          </ol>
        </div>
        
        <div class="recommendation">
          <h4>推荐做法：</h4>
          <ul>
            <li>✅ 使用组件系统构建 UI</li>
            <li>✅ 使用 v-for 渲染列表</li>
            <li>✅ 使用 v-if/v-show 条件渲染</li>
            <li>✅ 使用 &lt;component :is&gt; 动态组件</li>
            <li>❌ 避免使用 v-html 拼接模板</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts" name="问题2-拼接组合模板">
import { ref } from 'vue'
import SimpleComponent from './SimpleComponent.vue'

// 错误示例：尝试拼接组件
const attemptedComponentString = ref(`
  <div style="padding: 15px; background: #fff1f0; border: 2px dashed #ff4d4f; border-radius: 6px;">
    <p style="color: #cf1322; margin: 0 0 10px 0;"><strong>❌ 尝试拼接组件的结果：</strong></p>
    <p style="margin: 5px 0; color: #cf1322;">
      &lt;MyComponent :prop="value" /&gt;
    </p>
    <p style="margin: 5px 0; color: #cf1322;">
      {{ title }}
    </p>
    <p style="margin: 5px 0; color: #cf1322; font-size: 12px;">
      这些都不会被解析，只会显示为纯文本！
    </p>
  </div>
`)

// 正确示例的数据
const title = ref('正确的标题')
const content = ref('这是通过 Vue 组件系统正确渲染的内容，支持响应式更新！')
</script>

<style scoped>
.v-html-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #2c3e50;
  border-bottom: 3px solid #42b983;
  padding-bottom: 10px;
  margin-bottom: 30px;
}

.explanation-box {
  background: #e8f5e9;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  border-left: 4px solid #4caf50;
}

.explanation {
  margin: 0;
  line-height: 1.8;
  color: #2e7d32;
}

.explanation code {
  background: #c8e6c9;
  padding: 2px 6px;
  border-radius: 3px;
}

.demo-section {
  margin: 30px 0;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #42b983;
}

.demo-section.error-section {
  background: #fff1f0;
  border-left-color: #ff4d4f;
}

.demo-section.success-section {
  background: #f6ffed;
  border-left-color: #52c41a;
}

.demo-section.comparison-section {
  background: #fff3e0;
  border-left-color: #ff9800;
}

.demo-section.use-case-section {
  background: #e3f2fd;
  border-left-color: #2196f3;
}

.demo-section.summary-section {
  background: #f3e5f5;
  border-left-color: #9c27b0;
}

h3 {
  color: #2c3e50;
  margin-top: 0;
  font-size: 1.3em;
}

.demo-box {
  margin: 20px 0;
  padding: 20px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.demo-box h4 {
  color: #42b983;
  margin: 15px 0 10px 0;
}

.code-example {
  background: #263238;
  color: #aed581;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 15px 0;
}

.code-example pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.code-example-small {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 10px 0;
  border-left: 3px solid #42b983;
}

.code-example-small pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: #2c3e50;
}

.result {
  margin: 15px 0;
  padding: 15px;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.error-result {
  border: 2px solid #ff4d4f;
  background: #fff1f0;
}

.success-result {
  border: 2px solid #52c41a;
  background: #f6ffed;
}

.card {
  padding: 15px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card h3 {
  color: #2c3e50;
  margin: 10px 0;
}

.warning-note,
.success-note {
  padding: 12px;
  border-radius: 6px;
  margin-top: 15px;
  line-height: 1.8;
}

.warning-note {
  color: #cf1322;
  background: #fff1f0;
  border-left: 3px solid #ff4d4f;
}

.success-note {
  color: #389e0d;
  background: #f6ffed;
  border-left: 3px solid #52c41a;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.comparison-card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.wrong-way {
  background: #fff1f0;
  border: 2px solid #ff4d4f;
}

.right-way {
  background: #f6ffed;
  border: 2px solid #52c41a;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid currentColor;
}

.card-header .icon {
  font-size: 24px;
}

.wrong-way .card-header {
  color: #cf1322;
  border-bottom-color: #ff4d4f;
}

.right-way .card-header {
  color: #389e0d;
  border-bottom-color: #52c41a;
}

.problems-list,
.advantages-list {
  margin-top: 15px;
}

.problems-list h5,
.advantages-list h5 {
  margin: 10px 0;
  color: #2c3e50;
}

.problems-list ul,
.advantages-list ul {
  margin: 0;
  padding-left: 20px;
}

.problems-list li,
.advantages-list li {
  margin: 8px 0;
  line-height: 1.6;
}

.use-case-box {
  background: white;
  padding: 20px;
  border-radius: 6px;
  margin-top: 15px;
}

.use-case-box h4 {
  color: #2196f3;
  margin-top: 0;
}

.use-case-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 15px;
}

.use-case-item {
  padding: 15px;
  border-radius: 6px;
}

.use-case-item.wrong {
  background: #fff1f0;
  border: 2px solid #ff4d4f;
}

.use-case-item.right {
  background: #f6ffed;
  border: 2px solid #52c41a;
}

.use-case-item h5 {
  margin-top: 0;
  color: #2c3e50;
}

.issues,
.benefits {
  margin-top: 10px;
}

.issues ul,
.benefits ul {
  margin: 8px 0 0 0;
  padding-left: 20px;
}

.issues li,
.benefits li {
  margin: 5px 0;
  line-height: 1.6;
}

.summary-box {
  background: white;
  padding: 20px;
  border-radius: 6px;
  margin-top: 15px;
}

.key-points,
.recommendation {
  margin: 20px 0;
}

.key-points h4,
.recommendation h4 {
  color: #9c27b0;
  margin-bottom: 10px;
}

.key-points ol,
.recommendation ul {
  margin: 0;
  padding-left: 25px;
}

.key-points li,
.recommendation li {
  margin: 12px 0;
  line-height: 1.8;
  color: #2c3e50;
}

.summary-box code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  color: #e83e8c;
}

@media (max-width: 768px) {
  .comparison-container,
  .use-case-comparison {
    grid-template-columns: 1fr;
  }

  .v-html-demo {
    padding: 15px;
  }
}
</style>

