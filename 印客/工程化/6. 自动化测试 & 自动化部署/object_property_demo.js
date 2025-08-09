// 演示对象属性访问的不同方式

// 1. 数字作为属性名
let obj1 = { 1: 22, 2: 33, 3: 44 };

console.log('=== 数字属性名访问 ===');
// ❌ 错误方式
// console.log(obj1.1);  // SyntaxError: Unexpected number

// ✅ 正确方式
console.log('obj1[1]:', obj1[1]);        // 22
console.log('obj1["1"]:', obj1["1"]);    // 22
console.log('obj1[2]:', obj1[2]);        // 33

// 2. 字符串作为属性名
let obj2 = { "name": "Alice", "age": 25 };

console.log('\n=== 字符串属性名访问 ===');
// ✅ 两种方式都可以
console.log('obj2.name:', obj2.name);        // Alice
console.log('obj2["name"]:', obj2["name"]);  // Alice
console.log('obj2.age:', obj2.age);          // 25

// 3. 特殊字符作为属性名
let obj3 = { "user-name": "Bob", "user.age": 30 };

console.log('\n=== 特殊字符属性名访问 ===');
// ❌ 错误：包含连字符的属性名不能用点号语法
// console.log(obj3.user-name);  // 会被解释为 obj3.user - name

// ✅ 正确：使用方括号语法
console.log('obj3["user-name"]:', obj3["user-name"]);      // Bob
console.log('obj3["user.age"]:', obj3["user.age"]);        // 30

// 4. 变量作为属性名
let propertyName = "dynamic";
let obj4 = { [propertyName]: "value" };

console.log('\n=== 变量属性名访问 ===');
console.log('obj4[propertyName]:', obj4[propertyName]);    // value
console.log('obj4["dynamic"]:', obj4["dynamic"]);          // value

// 5. 计算属性名
let obj5 = {
  ["computed" + "Property"]: "computed value",
  [`template${1 + 1}`]: "template literal"
};

console.log('\n=== 计算属性名访问 ===');
console.log('obj5["computedProperty"]:', obj5["computedProperty"]);  // computed value
console.log('obj5["template2"]:', obj5["template2"]);                // template literal

// 6. 实际应用场景
let scores = {
  1: 85,
  2: 92,
  3: 78,
  4: 96
};

console.log('\n=== 实际应用场景 ===');
// 遍历数字属性名
for (let key in scores) {
  console.log(`Student ${key}: ${scores[key]} points`);
}

// 使用数组方法
let studentIds = Object.keys(scores);
console.log('Student IDs:', studentIds);  // ['1', '2', '3', '4']

// 注意：Object.keys() 返回的是字符串数组
studentIds.forEach(id => {
  console.log(`Student ${id}: ${scores[id]} points`);
}); 