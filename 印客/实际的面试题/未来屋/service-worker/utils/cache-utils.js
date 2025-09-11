/**
 * Service Worker 缓存工具函数
 * 提供缓存操作的通用工具方法
 */

/**
 * 缓存工具类
 */
export class CacheUtils {
  constructor() {
    this.caches = caches;
  }

  /**
   * 打开或创建缓存
   * @param {string} cacheName - 缓存名称
   * @returns {Promise<Cache>} - 缓存对象
   */
  async openCache(cacheName) {
    try {
      return await this.caches.open(cacheName);
    } catch (error) {
      console.error(`[CacheUtils] 打开缓存失败: ${cacheName}`, error);
      throw error;
    }
  }

  /**
   * 获取缓存中的响应
   * @param {string} cacheName - 缓存名称
   * @param {Request|string} request - 请求对象或URL
   * @returns {Promise<Response|null>} - 缓存的响应或null
   */
  async getFromCache(cacheName, request) {
    try {
      const cache = await this.openCache(cacheName);
      const requestObj = typeof request === 'string' ? new Request(request) : request;
      return await cache.match(requestObj);
    } catch (error) {
      console.error(`[CacheUtils] 获取缓存失败:`, error);
      return null;
    }
  }

  /**
   * 将响应存储到缓存
   * @param {string} cacheName - 缓存名称
   * @param {Request|string} request - 请求对象或URL
   * @param {Response} response - 响应对象
   * @returns {Promise<boolean>} - 是否存储成功
   */
  async putToCache(cacheName, request, response) {
    try {
      const cache = await this.openCache(cacheName);
      const requestObj = typeof request === 'string' ? new Request(request) : request;
      await cache.put(requestObj, response);
      return true;
    } catch (error) {
      console.error(`[CacheUtils] 存储缓存失败:`, error);
      return false;
    }
  }

  /**
   * 删除缓存中的响应
   * @param {string} cacheName - 缓存名称
   * @param {Request|string} request - 请求对象或URL
   * @returns {Promise<boolean>} - 是否删除成功
   */
  async deleteFromCache(cacheName, request) {
    try {
      const cache = await this.openCache(cacheName);
      const requestObj = typeof request === 'string' ? new Request(request) : request;
      return await cache.delete(requestObj);
    } catch (error) {
      console.error(`[CacheUtils] 删除缓存失败:`, error);
      return false;
    }
  }

  /**
   * 获取缓存中的所有键
   * @param {string} cacheName - 缓存名称
   * @returns {Promise<Request[]>} - 请求对象数组
   */
  async getCacheKeys(cacheName) {
    try {
      const cache = await this.openCache(cacheName);
      return await cache.keys();
    } catch (error) {
      console.error(`[CacheUtils] 获取缓存键失败:`, error);
      return [];
    }
  }

