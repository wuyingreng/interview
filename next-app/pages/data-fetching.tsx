import { NextPage } from 'next';
import { GetServerSideProps, GetStaticProps } from 'next';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface DataFetchingPageProps {
  posts: Post[];
  timestamp: string;
}

// 方式1：服务端渲染时获取数据
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
      timestamp: new Date().toISOString()
    }
  };
};

// 方式2：静态生成时获取数据
// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//       timestamp: new Date().toISOString()
//     },
//     // 每10秒重新生成页面
//     revalidate: 10
//   };
// };

const DataFetchingPage: NextPage<DataFetchingPageProps> = ({ posts, timestamp }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">数据预取示例</h1>

      <div className="mb-8">
        <p className="text-gray-600">
          数据获取时间: {timestamp}
        </p>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="p-6 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default DataFetchingPage; 