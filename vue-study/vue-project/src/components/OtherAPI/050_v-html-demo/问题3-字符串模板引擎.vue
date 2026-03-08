<template>
  <div class="v-html-demo">
    <h2>问题3：基于字符串的模板引擎有哪些？</h2>

    <div class="explanation-box">
      <p class="explanation">
        基于字符串的模板引擎通过<strong>字符串拼接/替换</strong>来生成 HTML，
        而不是像 Vue 那样编译成虚拟 DOM。这些引擎通常在服务端使用，
        或在旧的前端框架中使用。
      </p>
    </div>

    <!-- 常见的字符串模板引擎 -->
    <section class="demo-section">
      <h3>常见的基于字符串的模板引擎</h3>
      
      <div class="engines-grid">
        <!-- Handlebars -->
        <div class="engine-card">
          <div class="engine-header">
            <h4>1. Handlebars / Mustache</h4>
            <span class="engine-type">无逻辑模板</span>
          </div>
          <div class="engine-description">
            <p>轻量级模板引擎，使用双大括号语法，强调"无逻辑"模板。</p>
          </div>
          <div class="code-example-small">
            <pre><code>// Handlebars 示例
const template = Handlebars.compile(`
  &lt;div&gt;
    &lt;h1&gt;{{title}}&lt;/h1&gt;
    {{#each items}}
      &lt;p&gt;{{this}}&lt;/p&gt;
    {{/each}}
  &lt;/div&gt;
`)

const html = template({
  title: '商品列表',
  items: ['苹果', '香蕉', '橙子']
})
// 输出：纯 HTML 字符串</code></pre>
          </div>
          <div class="engine-features">
            <span class="feature-tag">服务端渲染</span>
            <span class="feature-tag">无逻辑</span>
            <span class="feature-tag">简单易用</span>
          </div>
        </div>

        <!-- EJS -->
        <div class="engine-card">
          <div class="engine-header">
            <h4>2. EJS (Embedded JavaScript)</h4>
            <span class="engine-type">嵌入式 JS</span>
          </div>
          <div class="engine-description">
            <p>允许在模板中嵌入 JavaScript 代码，常用于 Node.js。</p>
          </div>
          <div class="code-example-small">
            <pre><code>// EJS 示例
&lt;% if (user) { %&gt;
  &lt;h1&gt;&lt;%= user.name %&gt;&lt;/h1&gt;
  &lt;ul&gt;
    &lt;% user.items.forEach(item =&gt; { %&gt;
      &lt;li&gt;&lt;%= item %&gt;&lt;/li&gt;
    &lt;% }) %&gt;
  &lt;/ul&gt;
&lt;% } else { %&gt;
  &lt;p&gt;No user&lt;/p&gt;
&lt;% } %&gt;</code></pre>
          </div>
          <div class="engine-features">
            <span class="feature-tag">Node.js</span>
            <span class="feature-tag">嵌入 JS</span>
            <span class="feature-tag">灵活</span>
          </div>
        </div>

        <!-- Pug -->
        <div class="engine-card">
          <div class="engine-header">
            <h4>3. Pug (Jade)</h4>
            <span class="engine-type">缩进语法</span>
          </div>
          <div class="engine-description">
            <p>使用缩进替代标签的简洁语法，减少代码量。</p>
          </div>
          <div class="code-example-small">
            <pre><code>// Pug 示例
if user
  h1= user.name
  ul
    each item in user.items
      li= item
else
  p No user</code></pre>
          </div>
          <div class="engine-features">
            <span class="feature-tag">简洁语法</span>
            <span class="feature-tag">Express</span>
            <span class="feature-tag">缩进驱动</span>
          </div>
        </div>

        <!-- Underscore -->
        <div class="engine-card">
          <div class="engine-header">
            <h4>4. Underscore.js / Lodash Templates</h4>
            <span class="engine-type">轻量级</span>
          </div>
          <div class="engine-description">
            <p>JavaScript 工具库提供的简单模板功能。</p>
          </div>
          <div class="code-example-small">
            <pre><code>// Underscore 示例
