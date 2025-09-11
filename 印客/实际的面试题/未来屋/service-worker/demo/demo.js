/**
 * Service Worker 演示页面的 JavaScript 代码
 * 提供交互功能和测试功能
 */

class ServiceWorkerDemo {
  constructor() {
    this.swRegistration = null;
    this.logContainer = document.getElementById('logContainer');
    this.testResults = document.getElementById('testResults');
    this.offlineIndicator = document.getElementById('offlineIndicator');

    this.init();
  }

  /**
   * 初始化演示
   */
  async init() {
    this.log('初始化 Service Worker 演示...', 'info');

    // 检查 Service Worker 支持
    if (!('serviceWorker' in navigator)) {
      this.log('浏览器不支持 Service Worker', 'error');
      this.updateStatus('swStatus', '不支持', 'error');
      return;
    }

    // 监听网络状态变化
    window.addEventListener('online', () => {
      this.updateNetworkStatus(true);
      this.log('网络连接已恢复', 'success');
    });

    window.addEventListener('offline', () => {
      this.updateNetworkStatus(false);
      this.log('网络连接已断开', 'warning');
    });

    // 检查 Service Worker 状态
    await this.checkServiceWorkerStatus();
    this.updateNetworkStatus(navigator.onLine);

    // 定期更新状态
    setInterval(() => {
      this.updateServiceWorkerStatus();
    }, 5000);
  }

