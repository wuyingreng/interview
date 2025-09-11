/**
 * Service Worker 主文件
 * 实现多种缓存策略，包括强缓存和协商缓存
 */

// 版本控制
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `app-cache-${CACHE_VERSION}`;

// 缓存配置
const CACHE_CONFIG = {
  // 强缓存资源 - 版本化资源，可以长期缓存
  STRONG_CACHE: [
    '/',
    '/static/js/bundle.js',
    '/static/css/main.css',
    '/static/media/logo.svg',
    '/manifest.json'
  ],

  // 协商缓存资源 - 动态内容，需要检查更新
  NEGOTIATED_CACHE: [
    '/api/users',
    '/api/posts',
    '/api/analytics',
    '/api/config'
  ],

  // 不缓存的资源
  NO_CACHE: [
    '/api/auth/login',
    '/api/auth/logout',
    '/api/payment',
    '/api/upload'
  ]
};

// 缓存策略配置
const CACHE_STRATEGIES = {
  // 强缓存策略 - Cache First
  CACHE_FIRST: 'cache-first',
  // 协商缓存策略 - Network First
  NETWORK_FIRST: 'network-first',
  // 仅网络策略
  NETWORK_ONLY: 'network-only',
  // 仅缓存策略
  CACHE_ONLY: 'cache-only',
  // 网络优先，缓存备用
  NETWORK_FIRST_WITH_FALLBACK: 'network-first-with-fallback'
};

/**
 * Service Worker 安装事件
 * 预缓存关键资源
 */
self.addEventListener('install', event => {
  console.log('[SW] Service Worker 安装中...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] 开始预缓存关键资源');
        return cache.addAll(CACHE_CONFIG.STRONG_CACHE);
      })
      .then(() => {
        console.log('[SW] 关键资源预缓存完成');
        // 立即激活新的 Service Worker
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] 预缓存失败:', error);
      })
  );
});

/**
 * Service Worker 激活事件
 * 清理旧缓存
 */
self.addEventListener('activate', event => {
  console.log('[SW] Service Worker 激活中...');

  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('[SW] 删除旧缓存:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] 旧缓存清理完成');
        // 立即控制所有客户端
        return self.clients.claim();
      })
  );
});

/**
 * 网络请求拦截
 * 根据资源类型应用不同的缓存策略
 */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 只处理同源请求
  if (url.origin !== location.origin) {
    return;
  }

  // 根据请求路径确定缓存策略
  const strategy = getCacheStrategy(request);

  console.log(`[SW] 请求: ${request.url}, 策略: ${strategy}`);

  event.respondWith(
    handleRequest(request, strategy)
  );
});

/**
 * 根据请求确定缓存策略
 */
function getCacheStrategy(request) {
  const url = request.url;

  // 静态资源 - 强缓存
  if (isStaticResource(url)) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // API 请求 - 协商缓存
  if (isApiRequest(url)) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // 敏感操作 - 仅网络
  if (isSensitiveRequest(url)) {
    return CACHE_STRATEGIES.NETWORK_ONLY;
  }

  // 默认策略
  return CACHE_STRATEGIES.NETWORK_FIRST_WITH_FALLBACK;
}

/**
 * 判断是否为静态资源
 */
function isStaticResource(url) {
  return CACHE_CONFIG.STRONG_CACHE.some(pattern => url.includes(pattern)) ||
    url.includes('/static/') ||
    url.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/);
}

/**
 * 判断是否为 API 请求
 */
function isApiRequest(url) {
  return CACHE_CONFIG.NEGOTIATED_CACHE.some(pattern => url.includes(pattern)) ||
    url.includes('/api/');
}

/**
 * 判断是否为敏感请求
 */
function isSensitiveRequest(url) {
  return CACHE_CONFIG.NO_CACHE.some(pattern => url.includes(pattern));
}

/**
 * 处理请求的核心逻辑
 */
async function handleRequest(request, strategy) {
  try {
    switch (strategy) {
      case CACHE_STRATEGIES.CACHE_FIRST:
        return await cacheFirstStrategy(request);

      case CACHE_STRATEGIES.NETWORK_FIRST:
        return await networkFirstStrategy(request);

      case CACHE_STRATEGIES.NETWORK_ONLY:
        return await networkOnlyStrategy(request);

      case CACHE_STRATEGIES.CACHE_ONLY:
        return await cacheOnlyStrategy(request);

      case CACHE_STRATEGIES.NETWORK_FIRST_WITH_FALLBACK:
        return await networkFirstWithFallbackStrategy(request);

      default:
        return await networkFirstWithFallbackStrategy(request);
    }
  } catch (error) {
    console.error('[SW] 请求处理失败:', error);
    return new Response('Service Worker 错误', { status: 500 });
  }
}

