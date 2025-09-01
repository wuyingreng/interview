// 这个文件用于测试eslint插件
// 以下语句都缺少分号，应该被插件检测到

const name = "张三"
let age = 25
var city = "北京"

function greet() {
  console.log("你好")
}

class Person {
  constructor(name) {
    this.name = name
  }

  sayHello() {
    return "你好，我是 " + this.name
  }
}

import { useState } from "react"
export default Person
export { greet }

if (age > 18) {
  console.log("成年人")
} else {
  console.log("未成年人")
}

for (let i = 0; i < 5; i++) {
  console.log(i)
}

while (age > 0) {
  age--
}

try {
  throw new Error("测试错误")
} catch (error) {
  console.log(error.message)
}

return true
continue
break
debugger
