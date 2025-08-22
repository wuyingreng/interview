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
            console.log('currentIndex==>',currentIndex)
            const url = urls[currentIndex];

            try {
                const response = await fetch(url);
                const result = await response.json();
                results[currentIndex] = result;  // 按索引存储
            } catch (err) {
                results[currentIndex] = err;
                console.error(`Request failed )or ${url}:`, err);
            }

            completedCount++;
            console.log('completedCount==>',completedCount)
            if (completedCount === urls.length) {
                console.log(results);
                return;
            }
        }
    }

    // 启动并发请求
    const workers = Array(concurrentLimit).fill().map(() => sendRequest());
    await Promise.all(workers);
    
    return results;
};

const urls=new Array(20).fill('https://x.sujianbin.com/?name=test.json');
processRequestsConcurrent(20,5)
