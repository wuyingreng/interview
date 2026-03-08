<template>
  <div class="v-html-demo">
    <h2>问题1：数据绑定将会被忽略是什么意思？</h2>

    <div class="explanation-box">
      <p class="explanation">
        在
        <code>v-html</code>
        中，Vue 会将内容作为纯 HTML 插入，不会进行响应式处理。
        <strong>
          即使 HTML 字符串中包含 Vue 模板语法（如 {{}}、v-if 等），也不会被解析和执行。
        </strong>
      </p>
    </div>

    <!-- 示例1：普通文本插值正常工作 -->
    <section class="demo-section">
      <h3>示例 1：普通文本插值（正常工作）</h3>
      <div class="demo-box">
        <h4>代码：</h4>
        <div class="code-example">
          <pre><code>&lt;!-- 普通文本插值 - 支持响应式 --&gt;
&lt;p&gt;{{ message }}&lt;/p&gt;
&lt;button @click="message = '消息已更新！'"&gt;更新消息&lt;/button&gt;</code></pre>
        </div>
        <h4>效果：</h4>
        <div class="result">
          <p>
            消息：
            <strong>{{ message }}</strong>
          </p>
          <button @click="message = '消息已更新！ ✅'">更新消息</button>
        </div>
        <p class="success-note">✅ 普通文本插值支持响应式，点击按钮后消息会更新</p>
      </div>
    </section>

    <!-- 示例2：v-html 中的数据绑定被忽略 -->
    <section class="demo-section">
      <h3>示例 2：v-html 中的数据绑定被忽略</h3>
      <div class="demo-box">
        <h4>代码：</h4>
        <div class="code-example">
          <pre><code>// HTML 字符串中包含 {{ message }}
const htmlWithBinding = `
  &lt;div&gt;
    &lt;p&gt;这是 v-html 渲染的内容&lt;/p&gt;
    &lt;p&gt;注意：{{ message }} 不会被解析&lt;/p&gt;
  &lt;/div&gt;
`

&lt;!-- v-html 中即使包含 {{ }} 也不会被解析 --&gt;
&lt;p v-html="htmlWithBinding"&gt;&lt;/p&gt;</code></pre>
        </div>
        <h4>效果：</h4>
        <div class="result">
          <p v-html="htmlWithBinding"></p>
        </div>
        <p class="warning-note">
          ⚠️
          <strong>关键发现</strong>
          ：上面的 HTML 中的
          <code>{{ message }}</code>
          被当作
          <strong>纯文本</strong>
          显示，而不是响应式的 Vue 插值！
          <br />
          即使你点击"更新消息"按钮，v-html 中的内容也不会改变。
        </p>
      </div>
    </section>

    <!-- 示例3：v-html 中的指令也被忽略 -->
    <section class="demo-section">
      <h3>示例 3：v-html 中的指令也被忽略</h3>
      <div class="demo-box">
        <h4>代码：</h4>
        <div class="code-example">
          <pre><code>// HTML 字符串中包含 Vue 指令
const htmlWithDirective = `
  &lt;div&gt;
    &lt;p v-if="showContent"&gt;这行内容不会显示&lt;/p&gt;
    &lt;p&gt;v-if 指令在 v-html 中无效&lt;/p&gt;
  &lt;/div&gt;
`

