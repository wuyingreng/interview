# Group Anagrams 代码bug分析

## 问题代码
```javascript
var groupAnagrams = function(strs) {
   const map=new Map();
   for(let s of strs){
        const count=new Array(26).fill(0);  // 🚨 每次都创建新数组
        for(let c of s){
            count[c.charCodeAt()-'a'.charCodeAt()]++
        }
        if(map.get(count)){  // 🚨 这里永远不会进来！
            map.set(count,map.get(count).push(s))
        }else{
            map.set(count,[s])
        }
   }
   console.log(map,map.values())
  return map.values()
};
```

## 问题原因：对象引用vs内容相等

### 核心问题
**每次循环都会创建一个新的数组对象**，即使数组内容相同，但引用不同！

### 详细分析
```javascript
// 例子演示
let arr1 = [1, 0, 0, 1, 0, ...];  // "abc"的字符计数
let arr2 = [1, 0, 0, 1, 0, ...];  // "bca"的字符计数 (内容相同)

console.log(arr1 === arr2);  // false! 不同的对象引用
console.log(arr1.toString() === arr2.toString());  // true! 内容相同
```

### Map的键比较机制
```javascript
const map = new Map();

// 第一次：strs = ["abc"]
const count1 = [1, 1, 1, 0, 0, ...];  // 新数组对象
map.set(count1, ["abc"]);

// 第二次：strs = ["bca"] (是abc的anagram)
const count2 = [1, 1, 1, 0, 0, ...];  // 又是新数组对象！
map.get(count2);  // undefined! 因为count1 !== count2
```

## 执行过程演示

### 输入: ["eat","tea","tan","ate","nat","bat"]

```
第1轮: s="eat"
count = [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0]
map.get(count) = undefined  // 第一次，肯定没有
map.set(count, ["eat"])

第2轮: s="tea" 
count = [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0]  // 内容相同但是新对象！
map.get(count) = undefined  // 🚨 因为引用不同！
map.set(count, ["tea"])     // 又创建了新的键值对

第3轮: s="tan"
count = [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0]
map.get(count) = undefined
map.set(count, ["tan"])

...每次都会创建新的键值对，永远不会复用！
```

## 正确的解决方案

### 方案1：使用字符串作为键
```javascript
var groupAnagrams = function(strs) {
    const map = new Map();
    for(let s of strs){
        const count = new Array(26).fill(0);
        for(let c of s){
            count[c.charCodeAt() - 'a'.charCodeAt()]++;
        }
        const key = count.toString();  // 转为字符串作为键
        
        if(map.has(key)){
            map.get(key).push(s);
        } else {
            map.set(key, [s]);
        }
    }
    return Array.from(map.values());
};
```

### 方案2：使用字符串拼接作为键
```javascript
var groupAnagrams = function(strs) {
    const map = new Map();
    for(let s of strs){
        const count = new Array(26).fill(0);
        for(let c of s){
            count[c.charCodeAt() - 'a'.charCodeAt()]++;
        }
        const key = count.join(',');  // 用逗号分隔的字符串
        
        if(map.has(key)){
            map.get(key).push(s);
        } else {
            map.set(key, [s]);
        }
    }
    return Array.from(map.values());
};
```

### 方案3：直接排序字符串作为键（最简单）
```javascript
var groupAnagrams = function(strs) {
    const map = new Map();
    for(let s of strs){
        const key = s.split('').sort().join('');  // 排序后的字符串作为键
        
        if(map.has(key)){
            map.get(key).push(s);
        } else {
            map.set(key, [s]);
        }
    }
    return Array.from(map.values());
};
```

## 其他需要修正的地方

### 1. push()方法的返回值问题
```javascript
// 错误的写法
map.set(count, map.get(count).push(s))  // push()返回数组长度，不是数组！

// 正确的写法
map.get(count).push(s);  // push()方法直接修改原数组
```

### 2. 使用map.has()更清晰
```javascript
// 建议使用
if(map.has(key)) {
    map.get(key).push(s);
} else {
    map.set(key, [s]);
}
```

## 总结

**根本原因**: JavaScript中数组是引用类型，即使内容相同，不同的数组对象有不同的引用地址，Map使用严格相等(===)来比较键。

**解决方案**: 将数组转换为字符串类型作为Map的键，这样内容相同的字符串会被认为是相同的键。 