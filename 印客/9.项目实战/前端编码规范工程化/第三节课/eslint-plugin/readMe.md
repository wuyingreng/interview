# ESLint Plugin - 分号检查插件

这是一个自定义的ESLint插件，用于检查JavaScript代码中所有语句是否以分号结尾。

## 功能特性

- 检查所有语句是否以分号结尾
- 支持自动修复（添加缺失的分号）
- 覆盖常见的JavaScript语句类型
- 提供详细的错误信息

## 安装

```bash
npm install eslint-plugin --save-dev
```

## 使用方法

### 1. 在ESLint配置文件中启用插件

```json
{
  "plugins": ["eslint-plugin"],
  "rules": {
    "eslint-plugin/require-semicolon": "error"
  }
}
```

### 2. 使用推荐配置

```json
{
  "extends": ["plugin:eslint-plugin/recommended"]
}
```

## 规则说明

### require-semicolon

**错误级别**: `"error"`

**描述**: 要求所有语句以分号结尾

**可修复**: 是

**支持的语句类型**:
- 表达式语句 (`ExpressionStatement`)
- 变量声明 (`VariableDeclaration`)
- 函数声明 (`FunctionDeclaration`)
- 类声明 (`ClassDeclaration`)
- 导入声明 (`ImportDeclaration`)
- 导出声明 (`ExportNamedDeclaration`, `ExportDefaultDeclaration`, `ExportAllDeclaration`)
- 调试语句 (`DebuggerStatement`)
- 空语句 (`EmptyStatement`)
- 返回语句 (`ReturnStatement`)
- 抛出语句 (`ThrowStatement`)
- 继续语句 (`ContinueStatement`)
- 中断语句 (`BreakStatement`)

## 示例

### 正确的代码

```javascript
const x = 1;
let y = 2;
function test() {};
class Test {};
import { x } from "module";
export default x;
return x;
throw new Error();
console.log("test");
```

### 错误的代码

```javascript
const x = 1        // 缺少分号
let y = 2          // 缺少分号
function test() {} // 缺少分号
class Test {}      // 缺少分号
import { x } from "module" // 缺少分号
export default x   // 缺少分号
return x           // 缺少分号
console.log("test") // 缺少分号
```

## 自动修复

该规则支持自动修复，运行以下命令可以自动添加缺失的分号：

```bash
npx eslint --fix your-file.js
```

## 测试

运行测试：

```bash
npm test
```

## 开发

### 项目结构

```
eslint-plugin/
├── index.js                    # 插件入口文件
├── rules/                     # 规则目录
│   └── require-semicolon.js   # 分号检查规则
├── test/                      # 测试文件
│   └── require-semicolon.test.js
├── package.json
└── README.md
```

### 添加新规则

1. 在 `rules/` 目录下创建新的规则文件
2. 在 `index.js` 中注册新规则
3. 在 `configs.recommended` 中配置规则级别
4. 添加相应的测试用例

## 许可证

ISC