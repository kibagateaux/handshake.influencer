const path = require(`path`)
const _ = require("lodash");
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const InfluencerPageTemplate = path.resolve(`./src/templates/Influencer.js`)
  const CategoryPageTemplate = path.resolve(`./src/templates/Category.js`)
  const TagPageTemplate = path.resolve(`./src/templates/Tag.js`)
  const tagSet = new Set();
  const allCategories = new Set();
  
  const influencerPages = await graphql(`{
    allMarkdownRemark(
      sort: { fields: [frontmatter___dateAdded], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            category
          }
        }
      }
    }
  }`).then(result => {
    if (result.errors) {
      throw result.errors
    }
    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      // Get tags for tags pages.
      if (post.node.frontmatter.tags) {
        post.node.frontmatter.tags.forEach(tag => {
          tagSet.add(tag);
        });
      }

      // pull category to generate aggregator pages
      const category = post.node.frontmatter.category
        ? post.node.frontmatter.category.toLowerCase()
        : 'influencers'
      console.log('\n\nCreating Influencer Page\n', post.node);
      allCategories.add(category);

      createPage({
        path: category + post.node.fields.slug,
        component: InfluencerPageTemplate,
        context: {
          slug: post.node.fields.slug,
        },
      })
    })
    return posts
  })

  const categoryPages = allCategories.forEach((category) => {
    console.log('\ncreating Cateogry page for: ', category);
    createPage({
      path: category,
      component: CategoryPageTemplate,
      context: {
        category
      }
    })
  })

  // Create tags pages.
  const tagPages = tagSet.forEach(tag =>
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: TagPageTemplate,
      context: {
        tag
      }
    }));



  console.log('all categories', allCategories);
  const allPages = [
    influencerPages,
    // tagPages,
    categoryPages
  ]
  return Promise.all(allPages)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
