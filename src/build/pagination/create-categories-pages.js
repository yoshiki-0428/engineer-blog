module.exports = async (graphql, actions) => {
  const { kebabCase } = require('lodash/string');
  const config = require('../../../loadYaml.js');
  const path = require('path');
  const { createPage } = actions;
  const { postsPerPage } = config.siteConfig;

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
      ) {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  result.data.allMarkdownRemark.group.forEach((category) => {
    const numPages = Math.ceil(category.totalCount / postsPerPage);
    const categorySlug = `/category/${kebabCase(category.fieldValue)}`;

    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: i === 0 ? categorySlug : `${categorySlug}/page/${i}`,
        component: path.resolve('./src/templates/categories-list-template.js'),
        context: {
          category: category.fieldValue,
          currentPage: i,
          postsLimit: postsPerPage,
          postsOffset: i * postsPerPage,
          prevPagePath: i <= 1 ? categorySlug : `${categorySlug}/page/${i - 1}`,
          nextPagePath: `${categorySlug}/page/${i + 1}`,
          hasPrevPage: i !== 0,
          hasNextPage: i !== numPages - 1
        }
      });
    }
  });
};
