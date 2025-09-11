/**
 * 方案2：保持并发但维护顺序
 * 使用while 
 * 
 * 
 * */


async function processRequestsConcurrent(urls, concurrentLimit = 5) {
    const results = new Array(urls.length);
    let nextIndex = 0;
    let completedCount = 0;
    async function sendRequest() {
        while (nextIndex < urls.length) {
            const currentIndex = nextIndex++;
            console.log('currentIndex==>', currentIndex)
            const url = urls[currentIndex];
            try {
                // const response = await fetch(url);
                // const result = await response.json();//?? 这里会不会有问题
                const response = await axios.get(url);
                results[currentIndex] = response;  // 按索引存储
            } catch (err) {
                results[currentIndex] = err;
                console.error(`Request failed )or ${url}:`, err);
            }
            completedCount++;
            if (completedCount === urls.length) {
                console.log(results);
                return;
            }
        }
    }

 
     /**
    * 启动并发请求
     * map对空数组不会执行任何操作。new Array(maxCount) 得到是[empty*5]
     * new Array(maxCount).fill() 得到是[undefined*5]
     * */
    const workers = Array(concurrentLimit).fill().map(() => sendRequest());
    await Promise.all(workers);

    return results;
};

const urls = new Array(20).fill('https://x.sujianbin.com/?name=test.json');
processRequestsConcurrent(urls, 5).then(res => {
    console.log('res==>', res)
})
