# 初步版
## 第一次拖拽
1. timer赋值为null,不会走
``` javascript
    if (timer) {
        return
    }
```
2. 给setTimeout赋值。timer是定时器的id。任务是500毫秒执行
``` javascript
    timer = setTimeout(() => {
        // 模拟触发 change 事件
        console.log(input1.value)
        // 清空定时器
        timer = null
    }, 500)
```
## 拖拽事件连续触发，
只要timer有值,就直接return
``` javascript
    if (timer) {
        return
    }
```
## 过了500ms之后
定时器触发，timer变成了null
## 拖拽事件一直连续触发，timer 有值，一直return
只要timer有值,就直接return
``` javascript
    if (timer) {
        return
    }
```

## 过了500ms之后
定时器触发，timer变成了null


# 函数版
## 如何理解效果
1. 可以打印看到 console.log('timer') 执行了好多次， console.log('settimeout') 和  console.log(e.offsetX, e.offsetY) 才执行了一次
2. drag事件是不是一直按着不放也触发了drag
## 核心难点分析


用它的解释去理解你的代码逻辑。