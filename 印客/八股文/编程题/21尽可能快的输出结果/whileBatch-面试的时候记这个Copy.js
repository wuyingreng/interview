
const processRequestsConcurrent = async (urls, maxCount) => {
    const sum = urls.length;
    const results = new Array(sum);
    let sendCount = 0;
    let completedCount = 0;

    const requestData = async () => {
        while (sendCount < sum) {
            let currentIndex = sendCount++;
            const url = urls[currentIndex];
            try {
                const res = await axios.get(url);
                results[currentIndex] = {
                    data: res,
                    status: 'success'
                }
            } catch (err) {
                results[currentIndex] = {
                    data: err,
                    status: 'fail'
                }

            } finally {
                completedCount++;
                if (completedCount >= sum) {
                    return
                };
            }
        }
    };

 
    const workers = new Array(maxCount).fill().map(() => {
        requestData()
    });
    await Promise.all(workers);

    return results;

}



const urls = new Array(20).fill('https://x.sujianbin.com/?name=test.json');
processRequestsConcurrent(urls, 5).then(res => {
    console.log('res==>', res)
})