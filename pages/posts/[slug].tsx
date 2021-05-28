import { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import Directions from '../../components/Directions';
import Ingredients from '../../components/Ingredients';
import Layout from '../../components/Layout';
import Thumbnail from '../../components/Thumbnail';
import { IPost } from '../../types/post';
import { SITE_URL } from '../../utils/constants';
import { getPost, getAllPosts } from '../../utils/mdxUtils';

type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<IPost, 'slug'>;
};

const components = {
  Ingredients,
  Directions,
  Tips: dynamic(() => import('../../components/Tips')),
};

const PostPage: React.FC<Props> = ({ source, frontMatter }: Props) => {
  const ogImage = SITE_URL + frontMatter.thumbnail;

  return (
    <Layout pageTitle={frontMatter.title}>
      <Head>
        <meta
          name="description"
          content={frontMatter.description}
          key="description"
        />
        <meta
          property="og:description"
          content={frontMatter.description}
          key="ogDescription"
        />
        <meta property="og:image" content={ogImage} key="ogImage" />
      </Head>

      <article className="prose prose-green dark:prose-dark">
        <div className="mb-4">
          <Thumbnail title={frontMatter.title} src={frontMatter.thumbnail} />
        </div>

        <h1>{frontMatter.title}</h1>

        <p className="font-bold">yield: {frontMatter.yields}</p>

        <p>{frontMatter.description}</p>

        <MDXRemote {...source} components={components} />
      </article>
    </Layout>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { content, data } = getPost(params?.slug as string);

  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug']);

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
