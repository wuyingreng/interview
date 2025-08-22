// 方案1：递归调用（推荐）
/**
 * 需求要点：
 * 
 * 完美满足所有要求
✅ 要求1：函数签名和类型
函数名：concurrentRequest ✓
返回类型：Promise<Result[]> ✓
参数：urls: string[], maxConcurrent: number ✓
✅ 要求2：并发控制
最大并发数不超过 maxConcurrent ✓
避免服务器压力 ✓
✅ 要求3：高效运转
请求完成后立即发起下一个 ✓
队列高效运转 ✓
✅ 要求4：顺序保持
按 urls 数组原始顺序返回 ✓
轮播图等优先显示的需求满足 ✓
 * 
 * */
function concurrentRequest(urls: string[], maxConcurrent: number): Promise<Result[]> {
    const results = new Array(urls.length);
    let nextIndex = 0;
    let completedCount = 0;

    return new Promise((resolve) => {
        const sendRequest = () => {
            if (nextIndex >= urls.length) {
                return; // 没有更多 URL 需要处理
            }

            const currentIndex = nextIndex++;
            const url = urls[currentIndex];

            fetch(url)
                .then(res => res.json())
                .then(result => {
                    results[currentIndex] = {
                        status: 'success',
                        data: result
                    };
                })
                .catch(err => {
                    results[currentIndex] = {
                        status: 'failure',
                        data: err
                    };
                })
                .finally(() => {
                    completedCount++;
                    if (completedCount === urls.length) {
                        resolve(results);
                        return;
                    }
                    // ✅ 关键：请求完成后立即发起下一个
                    sendRequest();
                });
        };

        // 启动并发请求
        for (let i = 0; i < maxConcurrent; i++) {
            sendRequest();
        }
    });
}