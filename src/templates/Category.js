import React from "react"
import { graphql } from "gatsby"
import _ from 'lodash'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Card } from "../components/Card"

import "../style/normalize.css"
import "../style/all.scss"

const CategoryTemplate = (props) => {
  const {
    data,
    pageContext: { category },
  } = props
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO /> {/* TODO SEOING */}
      <center><h1> {_.upperFirst(category)} Influencing Handshake</h1></center>
      <div className="post-feed">
        {posts.map(({ node }, i) => {
          return (
            <Card
              key={node.fields.slug}
              largeDisplay={(i + 1) % 3 === 0 ? true : false}
              node={node}
              postClass={`post`}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export const categoryQuery = graphql`
  query PostsByCategory($category: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
      sort: {
        fields: [frontmatter___dateAdded], order: DESC
      }
      limit: 100
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
`

export default CategoryTemplate
