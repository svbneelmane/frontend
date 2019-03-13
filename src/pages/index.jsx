import React from "react";
import { Router } from "@reach/router";

import PrivateRoute from "../components/PrivateRoute";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Colleges from "../components/Colleges";
import AddCollege from "../components/Colleges/Add";
import Users from "../components/Users";
import AddUser from "../components/Users/Add";
import Judges from "../components/Judges";
import AddJudge from "../components/Judges/Add";
import Events from '../components/Events';
import AddEvent from '../components/Events/Add';
import Leaderboard from "../components/Leaderboard";
import NotFound from "../components/404";
import Rounds from "../components/Rounds";
import Judge from "../components/Judges/StartJudging"

// import configureStore from "../store";

import Layout from "../layouts/app";

export default () =>
    <Layout>
      <Router css = {{
        height: "100%",
      }}>
        <Login path="/login" />
        <PrivateRoute path="/profile" component={ Profile } />
        <PrivateRoute path="/users" component={ Users } />
        <PrivateRoute path="/events" component={ Events } />
        <PrivateRoute path="/events/add" component={ AddEvent } />
        <PrivateRoute path="/colleges" component={ Colleges } />
        <PrivateRoute path="/judges" component={ Judges } />
        <PrivateRoute path="/leaderboard" component={ Leaderboard } />
        
          <PrivateRoute path="/users/add" component={ AddUser } />
          <PrivateRoute path="/colleges/add" component={ AddCollege } />
          <PrivateRoute path="/judges/add" component={ AddJudge } />
          <PrivateRoute path="/events/:event/rounds" exact component={Rounds} />
          <PrivateRoute path="/judge/:event/rounds/:round" exact component={Judge} />
        
        <NotFound path="/*" component={ NotFound } />
      </Router>
    </Layout>
;