const template = _.template(
  '&lt;h1&gt;&lt;%= title %&gt;&lt;/h1&gt;' +
  '&lt;ul&gt;' +
  '&lt;% _.each(items, function(item) { %&gt;' +
    '&lt;li&gt;&lt;%= item %&gt;&lt;/li&gt;' +
  '&lt;% }); %&gt;' +
  '&lt;/ul&gt;'
)

const html = template({
  title: '列表',
  items: ['a', 'b', 'c']
})</code></pre>
          </div>
          <div class="engine-features">
            <span class="feature-tag">轻量级</span>
            <span class="feature-tag">工具库</span>
            <span class="feature-tag">简单</span>
          </div>
        </div>

        <!-- Twig -->
        <div class="engine-card">
          <div class="engine-header">
            <h4>5. Twig (PHP)</h4>
            <span class="engine-type">PHP 模板</span>
          </div>
          <div class="engine-description">
            <p>PHP 生态系统中流行的模板引擎，语法类似 Jinja2。</p>
          </div>
          <div class="code-example-small">
            <pre><code>// Twig 示例
&lt;h1&gt;{{ title }}&lt;/h1&gt;
{% for item in items %}
  &lt;p&gt;{{ item }}&lt;/p&gt;
{% endfor %}</code></pre>
          </div>
          <div class="engine-features">
            <span class="feature-tag">PHP</span>
            <span class="feature-tag">Symfony</span>
            <span class="feature-tag">安全</span>
          </div>
        </div>

        <!-- Jinja2 -->
        <div class="engine-card">
          <div class="engine-header">
            <h4>6. Jinja2 (Python)</h4>
            <span class="engine-type">Python 模板</span>
          </div>
          <div class="engine-description">
            <p>Python 中广泛使用的模板引擎，Django、Flask 默认使用。</p>
          </div>
          <div class="code-example-small">
            <pre><code>// Jinja2 示例
