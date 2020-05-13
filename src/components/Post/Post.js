// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import styles from './Post.module.scss';
import type { Node } from '../../types';

type Props = {
  post: Node
};

const Post = ({ post }) => {
  const { content, slug, tags, title, date } = post;

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/">All Articles</Link>

      <div className={styles['post__content']}>
        <Content body={content} title={title} />
      </div>

      <div className={styles['post__footer']}>
        <Meta date={date} />
        {tags && <Tags tags={tags.map(t => t.name)} tagSlugs={tags.map(t => t.slug)} />}
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.title} />
      </div>
    </div>
  );
};

export default Post;
