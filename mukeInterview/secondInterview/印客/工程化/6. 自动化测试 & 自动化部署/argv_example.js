// Node.js argv 使用示例

console.log('=== process.argv 详解 ===');

console.log('完整的 process.argv 数组:');
console.log(process.argv);

console.log('\n=== 数组元素分析 ===');
console.log('process.argv[0]:', process.argv[0]);  // Node.js 可执行文件路径
console.log('process.argv[1]:', process.argv[1]);  // 当前脚本文件路径
console.log('process.argv[2]:', process.argv[2]);  // 第一个命令行参数
console.log('process.argv[3]:', process.argv[3]);  // 第二个命令行参数

console.log('\n=== 获取命令行参数 ===');
// 获取所有命令行参数（不包括前两个元素）
const args = process.argv.slice(2);
console.log('命令行参数:', args);

console.log('\n=== 实际应用示例 ===');

// 示例1：简单的参数处理
if (args.length > 0) {
  console.log('第一个参数:', args[0]);
  console.log('参数类型:', typeof args[0]);
}

// 示例2：参数解析
const name = args.find(arg => arg.startsWith('--name='));
if (name) {
  const value = name.split('=')[1];
  console.log('姓名:', value);
}

// 示例3：标志参数
const verbose = args.includes('--verbose');
if (verbose) {
  console.log('详细模式已启用');
}

console.log('\n=== 常见用法 ===');
console.log(`
1. 获取所有参数：
   const args = process.argv.slice(2);

2. 检查参数数量：
   if (process.argv.length < 3) {
       console.log('请提供参数');
   }

3. 解析命名参数：
   const name = process.argv.find(arg => arg.startsWith('--name='));

4. 检查标志：
   const debug = process.argv.includes('--debug');
`);

// 示例4：命令行工具
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      // 处理 --key=value 格式
      if (arg.includes('=')) {
        const [key, value] = arg.substring(2).split('=');
        options[key] = value;
      } else {
        // 处理 --flag 格式
        options[arg.substring(2)] = true;
      }
    } else if (arg.startsWith('-')) {
      // 处理 -f 格式
      options[arg.substring(1)] = true;
    } else {
      // 处理位置参数
      if (!options.args) options.args = [];
      options.args.push(arg);
    }
  }

  return options;
}

const parsedOptions = parseArgs();
console.log('\n解析后的参数:', parsedOptions); 