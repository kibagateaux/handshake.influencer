import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import config from "../../../content/meta/config";

const Seo = props => {
  const { data, facebook } = props;
  const Title = (data || {}).title;
  const Description = (data || {}).description;
  const Cover = (data || {}).cover; // TODO make puts src.jpg url not object
  const Slug = (data || {}).slug;

  const title = Title ? `${Title} - ${config.shortSiteTitle}` : config.siteTitle;
  const description = Description ? Description : config.siteDescription;
  const image = Cover ? Cover : config.siteImage;
  const url = config.siteUrl + config.pathPrefix + Slug;

  return (
    <Helmet
      htmlAttributes={{
        lang: config.siteLanguage,
        prefix: "og: http://ogp.me/ns#"
      }}
    >
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      {/* <meta property="fb:app_id" content={facebook.appId} /> */}
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={config.orgTwitterAccount ? config.orgTwitterAccount : ""}
      />
    </Helmet>
  );
};

Seo.propTypes = {
  data: PropTypes.object,
  // facebook: PropTypes.object.isRequired,
};

export default Seo;
