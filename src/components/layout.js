import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Menu } from "./Menu"

const Layout = props => {
  const { children } = props
  const { site: { siteMetadata: { title } } } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }`)
  return (
    <div className="site-wrapper">
      <Menu title={title} />
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      <footer className="site-foot">
        &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link>
      </footer>
    </div>
  )
}

export default Layout
