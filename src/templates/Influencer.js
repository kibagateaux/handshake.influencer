import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const InfluencerTemplate = (props) => {
  const {
    location,
    data: {
      site: { siteMetadata: { title: siteTitle } },
      markdownRemark: {
        excerpt,
        html,
        frontmatter: {
          title,
          description,
          thumbnail,
          hns,
          dns,
        }
      }
    }
  } = props

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={title}
        description={description || excerpt}
      />
      <article
        className={`post-content ${thumbnail || `no-image`}`}
      >
        <header className="post-content-header">
          <h1 className="post-content-title">{title}</h1>
          {hns && <h5 className="post-content-hns-domain"> HNS: {hns} </h5>}
        </header>

        {description && (
          <p className="post-content-excerpt">{description}</p>
        )}

        {thumbnail && (
          <div className="post-content-image">
            <Img
              className="kg-image"
              fluid={thumbnail.childImageSharp.fluid}
              alt={title}
            />
          </div>
        )}

        <div
          className="post-content-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <footer className="post-content-footer">
          <a href={`http://${dns}`} target="_blank" rel="noopener noreferrer">
            <button>
              Visit {title}
            </button>
          </a>
        </footer>
      </article>
    </Layout>
  )
}

export default InfluencerTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
            fluid(maxWidth: 1360) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
