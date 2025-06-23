import { GetStaticProps } from "next";
import Link from "next/link";

import { User } from "../../interfaces";
import { sampleUserData } from "../../utils/sample-data";
import Layout from "../../components/Layout";
import List from "../../components/List";

type Props = {
  items: User[];
  lastUpdated: string;
};

const WithStaticProps = ({ items, lastUpdated }: Props) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <p>Last updated: {lastUpdated}</p>
    <List items={items} />
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  // 这里可以从API或CMS获取最新数据
  const items: User[] = sampleUserData;

  return {
    props: {
      items,
      lastUpdated: new Date().toISOString()
    },
    // ISR: 每60秒检查一次新内容
    revalidate: 60
  };
};

export default WithStaticProps;
