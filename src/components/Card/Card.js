import React, { Component } from "react";
import { Link } from "gatsby"
import Tags from "./Tag"

export default props => {
  return (
    <article
      className={`
        post-card
        no-image
        ${props.largeDisplay ? `post-card-large` : 'post-card-small'}
        ${props.postClass}
      `}
      // ${props.node.frontmatter.thumbnail ? `with-image` : `no-image`}
      // style={
      //   props.node.frontmatter.thumbnail && {
      //     backgroundImage: `url(${
      //       props.node.frontmatter.thumbnail.childImageSharp.fluid.src
      //     })`,
      //   }
      // }
    >
      <ContentNoImage content={props}/>
        {/* {
          props.node.frontmatter.thumbnail
            ?(<ContentWithImage props={props}/>)
            :(<ContentNoImage props={props}/>)
        } */}
    </article>
  )
    }

class ContentNoImage extends Component {
  render() {
    const{
      content: {
        node: {
          excerpt,
          fields: { slug },
          frontmatter: {
            tags,
            title,
            category,
            description,
            dateAdded,
          }
        }
      }
    } = this.props;
    const influencerPagePath = `/${category+ slug}`
    return (
      <div className="post-card-content">
        <Tags tags={tags} category={category} />
        <Link to={influencerPagePath} className="post-card-link">
          <h2 className="post-card-title">
            {title}
          </h2>
        </Link>
        {/* <div className="post-card-date">
          Date Added: {dateAdded}
        </div> */}
        <div className="post-card-body">
          {description || excerpt}
        </div>
        <Link
          to={influencerPagePath}
          className="post-card-link post-card-readmore"
        >
          Learn more
        </Link>
      </div>
    );
  }
}

class ContentWithImage extends Component {
  render() {
    const{props}=this.props;
    return (
      <Link to={props.node.fields.slug} className="post-card-link">
        <div className="post-card-content">
          <h2 className="post-card-title">
            {props.node.frontmatter.title || props.node.fields.slug}
          </h2>
        </div>
      </Link>
    );
  }
}
