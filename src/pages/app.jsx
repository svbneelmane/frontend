import React from "react";
import { Router } from "@reach/router";

import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Registration from "../components/Registration"
import Profile from "../components/Profile";
import Slotting from "../components/Slotting";
import Layout from '../layouts/default/index';

export default () => (
  <Layout>
    <Router>
      { /* TODO: Profile is a temporary page to test login. */ }
      <PrivateRoute path="/app" component={ Profile } />
      <Login path="/app/login" />
      <Registration path="app/registration" />
      <Slotting path="app/slotting" />

    </Router>
  </Layout>
);