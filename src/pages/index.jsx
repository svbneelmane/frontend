import React from "react";
import { Router } from "@reach/router";

import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Colleges from "../components/Colleges";
import NotFound from "../components/404";

import configureStore from "../store";

import Layout from "../layouts/app";

export default () =>
    <Layout>
      <Router>
        <Login path="/login" />
        <PrivateRoute path="/profile" component={ Profile } />
        <PrivateRoute path="/colleges" component={ Colleges } />
        <NotFound path="/*" component={ NotFound } />
      </Router>
    </Layout>
;
