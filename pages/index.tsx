import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import Thumbnail from '../components/Thumbnail';
import usePagination from '../hooks/usePagination';
import { IPost } from '../types/post';
import { SITE_NAME } from '../utils/constants';
import { getAllPosts } from '../utils/mdxUtils';

type Props = {
  posts: IPost[];
};

const Index: React.FC<Props> = ({ posts }: Props) => {
  const { currentPage, currentData, maxPage, setElement } = usePagination(
    posts,
    2,
    1.0
  );

  const currentPosts = currentData();

  return (
    <Layout>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>

      <h1 className="text-4xl font-bold mb-4">Recipes</h1>

      <div className="space-y-12">
        {currentPosts.map((post) => (
          <div key={post.slug}>
            <div className="mb-4">
              <Thumbnail
                slug={post.slug}
                title={post.title}
                src={post.thumbnail}
              />
            </div>

            <h2 className="text-2xl font-bold mb-4">
              <Link href={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </h2>

            <p>{post.description}</p>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        maxPage={maxPage}
        setElement={setElement}
      />
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts([
    'slug',
    'date',
    'thumbnail',
    'title',
    'description',
  ]);

  return { props: { posts } };
};