/**
 * 强缓存策略 - Cache First
 * 适用于：静态资源、版本化资源、不经常变化的资源
 * 逻辑：先查缓存，缓存命中直接返回，否则请求网络并缓存
 */
async function cacheFirstStrategy(request) {
  console.log('[SW] 使用强缓存策略 (Cache First)');

  // 1. 先查缓存
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    console.log('[SW] 缓存命中:', request.url);
    return cachedResponse;
  }

  // 2. 缓存未命中，请求网络
  console.log('[SW] 缓存未命中，请求网络:', request.url);
  const networkResponse = await fetch(request);

  // 3. 检查响应是否有效
  if (networkResponse && networkResponse.status === 200) {
    // 4. 克隆响应并缓存
    const responseToCache = networkResponse.clone();
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, responseToCache);
    console.log('[SW] 资源已缓存:', request.url);
  }

  return networkResponse;
}

/**
 * 协商缓存策略 - Network First
 * 适用于：API 数据、动态内容、需要实时性的资源
 * 逻辑：先请求网络，网络失败时使用缓存
 */
async function networkFirstStrategy(request) {
  console.log('[SW] 使用协商缓存策略 (Network First)');

  try {
    // 1. 先尝试网络请求
    const networkResponse = await fetch(request);

    // 2. 检查响应是否有效
    if (networkResponse && networkResponse.status === 200) {
      // 3. 克隆响应并更新缓存
      const responseToCache = networkResponse.clone();
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, responseToCache);
      console.log('[SW] 网络请求成功，缓存已更新:', request.url);
      return networkResponse;
    }

    throw new Error('网络响应无效');
  } catch (error) {
    console.log('[SW] 网络请求失败，尝试使用缓存:', request.url);

    // 4. 网络失败，尝试使用缓存
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] 使用缓存响应:', request.url);
      return cachedResponse;
    }

    // 5. 缓存也没有，返回错误
    throw new Error('网络和缓存都不可用');
  }
}

/**
 * 仅网络策略 - Network Only
 * 适用于：登录、支付、上传等敏感操作
 * 逻辑：只使用网络，不使用缓存
 */
async function networkOnlyStrategy(request) {
  console.log('[SW] 使用仅网络策略 (Network Only)');

  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      console.log('[SW] 网络请求成功:', request.url);
      return networkResponse;
    }
    throw new Error('网络响应无效');
  } catch (error) {
    console.error('[SW] 网络请求失败:', request.url, error);
    return new Response('网络不可用', { status: 503 });
  }
}

/**
 * 仅缓存策略 - Cache Only
 * 适用于：离线模式、预加载资源
 * 逻辑：只使用缓存，不请求网络
 */
async function cacheOnlyStrategy(request) {
  console.log('[SW] 使用仅缓存策略 (Cache Only)');

  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    console.log('[SW] 缓存命中:', request.url);
    return cachedResponse;
  }

  console.log('[SW] 缓存未命中:', request.url);
  return new Response('资源未缓存', { status: 404 });
}

/**
 * 网络优先，缓存备用策略
 * 适用于：一般性内容，平衡性能和实时性
 * 逻辑：先网络，失败时使用缓存，同时更新缓存
 */
async function networkFirstWithFallbackStrategy(request) {
  console.log('[SW] 使用网络优先策略 (Network First with Fallback)');

  try {
    // 1. 尝试网络请求
    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      // 2. 网络成功，更新缓存
      const responseToCache = networkResponse.clone();
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, responseToCache);
      console.log('[SW] 网络请求成功，缓存已更新:', request.url);
      return networkResponse;
    }
  } catch (error) {
    console.log('[SW] 网络请求失败，尝试缓存:', request.url);
  }

  // 3. 网络失败，尝试缓存
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    console.log('[SW] 使用缓存响应:', request.url);
    return cachedResponse;
  }

  // 4. 都没有，返回离线页面
  return new Response('离线模式', { status: 503 });
}

/**
 * 消息处理
 * 处理来自主线程的消息
 */
self.addEventListener('message', event => {
  const { type, data } = event.data;

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    case 'CLEAR_CACHE':
      clearAllCaches();
      break;

    case 'GET_CACHE_STATUS':
      getCacheStatus().then(status => {
        event.ports[0].postMessage(status);
      });
      break;

    default:
      console.log('[SW] 未知消息类型:', type);
  }
});

/**
 * 清理所有缓存
 */
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
  console.log('[SW] 所有缓存已清理');
}

/**
 * 获取缓存状态
 */
async function getCacheStatus() {
  const cacheNames = await caches.keys();
  const status = {};

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    status[cacheName] = {
      size: keys.length,
      urls: keys.map(request => request.url)
    };
  }

  return status;
}

console.log('[SW] Service Worker 已加载');
