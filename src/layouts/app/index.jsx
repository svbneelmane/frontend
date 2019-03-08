import React from "react";

import Header from "../../commons/Header";
import Main from "../../commons/Main";
import Footer from "../../commons/Footer";
import Sidebar from "../../commons/Sidebar";
import Content from "../../commons/Content";

import "../base.css";

export default (props) => (
  <>
    <Header />
    <Main>
      <Sidebar />
      <Content>
        { props.children }
      </Content>
    </Main>
    <Footer />
  </>
);
