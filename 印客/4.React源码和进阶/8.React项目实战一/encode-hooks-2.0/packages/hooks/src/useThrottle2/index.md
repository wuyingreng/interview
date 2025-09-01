---
nav:
  path: /hooks
---

# useThrottle

用来处理节流值的 Hook的简化版。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const throttledValue = useThrottle(
  fn:Function
  options?: Options
);
```

### Params

| 参数    | 说明           | 类型      | 默认值 |
| ------- | -------------- | --------- | ------ |
| fn   | 需要节流的值   | `any`     | -      |
| options | 配置节流的行为 | `Options` | -      |

### Options

| 参数     | 说明                     | 类型      | 默认值 |
| -------- | ------------------------ | --------- | ------ |
| wait     | 等待时间，单位为毫秒     | `number`  | `1000` |
