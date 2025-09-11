/**
 * 强缓存策略 (Cache First Strategy)
 * 
 * 适用场景：
 * 1. 静态资源文件 (JS, CSS, 图片, 字体等)
 * 2. 版本化资源 (带 hash 的文件名)
 * 3. 不经常变化的资源
 * 4. 离线优先的应用资源
 * 
 * 策略逻辑：
 * 1. 首先检查缓存
 * 2. 如果缓存命中，直接返回缓存内容
 * 3. 如果缓存未命中，请求网络
 * 4. 网络请求成功后，更新缓存
 * 5. 返回网络响应
 */

class CacheFirstStrategy {
  constructor(cacheName = 'cache-first-v1') {
    this.cacheName = cacheName;
    this.maxAge = 7 * 24 * 60 * 60 * 1000; // 7天
    this.maxEntries = 100; // 最大缓存条目数
  }

  /**
   * 执行缓存优先策略
   * @param {Request} request - 请求对象
   * @returns {Promise<Response>} - 响应对象
   */
  async execute(request) {
    console.log(`[Cache First] 处理请求: ${request.url}`);

    try {
      // 1. 检查缓存
      const cachedResponse = await this.getFromCache(request);
      if (cachedResponse) {
        console.log(`[Cache First] 缓存命中: ${request.url}`);
        return cachedResponse;
      }

      // 2. 缓存未命中，请求网络
      console.log(`[Cache First] 缓存未命中，请求网络: ${request.url}`);
      const networkResponse = await this.fetchFromNetwork(request);

      if (networkResponse && networkResponse.status === 200) {
        // 3. 网络请求成功，更新缓存
        await this.updateCache(request, networkResponse);
        console.log(`[Cache First] 网络请求成功，已缓存: ${request.url}`);
        return networkResponse;
      }

      // 4. 网络请求失败
      throw new Error(`网络请求失败: ${networkResponse?.status || 'Unknown'}`);

    } catch (error) {
      console.error(`[Cache First] 处理失败: ${request.url}`, error);

      // 5. 返回错误响应或离线页面
      return this.createErrorResponse(request, error);
    }
  }

  /**
   * 从缓存中获取响应
   * @param {Request} request - 请求对象
   * @returns {Promise<Response|null>} - 缓存的响应或null
   */
  async getFromCache(request) {
    try {
      const cache = await caches.open(this.cacheName);
      const cachedResponse = await cache.match(request);

      if (!cachedResponse) {
        return null;
      }

      // 检查缓存是否过期
      if (this.isCacheExpired(cachedResponse)) {
        console.log(`[Cache First] 缓存已过期: ${request.url}`);
        await cache.delete(request);
        return null;
      }

      return cachedResponse;
    } catch (error) {
      console.error(`[Cache First] 获取缓存失败:`, error);
      return null;
    }
  }

  /**
   * 从网络获取响应
   * @param {Request} request - 请求对象
   * @returns {Promise<Response>} - 网络响应
   */
  async fetchFromNetwork(request) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时

