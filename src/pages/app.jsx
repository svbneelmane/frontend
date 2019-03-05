import React from "react";
import { Router } from "@reach/router";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Registration from "../components/Registration";
import EventList from "../components/EventList";
import TeamList from "../components/TeamList";
import Profile from "../components/Profile";
import Slotting from "../components/Slotting";
import Layout from '../layouts/app/index';

export default class Views extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      eventId : null,
    }
  }

  setEventId = (id) => {
    console.log(id);
    this.setState({
      eventId: id,
    })
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
          <TeamList eventId={this.state.eventId} path="/app/teams" />
          <EventList setEventId={this.setEventId} path="app/events" />
        </Router>
      </Layout>
    );
  }
}