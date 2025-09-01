---
nav:
  path: /hooks
---

# usePrevious

保存上一次状态的 Hook的简单版。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />



## API

```typescript
const previousState: T = usePrevious<T>(
  state: T,
  shouldUpdate?: (prev: T | undefined, next: T) => boolean
);
```

### Result

| 参数          | 说明            | 类型 |
| ------------- | --------------- | ---- |
| previousState | 上次 state 的值 | `T`  |

### Params

| 参数         | 说明                       | 类型                                         | 默认值                       |
| ------------ | -------------------------- | -------------------------------------------- | ---------------------------- |
| state        | 需要记录变化的值           | `T`                                          | 