

function fetchWithRetry(url, options, maxRetry = 3) {
  // 返回一个promise
  return new Promise((resolve, reject) => {
    const doFetch = async (attempt) => {
      // async 一遍用同步代码包裹错误
      try {

        const response = await fetch(url, options);
        // // 包含了一个布尔值，标示该 Response 成功（HTTP 状态码的范围在 200-299）。
        if (response.ok) {
          // 一次成功直接返回
          resolve(response);
        } else {
          // 没有就抛出错误，让cath重试
          throw new Error('Request failed');
        }
      } catch (error) {
        // 重试次数，如果前面已经重试了maxRetry的次数就不要重试了。
        if (attempt < maxRetry) {
          console.log(`Attempt ${attempt + 1} failed. Retrying...`);
          doFetch(attempt + 1);
        } else {
          reject(new Error('Max retries exceeded'));
        }
      }
    };

    doFetch(0);
  });
}

