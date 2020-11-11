import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/Seo";

const InfluencerTemplate = props => {
  const {
    location,
    data: {
      site: {
        siteMetadata: { title: siteTitle }
      },
      markdownRemark: {
        excerpt,
        html,
        frontmatter: { title, description, thumbnail, hns, dns }
      }
    }
  } = props;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} description={description || excerpt} />
      <article className={`post-content`}>
        {thumbnail && (
          <div className="post-content-header-image">
            <Img
              // className="kg-image"
              fixed={thumbnail.childImageSharp.fixed}
              alt={title}
            />
          </div>
        )} 
        <header className="post-content-header">
          <h1 className="post-content-title">{title}</h1>
          {hns && (
            <h5 className="post-content-hns-domain">
              <a href={`http://${hns}`} target="_blank"> {hns} </a>
            </h5>)}
          {description && <h2 className="post-content-excerpt">{description}</h2>}
        </header>

        {/* {thumbnail && (
          <div className="post-content-image">
            <Img
              className="kg-image"
              fluid={thumbnail.childImageSharp.fluid}
              alt={title}
            />
          </div>
        )} */}

        <div
          className="post-content-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <footer className="post-content-footer">
          <a
            href={`http://${hns || dns}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Visit {title}</button>
          </a>
        </footer>
      </article>
    </Layout>
  );
};

export default InfluencerTemplate;

export const pageQuery = graphql`
  query InfluencerBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        dateAdded
        description
        dns
        hns
        thumbnail {
          childImageSharp {
            fixed(width: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
