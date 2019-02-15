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
        <Layout.Header style={{textAlign:"center",fontSize:'1.8em'}}>
          <Link to="/">
            { data.site.siteMetadata.title }
          </Link>
        </Layout.Header>

        <Layout.Content style={{
          padding: "24px 50px",
          minHeight:"85vh"
        }}>
          { children }
        </Layout.Content>

        <Layout.Footer style={{textAlign:"center",background:"#555",color:"#eee"}}>
          Copyright &copy; {new Date().getFullYear()} MAHE
        </Layout.Footer>
      </Layout>
    )}
  />
);
