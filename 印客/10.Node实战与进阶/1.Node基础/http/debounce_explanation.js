// 防抖函数 - 支持立即执行版本
const debounce = function (fn, timeout, immediate = false) {
  let timer = null;  // 存储定时器ID，用于清除定时器

  return function (...args) {  // 返回防抖后的函数，使用rest参数收集所有参数
    // 判断是否应该立即执行
    // immediate为true且timer为null时，说明是第一次调用，应该立即执行
    const callNow = immediate && !timer;

    // 如果存在定时器，清除它（重置防抖）
    if (timer) {
      clearTimeout(timer);
    }

    // 设置新的定时器
    timer = setTimeout(() => {
      // 延迟执行逻辑
      if (!immediate) {  // 只有在非立即执行模式下才延迟执行
        fn.apply(this, args);  // 执行原函数，保持this上下文和参数
      }
      timer = null;  // 清除定时器引用
    }, timeout);

    // 立即执行逻辑
    if (callNow) {  // 如果是立即执行模式且是第一次调用
      fn.apply(this, args);  // 立即执行原函数
    }
  };
};

// 测试函数
function testFunction(event) {
  console.log(`[${new Date().toLocaleTimeString()}] 函数执行，参数:`, event);
}

// 演示不同模式的行为
console.log('=== 防抖函数立即执行版本演示 ===');

// 1. 延迟执行模式 (immediate = false)
console.log('\n--- 延迟执行模式 (immediate = false) ---');
const debouncedDelayed = debounce(testFunction, 1000, false);

console.log('开始时间:', new Date().toLocaleTimeString());
debouncedDelayed({ type: 'keyup', value: 'a' });  // 不执行
setTimeout(() => debouncedDelayed({ type: 'keyup', value: 'ab' }), 200);  // 不执行
setTimeout(() => debouncedDelayed({ type: 'keyup', value: 'abc' }), 400);  // 不执行
setTimeout(() => debouncedDelayed({ type: 'keyup', value: 'abcd' }), 600);  // 不执行
// 最后一次调用后1000ms执行

// 2. 立即执行模式 (immediate = true)
setTimeout(() => {
  console.log('\n--- 立即执行模式 (immediate = true) ---');
  const debouncedImmediate = debounce(testFunction, 1000, true);

  console.log('开始时间:', new Date().toLocaleTimeString());
  debouncedImmediate({ type: 'keyup', value: 'x' });  // 立即执行
  setTimeout(() => debouncedImmediate({ type: 'keyup', value: 'xy' }), 200);  // 不执行
  setTimeout(() => debouncedImmediate({ type: 'keyup', value: 'xyz' }), 400);  // 不执行
  setTimeout(() => debouncedImmediate({ type: 'keyup', value: 'xyzw' }), 600);  // 不执行
  // 最后一次调用后1000ms执行
}, 3000);

// 详细解释执行流程
console.log('\n=== 执行流程详解 ===');

// 延迟执行模式流程
console.log('\n延迟执行模式流程:');
console.log('1. 第一次调用: 设置定时器，1000ms后执行');
console.log('2. 200ms后调用: 清除原定时器，设置新定时器，1000ms后执行');
console.log('3. 400ms后调用: 清除原定时器，设置新定时器，1000ms后执行');
console.log('4. 600ms后调用: 清除原定时器，设置新定时器，1000ms后执行');
console.log('5. 1600ms: 执行最后一次调用');

// 立即执行模式流程
console.log('\n立即执行模式流程:');
console.log('1. 第一次调用: 立即执行，同时设置定时器');
console.log('2. 200ms后调用: 清除原定时器，设置新定时器，不立即执行');
console.log('3. 400ms后调用: 清除原定时器，设置新定时器，不立即执行');
console.log('4. 600ms后调用: 清除原定时器，设置新定时器，不立即执行');
console.log('5. 1600ms: 执行最后一次调用');

// 关键变量状态变化演示
console.log('\n=== 关键变量状态变化 ===');

function demonstrateStateChanges() {
  let timer = null;
  let callCount = 0;

  const debouncedFn = debounce((event) => {
    callCount++;
    console.log(`第${callCount}次执行，参数:`, event);
  }, 1000, true);

  console.log('立即执行模式状态变化:');
  console.log('调用1: timer=null, callNow=true, 立即执行');
  debouncedFn({ value: 'call1' });

  setTimeout(() => {
    console.log('调用2: timer存在, callNow=false, 不立即执行');
    debouncedFn({ value: 'call2' });
  }, 200);

  setTimeout(() => {
    console.log('调用3: timer存在, callNow=false, 不立即执行');
    debouncedFn({ value: 'call3' });
  }, 400);
}

// demonstrateStateChanges(); 