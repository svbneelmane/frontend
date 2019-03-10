import React from "react";
import { Router } from "@reach/router";

import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Colleges from "../components/Colleges";
import AddCollege from "../components/Colleges/Add";
import NotFound from "../components/404";

import configureStore from "../store";

import Layout from "../layouts/app";

export default () =>
    <Layout>
      <Router>
        <Login path="/login" />
        <PrivateRoute path="/profile" component={ Profile } />
        <PrivateRoute path="/colleges" component={ Colleges } />
        <PrivateRoute path="/colleges/add" component={ AddCollege } />
        <NotFound path="/*" component={ NotFound } />
      </Router>
    </Layout>
;
