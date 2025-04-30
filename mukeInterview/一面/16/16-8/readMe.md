# 初步版
## 第一次输入1，500ms之后不输入
1. 不会走
``` javascript
    if (timer) {
        clearTimeout(timer)
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
## 重新刷新页面，连续输入123
### 第一次输入1
给timer赋值
### 没有到500ms，立马输入2
1. 进入到了
``` javascript
    if (timer) {
        clearTimeout(timer)
    }
```
2. 重新设置一个定时任务
### 没有到500ms，立马输入3
1. 进入到了
``` javascript
    if (timer) {
        clearTimeout(timer)
    }
```
2. 重新设置一个定时任务
3. 输入3后没有动，500ms很快过去了。执行了console.log
timer未空

4. 过了很久再输入4,就和1 一开始一样了。