import { Request } from '@ali/lzddt-request';

// 基本用法
const request = new Request({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  debug: true
});

// GET 请求示例
async function fetchUsers() {
  try {
    const response = await request.get('/users');
    console.log('Users:', response.data);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// POST 请求示例
async function createUser() {
  try {
    const response = await request.post('/users', {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890'
    });
    console.log('Created user:', response.data);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// 使用 Mock 数据
const mockRequest = new Request({
  baseURL: 'https://api.example.com',
  useMock: true,
  mockProjectCode: 'your-project-code',
  debug: true
});

// 自定义日志函数
const logApi = (logData: any, response: any) => {
  console.log('API Log:', {
    url: logData.api,
    method: logData.method,
    success: logData.success,
    time: logData.time,
    traceId: logData.traceId
  });
};

const requestWithLog = new Request({
  baseURL: 'https://api.example.com',
  debug: true,
  logApi
});

// 执行示例
fetchUsers();
createUser(); 