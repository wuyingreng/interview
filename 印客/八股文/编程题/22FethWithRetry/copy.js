const fetchWithRetry=(url, options, maxRetry = 3) => {
  return new Promise((resolve, reject) => {
    const doReFetch = async (attempt)=>{
      try {
        // ? fetch的返回值是什么
        const res = await fetch(url);
        if (response.ok) {
          resolve(res)
        } else {
          throw new Error('Request failed')
        }

      } catch (err) {
        if (attempt < maxRetry) {
          doReFetch(attempt + 1)
        } else {
          reject('重试三次还是失败的')
        }
      }
    };
    doReFetch(0)
  })
};

fetchWithRetry('tst1.json',{},3)