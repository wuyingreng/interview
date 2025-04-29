const input1 = document.getElementById('input1')

let timer = null
input1.addEventListener('keyup', function () {
    if (timer) {
        /**
         * 直接取消当前正在等待执行的定时器。
         * 防止旧的定时器继续执行回调。
        */
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        // 模拟触发 change 事件
        console.log(input1.value)

        /**
         * 将 timer 变量设为 null，表示当前没有活跃的定时器。
         * 用于后续逻辑判断（比如 if (timer) 检查是否有定时器正在运行）。
        */
        timer = null
    }, 500)
})