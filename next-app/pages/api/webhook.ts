import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // 验证webhook签名（例如GitHub或Contentful的验证方式）
    const signature = req.headers['x-hub-signature-256'] as string
    const body = JSON.stringify(req.body)

    if (process.env.WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.WEBHOOK_SECRET)
        .update(body)
        .digest('hex')

      if (`sha256=${expectedSignature}` !== signature) {
        return res.status(401).json({ message: 'Invalid signature' })
      }
    }

    // 解析webhook负载
    const { action, repository, content_type } = req.body

    // 根据不同的事件类型决定要重新生成的路径
    const pathsToRevalidate: string[] = []

    // 示例：根据内容类型决定重新生成哪些页面
    if (content_type === 'user' || action === 'published') {
      pathsToRevalidate.push('/users')
    }

    if (content_type === 'blog' || repository?.name === 'blog-content') {
      pathsToRevalidate.push('/blog')
    }

    // 重新生成相关页面
    const revalidationResults = await Promise.allSettled(
      pathsToRevalidate.map(async (path) => {
        await res.revalidate(path)
        return path
      })
    )

    // 记录结果
    const successful = revalidationResults
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as any).value)

    const failed = revalidationResults
      .filter((result) => result.status === 'rejected')
      .map((result) => (result as any).reason)

    console.log('Webhook processed:', {
      action,
      content_type,
      successful,
      failed,
      timestamp: new Date().toISOString()
    })

    return res.json({
      message: 'Webhook processed successfully',
      revalidated: successful,
      failed: failed.length > 0 ? failed : undefined,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 