  /**
   * 检查 Service Worker 状态
   */
  async checkServiceWorkerStatus() {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      if (registrations.length > 0) {
        this.swRegistration = registrations[0];
        this.updateStatus('swStatus', '已注册', 'success');
        await this.updateCacheInfo();
      } else {
        this.updateStatus('swStatus', '未注册', 'warning');
      }
    } catch (error) {
      this.log(`检查 Service Worker 状态失败: ${error.message}`, 'error');
      this.updateStatus('swStatus', '检查失败', 'error');
    }
  }

  /**
   * 注册 Service Worker
   */
  async registerSW() {
    try {
      this.log('开始注册 Service Worker...', 'info');

      const registration = await navigator.serviceWorker.register('../sw.js', {
        scope: '/'
      });

      this.swRegistration = registration;
      this.updateStatus('swStatus', '注册中...', 'warning');

      // 监听安装事件
      registration.addEventListener('updatefound', () => {
        this.log('发现 Service Worker 更新', 'info');
        const newWorker = registration.installing;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              this.log('Service Worker 已更新，请刷新页面', 'warning');
              this.updateStatus('swStatus', '已更新', 'warning');
            } else {
              this.log('Service Worker 安装完成', 'success');
              this.updateStatus('swStatus', '已安装', 'success');
            }
          }
        });
      });

      // 等待 Service Worker 激活
      await this.waitForServiceWorker();
      this.log('Service Worker 注册成功', 'success');
      this.updateStatus('swStatus', '已激活', 'success');

      await this.updateCacheInfo();

    } catch (error) {
      this.log(`Service Worker 注册失败: ${error.message}`, 'error');
      this.updateStatus('swStatus', '注册失败', 'error');
    }
  }

  /**
   * 等待 Service Worker 激活
   */
  async waitForServiceWorker() {
    return new Promise((resolve) => {
      if (navigator.serviceWorker.controller) {
        resolve();
        return;
      }

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        resolve();
      });
    });
  }

  /**
   * 注销 Service Worker
   */
  async unregisterSW() {
    try {
      if (this.swRegistration) {
        await this.swRegistration.unregister();
        this.swRegistration = null;
        this.log('Service Worker 已注销', 'success');
        this.updateStatus('swStatus', '已注销', 'warning');
        this.updateStatus('cacheCount', '-', '');
      } else {
        this.log('没有注册的 Service Worker', 'warning');
      }
    } catch (error) {
      this.log(`注销 Service Worker 失败: ${error.message}`, 'error');
    }
  }

  /**
   * 测试缓存策略
   */
  async testCacheStrategies() {
    this.log('开始测试缓存策略...', 'info');

    const testResults = {
      static: await this.testStaticResourceCaching(),
      api: await this.testApiCaching(),
      offline: await this.testOfflineMode()
    };

    this.displayTestResults(testResults);
  }

  /**
   * 测试静态资源缓存
   */
  async testStaticResources() {
    this.log('测试静态资源缓存...', 'info');

    const staticResources = [
      '/service-worker/demo/index.html',
      '/service-worker/demo/demo.js',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
    ];

    const results = [];

    for (const url of staticResources) {
      try {
        const startTime = performance.now();
        const response = await fetch(url);
        const endTime = performance.now();

        const result = {
          url,
          status: response.status,
          time: Math.round(endTime - startTime),
          cached: response.headers.get('X-Served-By') === 'cache',
          strategy: response.headers.get('X-Cache-Strategy') || 'unknown'
        };

        results.push(result);

        this.log(`静态资源: ${url} - ${result.cached ? '缓存' : '网络'} (${result.time}ms)`,
          result.cached ? 'success' : 'info');

      } catch (error) {
        this.log(`静态资源测试失败: ${url} - ${error.message}`, 'error');
        results.push({
          url,
          status: 'error',
          time: 0,
          cached: false,
          strategy: 'error',
          error: error.message
        });
      }
    }

    return results;
  }

  /**
   * 测试 API 请求缓存
   */
  async testApiRequests() {
    this.log('测试 API 请求缓存...', 'info');

    // 模拟 API 请求
    const apiEndpoints = [
      '/api/users',
      '/api/posts',
      '/api/analytics',
      '/api/config'
    ];

    const results = [];

    for (const endpoint of apiEndpoints) {
      try {
        const startTime = performance.now();
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const endTime = performance.now();

        const result = {
          url: endpoint,
          status: response.status,
          time: Math.round(endTime - startTime),
          cached: response.headers.get('X-Served-By') === 'cache',
          strategy: response.headers.get('X-Cache-Strategy') || 'unknown'
        };

        results.push(result);

        this.log(`API 请求: ${endpoint} - ${result.cached ? '缓存' : '网络'} (${result.time}ms)`,
          result.cached ? 'success' : 'info');

      } catch (error) {
        this.log(`API 请求测试失败: ${endpoint} - ${error.message}`, 'error');
        results.push({
          url: endpoint,
          status: 'error',
          time: 0,
          cached: false,
          strategy: 'error',
          error: error.message
        });
      }
    }

    return results;
  }

  /**
   * 测试离线模式
   */
  async testOfflineMode() {
    this.log('测试离线模式...', 'info');

    // 模拟离线状态
    const originalOnline = navigator.onLine;
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false
    });

    try {
      const response = await fetch('/api/test');
      const result = {
        offline: true,
        status: response.status,
        cached: response.headers.get('X-Served-By') === 'cache',
        strategy: response.headers.get('X-Cache-Strategy') || 'unknown'
      };

      this.log(`离线模式测试: ${result.cached ? '使用缓存' : '请求失败'}`,
        result.cached ? 'success' : 'warning');

      return result;
    } catch (error) {
      this.log(`离线模式测试: ${error.message}`, 'warning');
      return {
        offline: true,
        status: 'error',
        cached: false,
        strategy: 'error',
        error: error.message
      };
    } finally {
      // 恢复在线状态
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: originalOnline
      });
    }
  }

  /**
   * 清空所有缓存
   */
  async clearAllCaches() {
    try {
      this.log('清空所有缓存...', 'info');

      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(name => caches.delete(name))
        );

        this.log(`已清空 ${cacheNames.length} 个缓存`, 'success');
        this.updateStatus('cacheCount', '0', 'success');
      } else {
        this.log('浏览器不支持 Cache API', 'error');
      }
    } catch (error) {
      this.log(`清空缓存失败: ${error.message}`, 'error');
    }
  }

  /**
   * 更新缓存信息
   */
  async updateCacheInfo() {
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        let totalEntries = 0;

        for (const name of cacheNames) {
          const cache = await caches.open(name);
          const keys = await cache.keys();
          totalEntries += keys.length;
        }

        this.updateStatus('cacheCount', totalEntries.toString(), 'success');
      }
    } catch (error) {
      this.log(`更新缓存信息失败: ${error.message}`, 'error');
    }
  }

  /**
   * 更新网络状态
   */
  updateNetworkStatus(isOnline) {
    const status = isOnline ? '在线' : '离线';
    const className = isOnline ? 'success' : 'error';

    this.updateStatus('networkStatus', status, className);

    if (!isOnline) {
      this.offlineIndicator.classList.add('show');
    } else {
      this.offlineIndicator.classList.remove('show');
    }
  }

  /**
   * 更新 Service Worker 状态
   */
  async updateServiceWorkerStatus() {
    try {
      if (navigator.serviceWorker.controller) {
        this.updateStatus('swStatus', '已激活', 'success');
        await this.updateCacheInfo();
      } else {
        this.updateStatus('swStatus', '未激活', 'warning');
      }

      this.updateStatus('lastUpdate', new Date().toLocaleTimeString(), '');
    } catch (error) {
      // 静默处理错误
    }
  }

  /**
   * 更新状态显示
   */
  updateStatus(elementId, value, className = '') {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = value;
      element.className = `status-value ${className}`;
    }
  }

  /**
   * 添加日志
   */
  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.innerHTML = `
            <span class="log-timestamp">[${timestamp}]</span> ${message}
        `;

    this.logContainer.appendChild(logEntry);
    this.logContainer.scrollTop = this.logContainer.scrollHeight;
  }

  /**
   * 清空日志
   */
  clearLogs() {
    this.logContainer.innerHTML = `
            <div class="log-entry info">
                <span class="log-timestamp">[系统]</span> 日志已清空
            </div>
        `;
  }

  /**
   * 显示测试结果
   */
  displayTestResults(results) {
    this.testResults.innerHTML = '';

    // 静态资源测试结果
    if (results.static) {
      const staticCard = this.createTestResultCard('静态资源测试', results.static);
      this.testResults.appendChild(staticCard);
    }

    // API 测试结果
    if (results.api) {
      const apiCard = this.createTestResultCard('API 请求测试', results.api);
      this.testResults.appendChild(apiCard);
    }

    // 离线模式测试结果
    if (results.offline) {
      const offlineCard = this.createTestResultCard('离线模式测试', [results.offline]);
      this.testResults.appendChild(offlineCard);
    }
  }

  /**
   * 创建测试结果卡片
   */
  createTestResultCard(title, results) {
    const card = document.createElement('div');
    card.className = 'test-result';

    const totalTests = results.length;
    const successfulTests = results.filter(r => r.status === 200 || r.cached).length;
    const cachedTests = results.filter(r => r.cached).length;
    const avgTime = results.reduce((sum, r) => sum + (r.time || 0), 0) / totalTests;

    card.innerHTML = `
            <h4>${title}</h4>
            <div class="test-metric">
                <span class="metric-label">总测试数:</span>
                <span class="metric-value">${totalTests}</span>
            </div>
            <div class="test-metric">
                <span class="metric-label">成功数:</span>
                <span class="metric-value success">${successfulTests}</span>
            </div>
            <div class="test-metric">
                <span class="metric-label">缓存命中:</span>
                <span class="metric-value success">${cachedTests}</span>
            </div>
            <div class="test-metric">
                <span class="metric-label">平均时间:</span>
                <span class="metric-value">${Math.round(avgTime)}ms</span>
            </div>
        `;

    return card;
  }
}

// 全局函数，供 HTML 调用
let demo;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  demo = new ServiceWorkerDemo();
});

// 全局函数
function registerSW() {
  demo.registerSW();
}

function testCacheStrategies() {
  demo.testCacheStrategies();
}

function testStaticResources() {
  demo.testStaticResources();
}

function testApiRequests() {
  demo.testApiRequests();
}

function testOfflineMode() {
  demo.testOfflineMode();
}

function clearAllCaches() {
  demo.clearAllCaches();
}

function unregisterSW() {
  demo.unregisterSW();
}

function clearLogs() {
  demo.clearLogs();
}