  /**
   * 获取缓存统计信息
   * @param {string} cacheName - 缓存名称
   * @returns {Promise<Object>} - 统计信息
   */
  async getCacheStats(cacheName) {
    try {
      const cache = await this.openCache(cacheName);
      const keys = await cache.keys();

      let totalSize = 0;
      const urls = [];

      for (const request of keys) {
        const response = await cache.match(request);
        if (response) {
          urls.push(request.url);

          // 尝试估算响应大小
          const contentLength = response.headers.get('content-length');
          if (contentLength) {
            totalSize += parseInt(contentLength);
          }
        }
      }

      return {
        name: cacheName,
        entryCount: keys.length,
        totalSize: totalSize,
        urls: urls,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error(`[CacheUtils] 获取缓存统计失败:`, error);
      return {
        name: cacheName,
        entryCount: 0,
        totalSize: 0,
        urls: [],
        lastUpdated: null,
        error: error.message
      };
    }
  }

  /**
   * 清理过期缓存
   * @param {string} cacheName - 缓存名称
   * @param {number} maxAge - 最大年龄（毫秒）
   * @returns {Promise<number>} - 清理的条目数
   */
  async cleanupExpiredCache(cacheName, maxAge = 24 * 60 * 60 * 1000) {
    try {
      const cache = await this.openCache(cacheName);
      const keys = await cache.keys();
      const now = Date.now();
      let cleanedCount = 0;

      for (const request of keys) {
        const response = await cache.match(request);
        if (response) {
          const timestamp = response.headers.get('sw-cache-timestamp');
          if (timestamp) {
            const cacheTime = parseInt(timestamp);
            const age = now - cacheTime;

            if (age > maxAge) {
              await cache.delete(request);
              cleanedCount++;
            }
          }
        }
      }

      console.log(`[CacheUtils] 清理了 ${cleanedCount} 个过期缓存条目`);
      return cleanedCount;
    } catch (error) {
      console.error(`[CacheUtils] 清理过期缓存失败:`, error);
      return 0;
    }
  }

  /**
   * 清理旧缓存（保持条目数量限制）
   * @param {string} cacheName - 缓存名称
   * @param {number} maxEntries - 最大条目数
   * @returns {Promise<number>} - 清理的条目数
   */
  async cleanupOldCache(cacheName, maxEntries = 100) {
    try {
      const cache = await this.openCache(cacheName);
      const keys = await cache.keys();

      if (keys.length <= maxEntries) {
        return 0;
      }

      // 按时间戳排序
      const entriesWithTime = await Promise.all(
        keys.map(async (request) => {
          const response = await cache.match(request);
          const timestamp = response?.headers.get('sw-cache-timestamp');
          return {
            request,
            timestamp: timestamp ? parseInt(timestamp) : 0
          };
        })
      );

      entriesWithTime.sort((a, b) => a.timestamp - b.timestamp);

      const toDelete = entriesWithTime.slice(0, keys.length - maxEntries);

      await Promise.all(
        toDelete.map(({ request }) => cache.delete(request))
      );

      console.log(`[CacheUtils] 清理了 ${toDelete.length} 个旧缓存条目`);
      return toDelete.length;
    } catch (error) {
      console.error(`[CacheUtils] 清理旧缓存失败:`, error);
      return 0;
    }
  }

  /**
   * 清空指定缓存
   * @param {string} cacheName - 缓存名称
   * @returns {Promise<boolean>} - 是否清空成功
   */
  async clearCache(cacheName) {
    try {
      return await this.caches.delete(cacheName);
    } catch (error) {
      console.error(`[CacheUtils] 清空缓存失败:`, error);
      return false;
    }
  }

  /**
   * 清空所有缓存
   * @returns {Promise<number>} - 清空的缓存数量
   */
  async clearAllCaches() {
    try {
      const cacheNames = await this.caches.keys();
      const results = await Promise.all(
        cacheNames.map(name => this.caches.delete(name))
      );

      const clearedCount = results.filter(result => result).length;
      console.log(`[CacheUtils] 清空了 ${clearedCount} 个缓存`);
      return clearedCount;
    } catch (error) {
      console.error(`[CacheUtils] 清空所有缓存失败:`, error);
      return 0;
    }
  }

  /**
   * 获取所有缓存信息
   * @returns {Promise<Object[]>} - 所有缓存的统计信息
   */
  async getAllCacheStats() {
    try {
      const cacheNames = await this.caches.keys();
      const stats = await Promise.all(
        cacheNames.map(name => this.getCacheStats(name))
      );

      return stats;
    } catch (error) {
      console.error(`[CacheUtils] 获取所有缓存统计失败:`, error);
      return [];
    }
  }

  /**
   * 检查缓存是否存在
   * @param {string} cacheName - 缓存名称
   * @returns {Promise<boolean>} - 是否存在
   */
  async cacheExists(cacheName) {
    try {
      const cacheNames = await this.caches.keys();
      return cacheNames.includes(cacheName);
    } catch (error) {
      console.error(`[CacheUtils] 检查缓存存在性失败:`, error);
      return false;
    }
  }

  /**
   * 复制缓存
   * @param {string} sourceCacheName - 源缓存名称
   * @param {string} targetCacheName - 目标缓存名称
   * @returns {Promise<boolean>} - 是否复制成功
   */
  async copyCache(sourceCacheName, targetCacheName) {
    try {
      const sourceCache = await this.openCache(sourceCacheName);
      const targetCache = await this.openCache(targetCacheName);
      const keys = await sourceCache.keys();

      for (const request of keys) {
        const response = await sourceCache.match(request);
        if (response) {
          await targetCache.put(request, response);
        }
      }

      console.log(`[CacheUtils] 缓存复制完成: ${sourceCacheName} -> ${targetCacheName}`);
      return true;
    } catch (error) {
      console.error(`[CacheUtils] 缓存复制失败:`, error);
      return false;
    }
  }

  /**
   * 合并缓存
   * @param {string[]} sourceCacheNames - 源缓存名称数组
   * @param {string} targetCacheName - 目标缓存名称
   * @returns {Promise<boolean>} - 是否合并成功
   */
  async mergeCaches(sourceCacheNames, targetCacheName) {
    try {
      const targetCache = await this.openCache(targetCacheName);

      for (const sourceCacheName of sourceCacheNames) {
        const sourceCache = await this.openCache(sourceCacheName);
        const keys = await sourceCache.keys();

        for (const request of keys) {
          const response = await sourceCache.match(request);
          if (response) {
            await targetCache.put(request, response);
          }
        }
      }

      console.log(`[CacheUtils] 缓存合并完成: ${sourceCacheNames.join(', ')} -> ${targetCacheName}`);
      return true;
    } catch (error) {
      console.error(`[CacheUtils] 缓存合并失败:`, error);
      return false;
    }
  }
}

/**
 * 创建带时间戳的响应
 * @param {Response} response - 原始响应
 * @param {string} strategy - 缓存策略
 * @returns {Response} - 带时间戳的响应
 */
export function createTimestampedResponse(response, strategy = 'unknown') {
  const headers = new Headers(response.headers);
  headers.set('sw-cache-timestamp', Date.now().toString());
  headers.set('sw-cache-strategy', strategy);
  headers.set('sw-cache-version', '1.0.0');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}

/**
 * 检查响应是否过期
 * @param {Response} response - 响应对象
 * @param {number} maxAge - 最大年龄（毫秒）
 * @returns {boolean} - 是否过期
 */
export function isResponseExpired(response, maxAge = 24 * 60 * 60 * 1000) {
  const timestamp = response.headers.get('sw-cache-timestamp');
  if (!timestamp) {
    return true; // 没有时间戳，认为已过期
  }

  const cacheTime = parseInt(timestamp);
  const now = Date.now();
  const age = now - cacheTime;

  return age > maxAge;
}

/**
 * 创建错误响应
 * @param {string} message - 错误消息
 * @param {number} status - HTTP状态码
 * @param {string} contentType - 内容类型
 * @returns {Response} - 错误响应
 */
export function createErrorResponse(message, status = 500, contentType = 'text/plain') {
  const body = contentType === 'application/json'
    ? JSON.stringify({ error: true, message, status })
    : message;

  return new Response(body, {
    status,
    headers: {
      'Content-Type': contentType,
      'X-Error-Source': 'service-worker'
    }
  });
}

/**
 * 创建离线响应
 * @param {string} url - 请求URL
 * @returns {Response} - 离线响应
 */
export function createOfflineResponse(url) {
  const isApiRequest = url.includes('/api/');

  if (isApiRequest) {
    return createErrorResponse(
      JSON.stringify({
        error: true,
        message: '网络不可用，请检查连接后重试',
        code: 'NETWORK_ERROR',
        offline: true
      }),
      503,
      'application/json'
    );
  }

  return new Response(
    `<!DOCTYPE html>
    <html>
    <head>
      <title>离线模式</title>
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
        .offline-container {
          max-width: 500px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .offline-icon {
          font-size: 48px;
          margin-bottom: 20px;
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
      <div class="offline-container">
        <div class="offline-icon">📡</div>
        <h1>您当前处于离线状态</h1>
        <p>请检查您的网络连接，然后重试。</p>
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

// 创建全局实例
export const cacheUtils = new CacheUtils();

// 默认导出
export default {
  CacheUtils,
  cacheUtils,
  createTimestampedResponse,
  isResponseExpired,
  createErrorResponse,
  createOfflineResponse
};
