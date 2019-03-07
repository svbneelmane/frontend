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
import Leaderboard from "../components/Leaderboard";

export default class Views extends React.Component {
  render() {
    return (
      <Layout>
        <Router>
          <PrivateRoute path="/app" component={Profile} />
          <PrivateRoute path="/app/registration" component={Registration} />
          <PrivateRoute path="/app/events/:event/rounds/:round/leaderboard" component={Leaderboard} exact />
          <Login path="/app/login" />
          <RoundList path="/app/events/:event/rounds" exact/>
          <EventList path="app/events" />
          <Judge path="app/judge/:event/rounds/:round" exact/>
          <GenerateSlots path="app/events/:event/rounds/:round/slot" exact/>
        </Router>
      </Layout>
    );
  }
}
