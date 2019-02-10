import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import { Layout } from 'antd';

import "antd/dist/antd.css";
import "../base.css";

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <Layout.Header>
          <Link to="/">
            { data.site.siteMetadata.title }
          </Link>
        </Layout.Header>

        <Layout.Content style={{
          padding: "24px 50px"
        }}>
          { children }
        </Layout.Content>

        <Layout.Footer>
          Copyright &copy; {new Date().getFullYear()}
        </Layout.Footer>
      </Layout>
    )}
  />
);
