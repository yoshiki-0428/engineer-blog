// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const PostTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  // const { frontmatter } = data.markdownRemark;
  // const { title: postTitle, description: postDescription, socialImage } = frontmatter;
  // const metaDescription = postDescription !== null ? postDescription : siteSubtitle;
  const blog = data.microcmsBlog;

  return (
    <Layout title={`${blog.title} - ${siteTitle}`} description={'1'} >
      <Post post={blog} />
    </Layout>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
      microcmsBlog(slug: {eq: $slug}) {
          blogId
          category {
              name
              slug
          }
          date
          draft
          slug
          template
          title
          updatedAt
          tags {
              name
              slug
          }
          content
      }
  }
`;

export default PostTemplate;