&lt;h1&gt;{{ title }}&lt;/h1&gt;
{% for item in items %}
  &lt;p&gt;{{ item }}&lt;/p&gt;
{% endfor %}</code></pre>
          </div>
          <div class="engine-features">
            <span class="feature-tag">Python</span>
            <span class="feature-tag">Django</span>
            <span class="feature-tag">Flask</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Vue vs 字符串模板引擎对比 -->
    <section class="demo-section comparison-section">
      <h3>📊 Vue vs 字符串模板引擎的对比</h3>
      
      <div class="comparison-table-wrapper">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>特性</th>
              <th>基于字符串的模板引擎</th>
              <th>Vue (编译型模板)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>工作原理</strong></td>
              <td>字符串拼接/替换</td>
              <td>编译成虚拟 DOM，运行时优化</td>
            </tr>
            <tr>
              <td><strong>响应式</strong></td>
              <td class="negative">❌ 无响应式支持</td>
              <td class="positive">✅ 完整的响应式系统</td>
            </tr>
            <tr>
              <td><strong>性能</strong></td>
              <td class="negative">❌ 需要重新渲染整个模板</td>
              <td class="positive">✅ 精确的差异更新（diff）</td>
            </tr>
            <tr>
              <td><strong>组件系统</strong></td>
              <td class="negative">❌ 无组件概念</td>
              <td class="positive">✅ 完整的组件系统</td>
            </tr>
            <tr>
              <td><strong>编译时优化</strong></td>
              <td class="negative">❌ 无优化</td>
              <td class="positive">✅ 静态提升、树摇优化等</td>
            </tr>
            <tr>
              <td><strong>类型检查</strong></td>
              <td class="negative">❌ 无类型检查</td>
              <td class="positive">✅ TypeScript 支持</td>
            </tr>
            <tr>
              <td><strong>安全性</strong></td>
              <td class="warning">⚠️ 容易 XSS 攻击（需手动转义）</td>
              <td class="positive">✅ 默认转义，v-html 需谨慎</td>
            </tr>
            <tr>
              <td><strong>工具支持</strong></td>
              <td class="warning">⚠️ 有限的工具支持</td>
              <td class="positive">✅ 完整的开发工具链</td>
            </tr>
            <tr>
              <td><strong>适用场景</strong></td>
              <td>服务端渲染、静态页面生成</td>
              <td>现代前端应用、SPA、交互式 UI</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 工作原理对比 -->
    <section class="demo-section workflow-section">
      <h3>🔧 工作原理对比</h3>
      
      <div class="workflow-comparison">
        <div class="workflow-item">
          <h4>字符串模板引擎工作流程</h4>
          <div class="workflow-steps">
            <div class="step">
              <span class="step-number">1</span>
              <div class="step-content">
                <strong>编译阶段</strong>
                <p>将模板字符串转换为函数</p>
                <code>template → function</code>
              </div>
            </div>
            <div class="step">
              <span class="step-number">2</span>
              <div class="step-content">
                <strong>执行阶段</strong>
                <p>传入数据，执行函数，拼接字符串</p>
                <code>data → HTML string</code>
              </div>
            </div>
            <div class="step">
              <span class="step-number">3</span>
              <div class="step-content">
                <strong>渲染阶段</strong>
                <p>将 HTML 字符串插入 DOM</p>
                <code>innerHTML = htmlString</code>
              </div>
            </div>
            <div class="step">
              <span class="step-number">4</span>
              <div class="step-content">
                <strong>更新阶段</strong>
                <p>数据变化时，重新执行整个过程</p>
                <p class="warning-text">⚠️ 性能开销大</p>
              </div>
            </div>
          </div>
        </div>

        <div class="workflow-item">
          <h4>Vue 模板工作流程</h4>
          <div class="workflow-steps">
            <div class="step">
              <span class="step-number">1</span>
              <div class="step-content">
                <strong>编译阶段</strong>
                <p>将模板编译成渲染函数（虚拟 DOM）</p>
                <code>template → render function</code>
              </div>
            </div>
            <div class="step">
              <span class="step-number">2</span>
              <div class="step-content">
                <strong>首次渲染</strong>
                <p>执行渲染函数，创建虚拟 DOM</p>
                <code>render → Virtual DOM</code>
              </div>
            </div>
            <div class="step">
              <span class="step-number">3</span>
              <div class="step-content">
                <strong>挂载阶段</strong>
                <p>将虚拟 DOM 转换为真实 DOM</p>
                <code>Virtual DOM → Real DOM</code>
              </div>
            </div>
            <div class="step">
              <span class="step-number">4</span>
              <div class="step-content">
                <strong>更新阶段</strong>
                <p>响应式系统检测变化，精确更新 DOM</p>
                <p class="success-text">✅ 高效更新</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="demo-section use-case-section">
      <h3>💼 使用场景</h3>
      
      <div class="use-case-grid">
        <div class="use-case-card">
          <h4>字符串模板引擎适用场景</h4>
          <ul>
            <li>✅ 服务端渲染（SSR）</li>
            <li>✅ 静态站点生成</li>
            <li>✅ 邮件模板</li>
            <li>✅ 简单的内容替换</li>
            <li>✅ 服务端报告生成</li>
          </ul>
        </div>

        <div class="use-case-card">
          <h4>Vue 模板适用场景</h4>
          <ul>
            <li>✅ 现代前端应用（SPA）</li>
            <li>✅ 交互式用户界面</li>
            <li>✅ 需要响应式的应用</li>
            <li>✅ 复杂组件系统</li>
            <li>✅ 需要高性能更新的场景</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section class="demo-section summary-section">
      <h3>📝 总结</h3>
      <div class="summary-box">
        <div class="summary-content">
          <h4>关键理解：</h4>
          <ol>
            <li>
              <strong>字符串模板引擎</strong>通过字符串操作生成 HTML，
              适合服务端渲染和静态内容
            </li>
            <li>
              <strong>Vue 模板</strong>是编译型模板，编译成虚拟 DOM，
              提供响应式和高效的更新机制
            </li>
            <li>
              <strong>v-html 不是模板引擎</strong>：
              v-html 只是简单的 innerHTML 操作，
              不能用来实现模板引擎的功能
            </li>
            <li>
              <strong>选择原则</strong>：
              <ul>
                <li>服务端渲染 → 使用字符串模板引擎</li>
                <li>前端交互应用 → 使用 Vue 等现代框架</li>
                <li>不要用 v-html 来拼接 Vue 模板</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts" name="问题3-字符串模板引擎">
