/**
 * Service Worker 缓存配置
 * 定义不同资源类型的缓存策略和配置
 */

// 缓存策略枚举
export const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',           // 强缓存 - 缓存优先
  NETWORK_FIRST: 'network-first',       // 协商缓存 - 网络优先
  NETWORK_ONLY: 'network-only',         // 仅网络 - 不缓存
  CACHE_ONLY: 'cache-only',             // 仅缓存 - 离线模式
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate' // 过期重新验证
};

// 资源类型枚举
export const RESOURCE_TYPES = {
  STATIC: 'static',           // 静态资源
  API: 'api',                 // API 接口
  HTML: 'html',               // HTML 页面
  IMAGE: 'image',             // 图片资源
  FONT: 'font',               // 字体资源
  SCRIPT: 'script',           // JavaScript 文件
  STYLE: 'style',             // CSS 文件
  MANIFEST: 'manifest',       // 应用清单
  SENSITIVE: 'sensitive'      // 敏感操作
};

// 缓存配置
export const CACHE_CONFIG = {
  // 版本控制
  VERSION: 'v1.0.0',

  // 缓存名称前缀
  CACHE_PREFIX: 'sw-cache',

  // 默认缓存时间（毫秒）
  DEFAULT_TTL: {
    [RESOURCE_TYPES.STATIC]: 7 * 24 * 60 * 60 * 1000,    // 7天
    [RESOURCE_TYPES.API]: 5 * 60 * 1000,                  // 5分钟
    [RESOURCE_TYPES.HTML]: 60 * 60 * 1000,                // 1小时
    [RESOURCE_TYPES.IMAGE]: 24 * 60 * 60 * 1000,          // 1天
    [RESOURCE_TYPES.FONT]: 30 * 24 * 60 * 60 * 1000,      // 30天
    [RESOURCE_TYPES.SCRIPT]: 7 * 24 * 60 * 60 * 1000,     // 7天
    [RESOURCE_TYPES.STYLE]: 7 * 24 * 60 * 60 * 1000,      // 7天
    [RESOURCE_TYPES.MANIFEST]: 24 * 60 * 60 * 1000,       // 1天
    [RESOURCE_TYPES.SENSITIVE]: 0                          // 不缓存
  },

  // 最大缓存条目数
  MAX_ENTRIES: {
    [RESOURCE_TYPES.STATIC]: 100,
    [RESOURCE_TYPES.API]: 50,
    [RESOURCE_TYPES.HTML]: 20,
    [RESOURCE_TYPES.IMAGE]: 200,
    [RESOURCE_TYPES.FONT]: 20,
    [RESOURCE_TYPES.SCRIPT]: 50,
    [RESOURCE_TYPES.STYLE]: 30,
    [RESOURCE_TYPES.MANIFEST]: 1,
    [RESOURCE_TYPES.SENSITIVE]: 0
  },

  // 网络超时时间（毫秒）
  NETWORK_TIMEOUT: {
    [RESOURCE_TYPES.STATIC]: 10000,     // 10秒
    [RESOURCE_TYPES.API]: 5000,         // 5秒
    [RESOURCE_TYPES.HTML]: 8000,        // 8秒
    [RESOURCE_TYPES.IMAGE]: 15000,      // 15秒
    [RESOURCE_TYPES.FONT]: 10000,       // 10秒
    [RESOURCE_TYPES.SCRIPT]: 10000,     // 10秒
    [RESOURCE_TYPES.STYLE]: 10000,      // 10秒
    [RESOURCE_TYPES.MANIFEST]: 5000,    // 5秒
    [RESOURCE_TYPES.SENSITIVE]: 30000   // 30秒
  }
};