&lt;div v-html="htmlWithDirective"&gt;&lt;/div&gt;</code></pre>
        </div>
        <h4>效果：</h4>
        <div class="result">
          <div v-html="htmlWithDirective"></div>
        </div>
        <p class="warning-note">
          ⚠️
          <strong>关键发现</strong>
          ：
          <code>v-if="showContent"</code>
          被当作
          <strong>纯文本</strong>
          显示，不会执行 Vue 指令逻辑！
          <br />
          所有 Vue 指令（v-if、v-for、v-model 等）在 v-html 中都无效。
        </p>
      </div>
    </section>

    <!-- 示例4：动态更新对比 -->
    <section class="demo-section highlight-section">
      <h3>示例 4：动态更新对比</h3>
      <div class="demo-box">
        <h4>场景：尝试更新 v-html 中的内容</h4>
        <div class="interactive-demo">
          <div class="control-panel">
            <button @click="updateMessage">更新 message 变量</button>
            <p>
              当前 message 值：
              <strong>{{ message }}</strong>
            </p>
          </div>

          <div class="comparison-grid">
            <div class="comparison-item">
              <h5>普通插值（响应式）</h5>
              <div class="output-box responsive">
                <p>消息：{{ message }}</p>
              </div>
              <p class="note">✅ 内容会实时更新</p>
            </div>

            <div class="comparison-item">
              <h5>v-html（非响应式）</h5>
              <div class="output-box non-responsive" v-html="htmlWithDynamicContent"></div>
              <p class="note">❌ 内容不会更新（显示原始文本）</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section class="demo-section summary-section">
      <h3>📝 总结</h3>
      <div class="summary-box">
        <ul>
          <li>
            <strong>v-html 的本质</strong>
            ：直接将字符串作为 HTML 插入 DOM， 相当于调用
            <code>element.innerHTML = htmlString</code>
          </li>
          <!-- <li>
            <strong>数据绑定被忽略</strong>
            ：v-html 中的 {{}}、{{#each}} 等语法 都会被当作普通文本，不会进行 Vue 解析
          </li> -->
          <!-- <li>
            <strong>指令无效</strong>：v-if、v-for、v-model 等所有 Vue 指令
            在 v-html 中都不会被执行
          </li> -->
          <li>
            <strong>非响应式</strong>
            ：即使源数据改变，v-html 渲染的内容也不会自动更新 （除非重新设置整个 HTML 字符串）
          </li>
          <li>
            <strong>正确使用场景</strong>
            ：v-html 只适用于渲染纯 HTML 内容， 不适合用于 Vue 模板语法
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts" name="问题1-数据绑定忽略">
  import { ref, computed } from 'vue'

  // 普通响应式变量
  const message = ref('这是普通文本插值，支持响应式')

  // v-html 中的内容（包含 {{ }} 但不会被解析）
  const htmlWithBinding = ref(`
  <div style="padding: 12px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; margin: 10px 0;">
    <p style="margin: 0 0 8px 0;"><strong>这是 v-html 渲染的内容</strong></p>
    <p style="margin: 0; color: #856404;">
      注意：<code style="background: #ffe69c; padding: 2px 4px; border-radius: 2px;">{{ message }}</code> 
      不会被解析，会显示为纯文本
    </p>
  </div>
`)

  // v-html 中包含 Vue 指令
  const htmlWithDirective = ref(`
  <div style="padding: 12px; background: #f8d7da; border-left: 4px solid #dc3545; border-radius: 4px; margin: 10px 0;">
    <p style="margin: 0 0 8px 0; color: #721c24;">
      <code style="background: #f5c6cb; padding: 2px 4px; border-radius: 2px;">v-if="showContent"</code> 
      也不会被执行
    </p>
    <p style="margin: 0; color: #721c24;">
      Vue 指令在 v-html 中全部无效，只会显示为纯文本
    </p>
  </div>
`)

  // 动态内容对比
  const htmlWithDynamicContent = computed(
    () => `
  <div style="padding: 12px; background: #d1ecf1; border-left: 4px solid #0c5460; border-radius: 4px; margin: 10px 0;">
    <p style="margin: 0; color: #0c5460;">
      消息：<code style="background: #bee5eb; padding: 2px 4px; border-radius: 2px;">{{ message }}</code>
    </p>
    <p style="margin: 8px 0 0 0; font-size: 12px; color: #0c5460;">
      （这是 v-html 渲染的，{{ message }} 不会更新）
    </p>
  </div>
`,
  )

  // 更新消息
  const updateMessage = () => {
    message.value = `消息已更新！时间：${new Date().toLocaleTimeString()}`
  }
</script>

<style scoped>
  .v-html-demo {
    padding: 20px;
    max-width: 1000px;
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
    font-family: 'Courier New', monospace;
  }

  .demo-section {
    margin: 30px 0;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    border-left: 4px solid #42b983;
  }

  .demo-section.highlight-section {
    background: #fff3e0;
    border-left-color: #ff9800;
  }

  .demo-section.summary-section {
    background: #e3f2fd;
    border-left-color: #2196f3;
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
    font-size: 1.1em;
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

  .result {
    margin: 15px 0;
    padding: 15px;
    background: #fafafa;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    min-height: 50px;
  }

  .result button {
    margin-top: 10px;
    padding: 8px 16px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
  }

  .result button:hover {
    background: #35a372;
  }

  .success-note {
    color: #52c41a;
    background: #f6ffed;
    padding: 12px;
    border-radius: 6px;
    margin-top: 15px;
    border-left: 3px solid #52c41a;
  }

  .warning-note {
    color: #faad14;
    background: #fffbe6;
    padding: 12px;
    border-radius: 6px;
    margin-top: 15px;
    border-left: 3px solid #faad14;
    line-height: 1.8;
  }

  .warning-note code {
    background: #ffe58f;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }

  .interactive-demo {
    margin-top: 20px;
  }

  .control-panel {
    background: #e3f2fd;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 20px;
    text-align: center;
  }

  .control-panel button {
    padding: 10px 20px;
    background: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-right: 10px;
    transition: background 0.3s;
  }

  .control-panel button:hover {
    background: #1976d2;
  }

  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }

  .comparison-item {
    padding: 15px;
    background: white;
    border-radius: 6px;
    border: 2px solid #e0e0e0;
  }

  .comparison-item h5 {
    margin-top: 0;
    color: #42b983;
    text-align: center;
  }

  .output-box {
    padding: 15px;
    background: #f5f5f5;
    border-radius: 4px;
    min-height: 80px;
    margin: 10px 0;
  }

  .output-box.responsive {
    border: 2px solid #52c41a;
    background: #f6ffed;
  }

  .output-box.non-responsive {
    border: 2px solid #ff7875;
    background: #fff1f0;
  }

  .note {
    text-align: center;
    font-size: 12px;
    margin-top: 8px;
    padding: 6px;
    border-radius: 4px;
  }

  .summary-box {
    background: white;
    padding: 20px;
    border-radius: 6px;
    margin-top: 15px;
  }

  .summary-box ul {
    margin: 0;
    padding-left: 20px;
  }

  .summary-box li {
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
    .comparison-grid {
      grid-template-columns: 1fr;
    }

    .v-html-demo {
      padding: 15px;
    }
  }
</style>
