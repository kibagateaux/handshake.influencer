import React, { Component } from "react";
import { Link } from "gatsby";

class Tags extends Component {
  render() {
    const { tags, category } = this.props;
    return (
      <div className="post-card-tags">
        {tags && tags.map(tag => (
          <Link
            key={tag}
            className="post-card-tag-link"
            style={{ textDecoration: "none" }}
            to={'/'+category}
          >
            #{tag}
          </Link>
        ))}
      </div>
    );
  }
}

export default Tags;
