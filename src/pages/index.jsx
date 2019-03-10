import React from "react";
import { Router } from "@reach/router";
import { Provider } from "react-redux";

import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Profile from "../components/Profile";
import NotFound from "../components/404";

import configureStore from "../store";

import Layout from "../layouts/app";

export default () =>
  <Provider store={ configureStore() }>
    <Layout>
      <Router>
        <Login path="/login" />
        <PrivateRoute path="/profile" component={ Profile } />
        <NotFound path="/*" component={ NotFound } />
      </Router>
    </Layout>
  </Provider>
;
