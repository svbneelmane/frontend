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
    this.state = {
      eventId : null,
      roundId: null,
    }
  }

  setEventId = (id) => {
    console.log(id);
    this.setState({
      eventId: id,
    })
    if(typeof window !== `undefined`) {
      navigate(`/app/rounds`);
    }
  }

  setRoundId = (id) => {
    this.setState({
      roundId: id,
    });
    if(typeof window !== `undefined`) {
      navigate(`/app/judge`);
    }
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
          <RoundList setRoundId={this.setRoundId} eventId={this.state.eventId} path="/app/rounds" />
          <EventList setEventId={this.setEventId} path="app/events" />
          <Judge roundId={this.state.roundId} eventId={this.state.eventId} path="app/judge"/>
        </Router>
      </Layout>
    );
  }
}