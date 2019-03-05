import React from "react";
import { navigate } from "gatsby";
import { Router } from "@reach/router";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Registration from "../components/Registration";
import EventList from "../components/EventList";
import RoundList from "../components/RoundList";
import Profile from "../components/Profile";
import Slotting from "../components/Slotting";
import Judge from "../components/Judge";
import Layout from '../layouts/app/index';

export default class Views extends React.Component {

  constructor(props){
    super(props);
  }


  render() {
    return (
      <Layout>
        <Router>
          { /* TODO: Profile is a temporary page to test login. */}
          <PrivateRoute path="/app" component={Profile} />
          <PrivateRoute path="/app/registration" component={Registration} />
          <PrivateRoute path="/app/slots" component={Slotting} />
          <Login path="/app/login" />
          <RoundList path="/app/events/:event/rounds" exact/>
          <EventList path="app/events" />
          <Judge roundId={this.state.roundId} eventId={this.state.eventId} path="app/judge"/>
        </Router>
      </Layout>
    );
  }
}