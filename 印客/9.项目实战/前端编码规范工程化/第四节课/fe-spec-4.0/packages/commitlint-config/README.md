# Commitlint 英文提交信息配置

这个配置文件要求所有提交信息必须使用英文，不能包含中文字符。

## 配置说明

### 规则配置

- **subject-no-chinese**: 提交信息主题不能包含中文字符（错误级别：2，必须遵守）
- **body-no-chinese**: 提交信息正文不能包含中文字符（错误级别：1，建议遵守）

### 中文字符检测范围

正则表达式 `/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/` 检测以下字符：
- `\u4e00-\u9fff`: 中日韩统一表意文字（CJK Unified Ideographs）
- `\u3000-\u303f`: 中日韩符号和标点（CJK Symbols and Punctuation）
- `\uff00-\uffef`: 全角ASCII、半角片假名、半角符号（Halfwidth and Fullwidth Forms）

## 使用示例

### ✅ 正确的提交信息

```bash
# 功能添加
git commit -m "feat: add user authentication system"

# 错误修复
git commit -m "fix: resolve memory leak in data processing"

# 文档更新
git commit -m "docs: update API documentation for v2.0"

# 样式调整
git commit -m "style: format code according to eslint rules"

# 测试相关
git commit -m "test: add unit tests for user service"

# 重构
git commit -m "refactor: optimize database query performance"

# 构建相关
git commit -m "chore: update dependencies to latest versions"

# 回滚
git commit -m "revert: remove experimental feature"
```

### ❌ 错误的提交信息

```bash
# 包含中文字符
git commit -m "feat: 添加用户认证系统"  # ❌ 包含中文
git commit -m "fix: 修复内存泄漏问题"   # ❌ 包含中文
git commit -m "docs: 更新API文档"      # ❌ 包含中文
```

## 错误消息

当提交信息包含中文字符时，会显示以下错误消息：

```
提交信息必须使用英文，不能包含中文字符。例如：feat: add user login functionality
```

## 安装和使用

1. 安装依赖：
```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

2. 在项目根目录创建 `commitlint.config.js`：
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 继承此配置的规则
  }
};
```

3. 配置 Git hooks（使用 husky）：
```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
```

## 提交信息格式

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 类型（type）

- `feat`: 新功能
- `fix`: 错误修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `test`: 测试相关
- `refactor`: 代码重构
- `chore`: 构建过程或辅助工具的变动
- `revert`: 回滚之前的提交

### 示例

```bash
feat(auth): add OAuth2 login support

Implement OAuth2 authentication flow with Google and GitHub providers.
Add user session management and token refresh functionality.

Closes #123
```

## 注意事项

1. 所有提交信息必须使用英文
2. 不能包含任何中文字符、中文标点符号
3. 遵循 Conventional Commits 规范
4. 提交信息长度不超过100个字符
5. 不能以句号结尾