// 这个组件主要是展示，不需要太多交互逻辑
</script>

<style scoped>
.v-html-demo {
  padding: 20px;
  max-width: 1400px;
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

.demo-section {
  margin: 30px 0;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #42b983;
}

.demo-section.comparison-section {
  background: #fff3e0;
  border-left-color: #ff9800;
}

.demo-section.workflow-section {
  background: #e3f2fd;
  border-left-color: #2196f3;
}

.demo-section.use-case-section {
  background: #f3e5f5;
  border-left-color: #9c27b0;
}

.demo-section.summary-section {
  background: #e8f5e9;
  border-left-color: #4caf50;
}

h3 {
  color: #2c3e50;
  margin-top: 0;
  font-size: 1.3em;
}

.engines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.engine-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.engine-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.engine-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid #42b983;
}

.engine-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1em;
}

.engine-type {
  background: #42b983;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.engine-description {
  margin: 10px 0;
  color: #666;
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

.engine-features {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.feature-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
}

.comparison-table-wrapper {
  overflow-x: auto;
  margin-top: 20px;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.comparison-table th {
  background: #42b983;
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
}

.comparison-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.comparison-table tr:nth-child(even) {
  background: #f9f9f9;
}

.comparison-table .negative {
  color: #cf1322;
}

.comparison-table .positive {
  color: #389e0d;
}

.comparison-table .warning {
  color: #d46b08;
}

.workflow-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.workflow-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.workflow-item h4 {
  color: #2c3e50;
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #42b983;
}

.workflow-steps {
  margin-top: 15px;
}

.step {
  display: flex;
  gap: 15px;
  margin: 15px 0;
  align-items: flex-start;
}

.step-number {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  background: #42b983;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.step-content {
  flex: 1;
}

.step-content strong {
  color: #2c3e50;
  display: block;
  margin-bottom: 5px;
}

.step-content p {
  margin: 5px 0;
  color: #666;
  line-height: 1.6;
}

.step-content code {
  display: block;
  background: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  margin-top: 5px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #e83e8c;
}

.warning-text {
  color: #faad14;
  font-weight: 500;
}

.success-text {
  color: #52c41a;
  font-weight: 500;
}

.use-case-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.use-case-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.use-case-card h4 {
  color: #2c3e50;
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #42b983;
}

.use-case-card ul {
  margin: 15px 0 0 0;
  padding-left: 20px;
}

.use-case-card li {
  margin: 10px 0;
  line-height: 1.8;
  color: #2c3e50;
}

.summary-box {
  background: white;
  padding: 20px;
  border-radius: 6px;
  margin-top: 15px;
}

.summary-content h4 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.summary-content ol {
  margin: 0;
  padding-left: 25px;
}

.summary-content li {
  margin: 12px 0;
  line-height: 1.8;
  color: #2c3e50;
}

.summary-content ul {
  margin: 8px 0 0 20px;
  padding-left: 20px;
}

@media (max-width: 768px) {
  .engines-grid {
    grid-template-columns: 1fr;
  }

  .workflow-comparison,
  .use-case-grid {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    font-size: 12px;
  }

  .v-html-demo {
    padding: 15px;
  }
}
</style>

