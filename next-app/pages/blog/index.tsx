import { NextPage } from 'next';
import Head from 'next/head';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
}

const BlogPage: NextPage = () => {
  // 模拟博客文章数据
  const posts: BlogPost[] = [
    {
      id: 1,
      title: 'Next.js 入门指南',
      excerpt: '学习如何使用 Next.js 构建现代化的 Web 应用...'
    },
    {
      id: 2,
      title: 'TypeScript 最佳实践',
      excerpt: '探索 TypeScript 的高级特性和最佳实践...'
    },
    {
      id: 3,
      title: 'React Hooks 详解',
      excerpt: '深入了解 React Hooks 的使用方法和注意事项...'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>博客文章列表</title>
        <meta name="description" content="查看我们的最新博客文章" />
      </Head>

      <h1 className="text-3xl font-bold mb-8">博客文章</h1>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
            <a
              href={`/blog/${post.id}`}
              className="mt-4 inline-block text-blue-600 hover:text-blue-800"
            >
              阅读更多 →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage; 