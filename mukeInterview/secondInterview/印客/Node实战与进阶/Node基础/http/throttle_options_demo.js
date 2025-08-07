// 完整的节流实现，支持 leading 和 trailing 选项
const throttle = function (fn, timeout, options = {}) {
  let timer = null;
  let lastTime = 0;
  const { leading = true, trailing = true } = options;

  return function (...args) {
    const now = Date.now();

    // 如果是第一次调用且不执行前导，则设置 lastTime
    if (!lastTime && !leading) {
      lastTime = now;
    }

    const remaining = timeout - (now - lastTime);

    if (remaining <= 0 || remaining > timeout) {
      // 时间窗口已过，可以立即执行
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      if (leading) {
        fn.apply(this, args);
      }
    } else if (!timer && trailing) {
      // 在时间窗口内，设置延迟执行
      timer = setTimeout(() => {
        lastTime = leading ? Date.now() : 0;
        timer = null;
        if (trailing) {
          fn.apply(this, args);
        }
      }, remaining);
    }
  };
};

// 测试函数
function testFunction(event) {
  console.log(`[${new Date().toLocaleTimeString()}] 函数执行，参数:`, event);
}

// 模拟快速连续调用
function simulateRapidCalls(throttledFn, name) {
  console.log(`\n=== ${name} ===`);
  console.log('开始时间:', new Date().toLocaleTimeString());

  // 立即调用
  throttledFn({ type: 'scroll', value: 'call-1' });

  // 200ms后调用
  setTimeout(() => {
    throttledFn({ type: 'scroll', value: 'call-2' });
  }, 200);

  // 400ms后调用
  setTimeout(() => {
    throttledFn({ type: 'scroll', value: 'call-3' });
  }, 400);

  // 600ms后调用
  setTimeout(() => {
    throttledFn({ type: 'scroll', value: 'call-4' });
  }, 600);

  // 800ms后调用
  setTimeout(() => {
    throttledFn({ type: 'scroll', value: 'call-5' });
  }, 800);

  // 1000ms后调用
  setTimeout(() => {
    throttledFn({ type: 'scroll', value: 'call-6' });
  }, 1000);

  // 1200ms后调用
  setTimeout(() => {
    throttledFn({ type: 'scroll', value: 'call-7' });
  }, 1200);
}

// 测试不同的选项组合
console.log('=== 节流函数 leading/trailing 选项演示 ===');
console.log('时间窗口: 1000ms');
console.log('调用间隔: 200ms');

// 1. leading: true, trailing: true (默认)
const throttle1 = throttle(testFunction, 1000, { leading: true, trailing: true });
simulateRapidCalls(throttle1, 'leading: true, trailing: true (默认)');

// 2. leading: true, trailing: false
setTimeout(() => {
  const throttle2 = throttle(testFunction, 1000, { leading: true, trailing: false });
  simulateRapidCalls(throttle2, 'leading: true, trailing: false');
}, 3000);

// 3. leading: false, trailing: true
setTimeout(() => {
  const throttle3 = throttle(testFunction, 1000, { leading: false, trailing: true });
  simulateRapidCalls(throttle3, 'leading: false, trailing: true');
}, 6000);

// 4. leading: false, trailing: false
setTimeout(() => {
  const throttle4 = throttle(testFunction, 1000, { leading: false, trailing: false });
  simulateRapidCalls(throttle4, 'leading: false, trailing: false');
}, 9000);

// 解释每种组合的行为
console.log('\n=== 选项说明 ===');
console.log('1. leading: true, trailing: true (默认)');
console.log('   - 第一次调用立即执行');
console.log('   - 时间窗口结束前最后一次调用会在窗口结束时执行');
console.log('   - 适合：需要立即响应，同时保证不会错过最后一次调用');

console.log('\n2. leading: true, trailing: false');
console.log('   - 第一次调用立即执行');
console.log('   - 时间窗口结束时不执行');
console.log('   - 适合：只需要立即响应，不需要延迟执行');

console.log('\n3. leading: false, trailing: true');
console.log('   - 第一次调用不立即执行');
console.log('   - 时间窗口结束前最后一次调用会在窗口结束时执行');
console.log('   - 适合：不需要立即响应，但要确保执行最后一次调用');

console.log('\n4. leading: false, trailing: false');
console.log('   - 第一次调用不立即执行');
console.log('   - 时间窗口结束时不执行');
console.log('   - 适合：纯粹的节流，只按固定间隔执行'); 