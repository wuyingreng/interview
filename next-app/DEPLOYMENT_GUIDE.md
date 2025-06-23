# 自动构建触发配置指南

## 方案概述

本项目提供了多种方式来实现新内容发布时的自动构建：

### 1. 增量静态再生成（ISR）
- **优点**: 简单易用，自动定期更新
- **缺点**: 有延迟，不是实时的
- **适用场景**: 内容更新频率可预测

```typescript
export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchData()
  return { 
    props: { data },
    revalidate: 60 // 每60秒检查一次
  }
}
```

### 2. 按需重新验证
- **优点**: 实时更新，按需触发
- **缺点**: 需要外部系统集成
- **适用场景**: 需要精确控制更新时机

**使用方式:**
```bash
curl -X POST https://your-site.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "your-secret", "path": "/users"}'
```

### 3. Webhook集成
- **优点**: 与CMS完美集成，自动化程度高
- **缺点**: 需要配置webhook
- **适用场景**: 使用Headless CMS

## 环境变量配置

创建 `.env.local` 文件：

```bash
# 重新验证API的密钥
REVALIDATION_SECRET=your-secret-key-here

# Webhook验证密钥  
WEBHOOK_SECRET=your-webhook-secret-here

# Vercel构建Hook URL (可选)
VERCEL_BUILD_HOOK=https://api.vercel.com/v1/integrations/deploy/your-hook-id
```

## Vercel部署配置

### 自动部署触发器

1. **Git推送触发**: 
   - 推送到main分支自动部署
   - 在Vercel Dashboard中配置

2. **Build Hook触发**:
   ```bash
   # 获取Build Hook URL
   # 在Vercel项目设置 -> Git -> Deploy Hooks中创建
   
   # 触发构建
   curl -X POST https://api.vercel.com/v1/integrations/deploy/your-hook-id
   ```

3. **API触发**:
   ```javascript
   // 使用Vercel API触发部署
   const response = await fetch('https://api.vercel.com/v9/projects/your-project/deployments', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       name: 'your-project',
       gitSource: {
         type: 'github',
         repo: 'your-username/your-repo',
         ref: 'main'
       }
     })
   })
   ```

## CMS集成示例

### Contentful
```javascript
// Contentful Webhook配置
{
  "url": "https://your-site.com/api/webhook",
  "httpMethod": "POST",
  "headers": {
    "x-contentful-webhook": "true"
  },
  "topics": ["Entry.publish", "Entry.unpublish"]
}
```

### Strapi
```javascript
// Strapi Webhook配置
{
  "url": "https://your-site.com/api/webhook",
  "events": ["entry.create", "entry.update", "entry.delete"]
}
```

### WordPress (Headless)
```php
// functions.php
add_action('save_post', function($post_id) {
    if (wp_is_post_revision($post_id)) return;
    
    wp_remote_post('https://your-site.com/api/webhook', [
        'body' => json_encode([
            'action' => 'post_updated',
            'post_id' => $post_id
        ]),
        'headers' => [
            'Content-Type' => 'application/json',
            'X-WP-Webhook' => 'true'
        ]
    ]);
});
```

## GitHub Actions集成

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  workflow_dispatch:
  repository_dispatch:
    types: [content-update]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        run: |
          curl -X POST ${{ secrets.VERCEL_BUILD_HOOK }}
```

## 测试自动构建

### 1. 测试ISR
```bash
# 访问页面
curl https://your-site.com/users

# 等待revalidate时间后再次访问
# 查看lastUpdated时间是否更新
```

### 2. 测试按需重新验证
```bash
curl -X POST https://your-site.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "your-secret", "path": "/users"}'
```

### 3. 测试Webhook
```bash
curl -X POST https://your-site.com/api/webhook \
  -H "Content-Type: application/json" \
  -H "x-hub-signature-256: sha256=your-signature" \
  -d '{"action": "published", "content_type": "user"}'
```

## 监控和日志

在Vercel Dashboard中可以查看：
- 构建日志
- 函数调用日志  
- 错误信息
- 性能指标

建议添加日志记录来跟踪重新验证的执行情况。 