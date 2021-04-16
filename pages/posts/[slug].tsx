import { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import { MdxRemote } from 'next-mdx-remote/types';

import Directions from '../../components/Directions';
import Ingredients from '../../components/Ingredients';
import Layout from '../../components/Layout';
import Thumbnail from '../../components/Thumbnail';
import { IPost } from '../../types/post';
import { SITE_URL } from '../../utils/constants';
import { getPost, getAllPosts } from '../../utils/mdxUtils';

type Props = {
  source: MdxRemote.Source;
  frontMatter: Omit<IPost, 'slug' | 'content'>;
};

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Ingredients,
  Directions,
  Tips: dynamic(() => import('../../components/Tips')),
};

const PostPage: React.FC<Props> = ({ source, frontMatter }: Props) => {
  const content = hydrate(source, { components });

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

      <article className="prose prose-green">
        <div className="mb-4">
          <Thumbnail title={frontMatter.title} src={frontMatter.thumbnail} />
        </div>

        <h1>{frontMatter.title}</h1>

        <p className="font-bold">yield: {frontMatter.yields}</p>

        <p>{frontMatter.description}</p>

        <div>{content}</div>
      </article>
    </Layout>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { content, data } = getPost(params?.slug as string);

  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

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
