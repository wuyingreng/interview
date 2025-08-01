好的！我来出一些关于 JavaScript 逻辑运算符的习题，帮你加深理解：

## 基础逻辑运算符习题

### 1. **基础 `&&` 和 `||` 运算**

```javascript
// 习题1：预测输出结果
console.log(true && false);     // ? fasle
console.log(false || true);     // ? true
console.log(true && true);      // ? true
console.log(false || false);    // ? false

// 习题2：短路求值
let a = 5, b = 10;
console.log(a > 3 && b < 15);   // ? true
console.log(a > 10 || b < 5);   // ? false
```

### 2. **短路求值练习**

```javascript
// 习题3：预测输出
let x = 0, y = 5;
console.log(x && y);            // ? 0
console.log(x || y);            // ? 5
console.log(y && x);            // ? 0
console.log(y || x);            // ? 5

// 习题4：函数调用
function test() {
    console.log('函数被调用了');
    return true;
}

console.log(false && test());   // ? false
console.log(true || test());    // ? true
```

### 3. **复杂逻辑表达式**

```javascript
// 习题5：优先级和结合性 &&的优先级更高
console.log(true && false || true);     // ? true
console.log(false || true && false);    // ? false
console.log((true && false) || true);   // ? true
console.log(false || (true && false));  // ? false

// 习题6：多重条件
let age = 25, hasLicense = true, isDrunk = false;
console.log(age >= 18 && hasLicense && !isDrunk);  // ?
```

## 实际应用场景习题

### 4. **条件赋值**

```javascript
// 习题7：默认值设置
let name = "";
let displayName = name || "Anonymous";
console.log(displayName);       // ? "Anonymous"

let count = 0;
let displayCount = count || "No count";
console.log(displayCount);      // ? No count

let length = 0;
let displayLength = 0 && "No count";
console.log(displayLength);      // ? 0

// 习题8：条件执行
let isLoggedIn = false;
let user = isLoggedIn && {name: "John", id: 123};
console.log(user);              // ? false
```

### 5. **对象属性访问**

```javascript
// 习题9：安全属性访问
let user = {
    name: "Alice",
    address: {
        city: "Beijing"
    }
};

console.log(user.address && user.address.city);     // ? Beijing
console.log(user.phone && user.phone.number);       // ? undefined

// 习题10：链式调用
let result = user.address && user.address.city && user.address.city.length;
console.log(result);            // ? 7
```

## 进阶习题

### 6. **逻辑运算符的返回值**

```javascript
// 习题11：返回值类型
console.log(1 && 2);            // ?
console.log(0 && 5);            // ?
console.log("hello" || "world"); // ?
console.log("" || "default");   // ?

// 习题12：复杂表达式
console.log(1 && 2 && 3);       // ?
console.log(1 && 0 && 3);       // ?
console.log(1 || 2 || 3);       // ?
console.log(0 || "" || 3);      // ?
```

### 7. **条件渲染逻辑**

```javascript
// 习题13：React/Vue 风格的条件渲染
let isVisible = true;
let isAdmin = false;
let userRole = "user";

let canEdit = isVisible && (isAdmin || userRole === "admin");
console.log(canEdit);           // ?

// 习题14：表单验证
let username = "john";
let password = "";
let email = "john@example.com";

let isValid = username && password && email;
console.log(isValid);           // ?
```

## 挑战习题

### 8. **复杂逻辑组合**

```javascript
// 习题15：多重条件判断
let age = 25;
let hasMoney = true;
let hasTime = false;
let isWeekend = true;

let canGoToMovie = age >= 18 && hasMoney && (hasTime || isWeekend);
console.log(canGoToMovie);      // ?

// 习题16：嵌套逻辑
let a = 5, b = 10, c = 15;
let result = (a < b && b < c) || (a > b && b > c);
console.log(result);            // ?
```

### 9. **逻辑运算符的妙用**

```javascript
// 习题17：条件函数调用
function greet(name) {
    return `Hello, ${name}!`;
}

let userName = "";
let message = userName && greet(userName) || "Hello, Guest!";
console.log(message);           // ?

// 习题18：数组条件访问
let arr = [1, 2, 3, 4, 5];
let index = 3;
let value = arr[index] || "Not found";
console.log(value);             // ?
```

## 答案和解析

### 基础答案：
```javascript
// 习题1答案
console.log(true && false);     // false
console.log(false || true);     // true
console.log(true && true);      // true
console.log(false || false);    // false

// 习题2答案
console.log(a > 3 && b < 15);   // true
console.log(a > 10 || b < 5);   // false
```

### 短路求值答案：
```javascript
// 习题3答案
console.log(x && y);            // 0 (短路，返回 x 的值)
console.log(x || y);            // 5 (短路，返回 y 的值)
console.log(y && x);            // 0 (短路，返回 x 的值)
console.log(y || x);            // 5 (短路，返回 y 的值)

// 习题4答案
console.log(false && test());   // false (函数不会被调用)
console.log(true || test());    // true (函数不会被调用)
```

## 学习要点总结

1. **短路求值**：`&&` 和 `||` 会短路求值
2. **返回值**：返回最后一个求值的操作数
3. **优先级**：`&&` 优先级高于 `||`
4. **实际应用**：常用于默认值、条件执行、安全访问

这些习题涵盖了逻辑运算符的各个方面，建议你逐个练习并理解每个结果的原因！