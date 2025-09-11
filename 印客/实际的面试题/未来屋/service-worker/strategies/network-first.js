/**
 * 协商缓存策略 (Network First Strategy)
 * 
 * 适用场景：
 * 1. API 接口数据
 * 2. 动态内容
 * 3. 需要实时性的资源
 * 4. 用户生成的内容
 * 5. 配置信息
 * 
 * 策略逻辑：
 * 1. 首先尝试网络请求
 * 2. 网络请求成功，更新缓存并返回响应
 * 3. 网络请求失败，尝试使用缓存
 * 4. 缓存也没有，返回错误或离线页面
 */

class NetworkFirstStrategy {
  constructor(cacheName = 'network-first-v1') {
    this.cacheName = cacheName;
    this.maxAge = 5 * 60 * 1000; // 5分钟
    this.networkTimeout = 5000; // 5秒网络超时
    this.maxEntries = 50; // 最大缓存条目数
  }

  /**
   * 执行网络优先策略
   * @param {Request} request - 请求对象
   * @returns {Promise<Response>} - 响应对象
   */
  async execute(request) {
    console.log(`[Network First] 处理请求: ${request.url}`);

    try {
      // 1. 尝试网络请求
      const networkResponse = await this.fetchFromNetwork(request);

      if (networkResponse && networkResponse.status === 200) {
        // 2. 网络请求成功，更新缓存
        await this.updateCache(request, networkResponse);
        console.log(`[Network First] 网络请求成功，已更新缓存: ${request.url}`);
        return networkResponse;
      }

      // 3. 网络响应无效，尝试缓存
      console.log(`[Network First] 网络响应无效，尝试缓存: ${request.url}`);
      return await this.fallbackToCache(request);

    } catch (error) {
      console.log(`[Network First] 网络请求失败，尝试缓存: ${request.url}`, error.message);

      // 4. 网络请求失败，尝试缓存
      return await this.fallbackToCache(request);
    }
  }

