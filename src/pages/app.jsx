import React from "react";
import { Router } from "@reach/router";

import Layout from "../layouts/default";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Profile from "../components/Profile";

export default () => (
  <Layout>
    <Router>
      { /* TODO: Profile is a temporary page to test login. */ }
      <PrivateRoute path="/app" component={ Profile } />
      <Login path="/app/login" />
    </Router>
  </Layout>
);