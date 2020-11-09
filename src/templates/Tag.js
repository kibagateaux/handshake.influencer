import React from "react";
import { graphql } from "gatsby";
import _ from "lodash";

import Layout from "../components/layout";
import SEO from "../components/Seo";
import Card from "../components/Card";
class TagPageTemplate extends React.Component {
  render() {
    const props = this.props;
    const tag = this.props.pageContext.tag;
    const posts = this.props.data.allMarkdownRemark.edges;
    const siteTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          // title={`#${tag}`}
          title={`#${_.upperFirst(tag)}`}
          keywords={[tag, "handshake", "blockchain", "internet freedom"]}
        />
        <header className="tag-page-head">
          <h1 className="page-head-title">
            #{tag}({props.data.allMarkdownRemark.totalCount})
          </h1>
        </header>
        <div className="post-feed">
          {posts.map(({ node }) => {
            return (
              <Card key={node.fields.slug} node={node} postClass={`post`} />
            );
          })}
        </div>
      </Layout>
    );
  }
}

export default TagPageTemplate;

export const pageQuery = graphql`
  query PostByTag($tag: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { fields: [frontmatter___dateAdded], order: DESC }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            dateAdded
            title
            description
            tags
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