  /**
   * 从网络获取响应
   * @param {Request} request - 请求对象
   * @returns {Promise<Response>} - 网络响应
   */
  async fetchFromNetwork(request) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, this.networkTimeout);

    try {
      const response = await fetch(request, {
        signal: controller.signal,
        cache: 'no-cache', // 确保从网络获取最新内容
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      clearTimeout(timeoutId);

      // 检查响应状态
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * 回退到缓存
   * @param {Request} request - 请求对象
   * @returns {Promise<Response>} - 缓存响应或错误响应
   */
  async fallbackToCache(request) {
    try {
      const cachedResponse = await this.getFromCache(request);

      if (cachedResponse) {
        console.log(`[Network First] 使用缓存响应: ${request.url}`);

        // 添加缓存标识头
        const headers = new Headers(cachedResponse.headers);
        headers.set('X-Served-By', 'cache');
        headers.set('X-Cache-Strategy', 'network-first');

        return new Response(cachedResponse.body, {
          status: cachedResponse.status,
          statusText: cachedResponse.statusText,
          headers: headers
        });
      }

      // 缓存也没有，返回错误
      throw new Error('网络和缓存都不可用');

    } catch (error) {
      console.error(`[Network First] 回退到缓存失败: ${request.url}`, error);
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
        console.log(`[Network First] 缓存已过期: ${request.url}`);
        await cache.delete(request);
        return null;
      }

      return cachedResponse;
    } catch (error) {
      console.error(`[Network First] 获取缓存失败:`, error);
      return null;
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

      // 添加缓存元数据
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-timestamp', Date.now().toString());
      headers.set('sw-cache-strategy', 'network-first');
      headers.set('sw-cache-ttl', this.maxAge.toString());

      const cachedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });

      await cache.put(request, cachedResponse);

      // 清理过期缓存
      await this.cleanupExpiredCache();

    } catch (error) {
      console.error(`[Network First] 更新缓存失败:`, error);
    }
  }

  /**
   * 检查缓存是否过期
   * @param {Response} response - 响应对象
   * @returns {boolean} - 是否过期
   */
  isCacheExpired(response) {
    const timestamp = response.headers.get('sw-cache-timestamp');
    const ttl = response.headers.get('sw-cache-ttl');

    if (!timestamp) {
      return true; // 没有时间戳，认为已过期
    }

    const cacheTime = parseInt(timestamp);
    const maxAge = ttl ? parseInt(ttl) : this.maxAge;
    const now = Date.now();
    const age = now - cacheTime;

    return age > maxAge;
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
        console.log(`[Network First] 清理了 ${expiredRequests.length} 个过期缓存`);
      }

      // 如果缓存条目过多，删除最旧的
      await this.cleanupOldCache();

    } catch (error) {
      console.error(`[Network First] 清理缓存失败:`, error);
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

      console.log(`[Network First] 清理了 ${toDelete.length} 个旧缓存`);

    } catch (error) {
      console.error(`[Network First] 清理旧缓存失败:`, error);
    }
  }

  /**
   * 创建错误响应
   * @param {Request} request - 请求对象
   * @param {Error} error - 错误对象
   * @returns {Response} - 错误响应
   */
  createErrorResponse(request, error) {
    const url = new URL(request.url);

    // API 请求返回 JSON 错误
    if (url.pathname.startsWith('/api/')) {
      return new Response(
        JSON.stringify({
          error: true,
          message: '服务暂时不可用',
          code: 'SERVICE_UNAVAILABLE',
          timestamp: new Date().toISOString(),
          path: url.pathname
        }),
        {
          status: 503,
          headers: {
            'Content-Type': 'application/json',
            'X-Error-Source': 'service-worker'
          }
        }
      );
    }

    // HTML 请求返回错误页面
    return new Response(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>服务暂时不可用</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            text-align: center; 
            padding: 50px; 
            background: #f8f9fa;
            color: #333;
          }
          .error-container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .error-icon {
            font-size: 48px;
            margin-bottom: 20px;
          }
          .error-title {
            color: #e74c3c;
            margin-bottom: 15px;
          }
          .retry-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
          }
          .retry-btn:hover {
            background: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="error-container">
          <div class="error-icon">⚠️</div>
          <h1 class="error-title">服务暂时不可用</h1>
          <p>网络连接出现问题，请检查您的网络设置后重试。</p>
          <p>如果问题持续存在，请稍后再试。</p>
          <button class="retry-btn" onclick="window.location.reload()">重试</button>
        </div>
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
    console.log(`[Network First] 开始预缓存 ${urls.length} 个资源`);

    const cache = await caches.open(this.cacheName);
    const results = await Promise.allSettled(
      urls.map(async (url) => {
        try {
          const response = await fetch(url);
          if (response.ok) {
            await this.updateCache(new Request(url), response);
            console.log(`[Network First] 预缓存成功: ${url}`);
            return { url, success: true };
          } else {
            console.warn(`[Network First] 预缓存失败: ${url} (${response.status})`);
            return { url, success: false, error: `HTTP ${response.status}` };
          }
        } catch (error) {
          console.error(`[Network First] 预缓存错误: ${url}`, error);
          return { url, success: false, error: error.message };
        }
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failed = results.length - successful;

    console.log(`[Network First] 预缓存完成: 成功 ${successful}, 失败 ${failed}`);

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
        networkTimeout: this.networkTimeout,
        cacheName: this.cacheName,
        urls: requests.map(r => r.url)
      };

      return stats;
    } catch (error) {
      console.error(`[Network First] 获取缓存统计失败:`, error);
      return null;
    }
  }

  /**
   * 设置缓存配置
   * @param {Object} config - 配置对象
   */
  configure(config) {
    if (config.maxAge !== undefined) {
      this.maxAge = config.maxAge;
    }
    if (config.networkTimeout !== undefined) {
      this.networkTimeout = config.networkTimeout;
    }
    if (config.maxEntries !== undefined) {
      this.maxEntries = config.maxEntries;
    }
    console.log(`[Network First] 配置已更新:`, {
      maxAge: this.maxAge,
      networkTimeout: this.networkTimeout,
      maxEntries: this.maxEntries
    });
  }
}

// 导出策略类
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NetworkFirstStrategy;
} else if (typeof self !== 'undefined') {
  self.NetworkFirstStrategy = NetworkFirstStrategy;
}
