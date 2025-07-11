# @ali/lzddt-request

一个基于 axios 的 TypeScript 请求库，提供了完整的拦截器、错误处理和日志记录功能。

## 特性

- 🚀 基于 axios，提供完整的 TypeScript 类型支持
- 🔧 内置请求/响应拦截器
- 📝 完整的日志记录功能
- 🎭 支持 Mock 数据
- 🛡️ 错误处理和格式化
- 📊 请求性能监控

## 安装

```bash
npm install @ali/lzddt-request
# 或
yarn add @ali/lzddt-request
```

## 使用方法

### 基本用法

```typescript
import { Request } from '@ali/lzddt-request';

const request = new Request({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  debug: true
});

// GET 请求
request.get('/users')
  .then(response => {
    console.log('Response:', response);
  })
  .catch(error => {
    console.log('Caught an error:', error);
  });

// POST 请求
request.post('/users', { name: 'John', age: 30 })
  .then(response => {
    console.log('Response:', response);
  })
  .catch(error => {
    console.log('Caught an error:', error);
  });
```

### 配置选项

```typescript
interface IRequestOption {
  baseURL?: string;
  useMock?: boolean;
  mockProjectCode?: string;
  debug?: boolean;
  logApi?: IlogApi;
  headers?: Record<string, any>;
  timeout?: number;
  // ... 其他 axios 配置
}
```

### Mock 数据支持

```typescript
const request = new Request({
  baseURL: 'https://api.example.com',
  useMock: true,
  mockProjectCode: 'your-mock-project-code',
  debug: true
});
```

### 自定义日志

```typescript
const logApi = (logData, response) => {
  console.log('API Log:', logData);
  // 发送到日志服务
};

const request = new Request({
  baseURL: 'https://api.example.com',
  debug: true,
  logApi
});
```

## API

### Request 类

#### 构造函数

```typescript
new Request(options: IRequestOption)
```

#### 方法

- `get<T>(url: string, config?: IRequestConfig): Promise<IResultWrapper<T>>`
- `post<T>(url: string, data: any, config?: IRequestConfig): Promise<IResultWrapper<T>>`
- `put<T>(url: string, data: any, config?: IRequestConfig): Promise<IResultWrapper<T>>`
- `patch<T>(url: string, data: any, config?: IRequestConfig): Promise<IResultWrapper<T>>`
- `setHeaders(headers: any): void`

### 类型定义

```typescript
interface IResultWrapper<T = any> {
  success: boolean;
  data?: T;
  errorCode?: string;
  errorMessage?: string;
  traceId?: string;
}
```

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 代码检查
npm run lint

# 格式化代码
npm run format
```

## License

MIT 