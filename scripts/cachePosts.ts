import fs from 'fs';

import { getAllPosts } from '../utils/mdxUtils';

const stringifyPosts = () =>
  `export const posts = ${JSON.stringify(
    getAllPosts([
      'slug',
      'title',
      'description',
      'ingredients',
      'directions',
      'tips',
      'content',
    ]).map((post) => ({
      slug: post.slug,
      title: post.title.toLowerCase(),
      description: post.description.toLowerCase(),
      ingredients: post.ingredients.toString().toLowerCase(),
      directions: post.directions.toString().toLowerCase(),
      tips: post.tips?.toString().toLowerCase(),
      content: post.content.toLowerCase(),
    }))
  )}`;

fs.writeFile('_cache/posts.ts', stringifyPosts(), (err) => {
  if (err) return console.log(err);
  console.log('All posts cached.');
});