// 资源匹配规则
export const RESOURCE_RULES = [
  // 静态资源 - 强缓存
  {
    pattern: /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/,
    type: RESOURCE_TYPES.STATIC,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    priority: 1
  },

  // 版本化资源 - 强缓存
  {
    pattern: /\/static\/.*\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/,
    type: RESOURCE_TYPES.STATIC,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    priority: 2
  },

  // API 接口 - 协商缓存
  {
    pattern: /^\/api\//,
    type: RESOURCE_TYPES.API,
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    priority: 3
  },

  // HTML 页面 - 网络优先
  {
    pattern: /\.html$|^\/$|^\/[^\/]*$/,
    type: RESOURCE_TYPES.HTML,
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    priority: 4
  },

  // 图片资源 - 缓存优先
  {
    pattern: /\.(png|jpg|jpeg|gif|svg|webp|avif)$/,
    type: RESOURCE_TYPES.IMAGE,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    priority: 5
  },

  // 字体资源 - 强缓存
  {
    pattern: /\.(woff|woff2|ttf|eot|otf)$/,
    type: RESOURCE_TYPES.FONT,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    priority: 6
  },

  // JavaScript 文件 - 强缓存
  {
    pattern: /\.js$/,
    type: RESOURCE_TYPES.SCRIPT,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    priority: 7
  },

  // CSS 文件 - 强缓存
  {
    pattern: /\.css$/,
    type: RESOURCE_TYPES.STYLE,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    priority: 8
  },

  // 应用清单 - 强缓存
  {
    pattern: /manifest\.json$/,
    type: RESOURCE_TYPES.MANIFEST,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    priority: 9
  },

  // 敏感操作 - 仅网络
  {
    pattern: /\/api\/(auth|payment|upload|admin)/,
    type: RESOURCE_TYPES.SENSITIVE,
    strategy: CACHE_STRATEGIES.NETWORK_ONLY,
    priority: 10
  }
];

// 预缓存资源列表
export const PRECACHE_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/static/media/logo.svg',
  '/offline.html'
];

// 运行时缓存资源列表
export const RUNTIME_CACHE_RESOURCES = [
  {
    urlPattern: /^\/api\/users/,
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    options: {
      cacheName: 'api-users',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 5 * 60 // 5分钟
      }
    }
  },
  {
    urlPattern: /^\/api\/posts/,
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    options: {
      cacheName: 'api-posts',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 10 * 60 // 10分钟
      }
    }
  },
  {
    urlPattern: /^\/api\/analytics/,
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    options: {
      cacheName: 'api-analytics',
      expiration: {
        maxEntries: 20,
        maxAgeSeconds: 2 * 60 // 2分钟
      }
    }
  },
  {
    urlPattern: /\.(png|jpg|jpeg|gif|svg|webp)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    options: {
      cacheName: 'images',
      expiration: {
        maxEntries: 200,
        maxAgeSeconds: 24 * 60 * 60 // 1天
      }
    }
  }
];

/**
 * 获取资源类型
 * @param {string} url - 资源URL
 * @returns {string} - 资源类型
 */
export function getResourceType(url) {
  for (const rule of RESOURCE_RULES.sort((a, b) => a.priority - b.priority)) {
    if (rule.pattern.test(url)) {
      return rule.type;
    }
  }
  return RESOURCE_TYPES.STATIC; // 默认类型
}

/**
 * 获取缓存策略
 * @param {string} url - 资源URL
 * @returns {string} - 缓存策略
 */
export function getCacheStrategy(url) {
  for (const rule of RESOURCE_RULES.sort((a, b) => a.priority - b.priority)) {
    if (rule.pattern.test(url)) {
      return rule.strategy;
    }
  }
  return CACHE_STRATEGIES.NETWORK_FIRST; // 默认策略
}

/**
 * 获取缓存TTL
 * @param {string} resourceType - 资源类型
 * @returns {number} - TTL时间（毫秒）
 */
export function getCacheTTL(resourceType) {
  return CACHE_CONFIG.DEFAULT_TTL[resourceType] || CACHE_CONFIG.DEFAULT_TTL[RESOURCE_TYPES.STATIC];
}

