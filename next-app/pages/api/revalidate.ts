import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 检查请求方法
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // 验证密钥（安全措施）
  const { secret, path } = req.body

  if (secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  if (!path) {
    return res.status(400).json({ message: 'Path is required' })
  }

  try {
    // 重新生成指定路径
    await res.revalidate(path)

    return res.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return res.status(500).json({
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error'
    })
  }
} 