import React from "react";
import { Router } from "@reach/router";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Registration from "../components/Registration";
import EventList from "../components/EventList";
import RoundList from "../components/RoundList";
import Profile from "../components/Profile";
import Judge from "../components/Judge";
import Layout from '../layouts/app/index';
import GenerateSlots from "../components/GenerateSlots";

export default class Views extends React.Component {
  render() {
    return (
      <Layout>
        <Router>
          { /* TODO: Profile is a temporary page to test login. */}
          <Login path="/app/login" />
          <PrivateRoute path="/app" component={Profile} />
          <PrivateRoute path="/app/registration" component={Registration} />
          <PrivateRoute path="/app/events/:event/rounds" exact component={RoundList} />
          <PrivateRoute path="app/events" component={EventList} />
          <PrivateRoute path="app/judge/:event/rounds/:round" exact component={Judge} />
          <PrivateRoute path="app/events/:event/rounds/:round/slot" exact component={GenerateSlots} />
        </Router>
      </Layout>
    );
  }
}