    try {
      const response = await fetch(request, {
        signal: controller.signal,
        cache: 'no-cache' // 确保从网络获取最新内容
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * 更新缓存
   * @param {Request} request - 请求对象
   * @param {Response} response - 响应对象
   */
  async updateCache(request, response) {
    try {
      const cache = await caches.open(this.cacheName);

      // 克隆响应以避免流被消费
      const responseToCache = response.clone();

      // 添加缓存时间戳
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-timestamp', Date.now().toString());
      headers.set('sw-cache-strategy', 'cache-first');

      const cachedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });

      await cache.put(request, cachedResponse);

      // 清理过期缓存
      await this.cleanupExpiredCache();

    } catch (error) {
      console.error(`[Cache First] 更新缓存失败:`, error);
    }
  }

  /**
   * 检查缓存是否过期
   * @param {Response} response - 响应对象
   * @returns {boolean} - 是否过期
   */
  isCacheExpired(response) {
    const timestamp = response.headers.get('sw-cache-timestamp');
    if (!timestamp) {
      return true; // 没有时间戳，认为已过期
    }

    const cacheTime = parseInt(timestamp);
    const now = Date.now();
    const age = now - cacheTime;

    return age > this.maxAge;
  }

  /**
   * 清理过期缓存
   */
  async cleanupExpiredCache() {
    try {
      const cache = await caches.open(this.cacheName);
      const requests = await cache.keys();

      const expiredRequests = [];

      for (const request of requests) {
        const response = await cache.match(request);
        if (response && this.isCacheExpired(response)) {
          expiredRequests.push(request);
        }
      }

      // 删除过期缓存
      await Promise.all(
        expiredRequests.map(request => cache.delete(request))
      );

      if (expiredRequests.length > 0) {
        console.log(`[Cache First] 清理了 ${expiredRequests.length} 个过期缓存`);
      }

      // 如果缓存条目过多，删除最旧的
      await this.cleanupOldCache();

    } catch (error) {
      console.error(`[Cache First] 清理缓存失败:`, error);
    }
  }

  /**
   * 清理旧缓存（保持缓存条目数量在限制内）
   */
  async cleanupOldCache() {
    try {
      const cache = await caches.open(this.cacheName);
      const requests = await cache.keys();

      if (requests.length <= this.maxEntries) {
        return;
      }

      // 按时间戳排序，删除最旧的
      const requestsWithTime = await Promise.all(
        requests.map(async (request) => {
          const response = await cache.match(request);
          const timestamp = response?.headers.get('sw-cache-timestamp');
          return {
            request,
            timestamp: timestamp ? parseInt(timestamp) : 0
          };
        })
      );

      requestsWithTime.sort((a, b) => a.timestamp - b.timestamp);

      const toDelete = requestsWithTime.slice(0, requests.length - this.maxEntries);

      await Promise.all(
        toDelete.map(({ request }) => cache.delete(request))
      );

      console.log(`[Cache First] 清理了 ${toDelete.length} 个旧缓存`);

    } catch (error) {
      console.error(`[Cache First] 清理旧缓存失败:`, error);
    }
  }

  /**
   * 创建错误响应
   * @param {Request} request - 请求对象
   * @param {Error} error - 错误对象
   * @returns {Response} - 错误响应
   */
  createErrorResponse(request, error) {
    const isImageRequest = request.destination === 'image';
    const isScriptRequest = request.destination === 'script';
    const isStyleRequest = request.destination === 'style';

    if (isImageRequest) {
      // 图片请求失败，返回占位图
      return new Response(
        '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#f0f0f0"/><text x="50" y="50" text-anchor="middle" fill="#999">图片加载失败</text></svg>',
        {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' }
        }
      );
    }

    if (isScriptRequest || isStyleRequest) {
      // JS/CSS 请求失败，返回空内容
      return new Response('', { status: 200 });
    }

    // 其他请求返回错误页面
    return new Response(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>资源加载失败</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .error { color: #e74c3c; }
        </style>
      </head>
      <body>
        <h1 class="error">资源加载失败</h1>
        <p>请求的资源暂时无法访问，请检查网络连接后重试。</p>
        <p>错误信息: ${error.message}</p>
      </body>
      </html>`,
      {
        status: 503,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }

  /**
   * 预缓存资源
   * @param {Array<string>} urls - 要缓存的URL列表
   */
  async precache(urls) {
    console.log(`[Cache First] 开始预缓存 ${urls.length} 个资源`);

    const cache = await caches.open(this.cacheName);
    const results = await Promise.allSettled(
      urls.map(async (url) => {
        try {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response);
            console.log(`[Cache First] 预缓存成功: ${url}`);
            return { url, success: true };
          } else {
            console.warn(`[Cache First] 预缓存失败: ${url} (${response.status})`);
            return { url, success: false, error: `HTTP ${response.status}` };
          }
        } catch (error) {
          console.error(`[Cache First] 预缓存错误: ${url}`, error);
          return { url, success: false, error: error.message };
        }
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failed = results.length - successful;

    console.log(`[Cache First] 预缓存完成: 成功 ${successful}, 失败 ${failed}`);

    return results;
  }

  /**
   * 获取缓存统计信息
   */
  async getCacheStats() {
    try {
      const cache = await caches.open(this.cacheName);
      const requests = await cache.keys();

      const stats = {
        totalEntries: requests.length,
        maxEntries: this.maxEntries,
        maxAge: this.maxAge,
        cacheName: this.cacheName,
        urls: requests.map(r => r.url)
      };

      return stats;
    } catch (error) {
      console.error(`[Cache First] 获取缓存统计失败:`, error);
      return null;
    }
  }
}

// 导出策略类
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CacheFirstStrategy;
} else if (typeof self !== 'undefined') {
  self.CacheFirstStrategy = CacheFirstStrategy;
}
