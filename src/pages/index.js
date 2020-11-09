import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/Seo";
import { Card } from "../components/Card";

import "../style/normalize.css";
import "../style/all.scss";

const Home = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout title={siteTitle}>
      {data.site.siteMetadata.description && (
        <div className="container page-head">
          <h1 className="page-head-title">
            {data.site.siteMetadata.description}
          </h1>
        </div>
      )}
      <div className="post-feed">
        {posts.map(({ node }, i) => {
          return (
            <Card
              key={node.fields.slug}
              largeDisplay={(i + 1) % 3 === 0 ? true : false}
              node={node}
              postClass={`post`}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___dateAdded], order: DESC }
    ) {
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
            category
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

export default Home;