/**
 * 获取最大缓存条目数
 * @param {string} resourceType - 资源类型
 * @returns {number} - 最大条目数
 */
export function getMaxEntries(resourceType) {
  return CACHE_CONFIG.MAX_ENTRIES[resourceType] || CACHE_CONFIG.MAX_ENTRIES[RESOURCE_TYPES.STATIC];
}

/**
 * 获取网络超时时间
 * @param {string} resourceType - 资源类型
 * @returns {number} - 超时时间（毫秒）
 */
export function getNetworkTimeout(resourceType) {
  return CACHE_CONFIG.NETWORK_TIMEOUT[resourceType] || CACHE_CONFIG.NETWORK_TIMEOUT[RESOURCE_TYPES.STATIC];
}

/**
 * 生成缓存名称
 * @param {string} resourceType - 资源类型
 * @returns {string} - 缓存名称
 */
export function getCacheName(resourceType) {
  return `${CACHE_CONFIG.CACHE_PREFIX}-${resourceType}-${CACHE_CONFIG.VERSION}`;
}

/**
 * 检查是否为预缓存资源
 * @param {string} url - 资源URL
 * @returns {boolean} - 是否为预缓存资源
 */
export function isPrecacheResource(url) {
  return PRECACHE_RESOURCES.some(resource => url.includes(resource));
}

/**
 * 检查是否为运行时缓存资源
 * @param {string} url - 资源URL
 * @returns {Object|null} - 运行时缓存配置或null
 */
export function getRuntimeCacheConfig(url) {
  for (const config of RUNTIME_CACHE_RESOURCES) {
    if (config.urlPattern.test(url)) {
      return config;
    }
  }
  return null;
}

/**
 * 获取所有缓存配置
 * @returns {Object} - 完整配置对象
 */
export function getAllConfig() {
  return {
    strategies: CACHE_STRATEGIES,
    types: RESOURCE_TYPES,
    config: CACHE_CONFIG,
    rules: RESOURCE_RULES,
    precache: PRECACHE_RESOURCES,
    runtime: RUNTIME_CACHE_RESOURCES
  };
}

/**
 * 验证配置
 * @param {Object} config - 配置对象
 * @returns {Object} - 验证结果
 */
export function validateConfig(config) {
  const errors = [];
  const warnings = [];

  // 检查必需字段
  if (!config.VERSION) {
    errors.push('VERSION 是必需的');
  }

  if (!config.CACHE_PREFIX) {
    errors.push('CACHE_PREFIX 是必需的');
  }

  // 检查TTL配置
  for (const [type, ttl] of Object.entries(config.DEFAULT_TTL || {})) {
    if (typeof ttl !== 'number' || ttl < 0) {
      errors.push(`${type} 的 TTL 必须是正数`);
    }
  }

  // 检查最大条目数配置
  for (const [type, maxEntries] of Object.entries(config.MAX_ENTRIES || {})) {
    if (typeof maxEntries !== 'number' || maxEntries < 0) {
      errors.push(`${type} 的最大条目数必须是非负数`);
    }
  }

  // 检查网络超时配置
  for (const [type, timeout] of Object.entries(config.NETWORK_TIMEOUT || {})) {
    if (typeof timeout !== 'number' || timeout <= 0) {
      errors.push(`${type} 的网络超时时间必须是正数`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// 默认导出
export default {
  CACHE_STRATEGIES,
  RESOURCE_TYPES,
  CACHE_CONFIG,
  RESOURCE_RULES,
  PRECACHE_RESOURCES,
  RUNTIME_CACHE_RESOURCES,
  getResourceType,
  getCacheStrategy,
  getCacheTTL,
  getMaxEntries,
  getNetworkTimeout,
  getCacheName,
  isPrecacheResource,
  getRuntimeCacheConfig,
  getAllConfig,
  validateConfig
};
