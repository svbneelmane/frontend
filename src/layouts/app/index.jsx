import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import { Layout, Menu, Icon } from 'antd';
import "antd/dist/antd.css";
import "../base.css";

const {
  Header, Content, Footer, Sider,
} = Layout;


export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <Sider>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Link to="/app/events">
                <Icon type="calendar" />
                <span className="nav-text">Events</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/app/leaderboard">
              <Icon type="number" />
              <span className="nav-text">Leaderboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/app/">
                <Icon type="user" />
                <span className="nav-text">Profile</span>
              </Link>
            </Menu.Item>
            
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#f5f5f5', padding: 0 }} />
          <Content >
            <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
            { children }
            </div>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Content>
        </Layout>
      </Layout>
    )}
  />
);
