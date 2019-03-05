import React from "react";
import { Router } from "@reach/router";

import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Registration from "../components/Registration";
import EventList from "../components/EventList";
import Profile from "../components/Profile";
import Slotting from "../components/Slotting";
import Layout from '../layouts/app/index';

export default () => (
  <Layout>
    <Router>
      { /* TODO: Profile is a temporary page to test login. */ }
      <PrivateRoute path="/app" component={ Profile } />
      <PrivateRoute path="/app/registration" component={ Registration } />
      <PrivateRoute path="/app/slots" component={ Slotting } />
      <Login path="/app/login" />
      <EventList path="app/event" />

    </Router>
  </Layout>
);