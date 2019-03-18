import React from "react";
import { Router } from "@reach/router";

import PrivateRoute from "../components/PrivateRoute";
import Index from "../components/Index";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Colleges from "../components/Colleges";
import AddCollege from "../components/Colleges/Add";
import Users from "../components/Users";
import AddUser from "../components/Users/Add";
import EditUser from "../components/Users/Edit";
import ViewUser from "../components/Users/View";
import Judges from "../components/Judges";
import AddJudge from "../components/Judges/Add";
import Events from '../components/Events';
import Event from '../components/Events/Event';
import AddEvent from '../components/Events/Add';
import EventTeams from '../components/Events/Teams';
import EventParticipants from '../components/Events/Participants';
import EditEvent from '../components/Events/Edit';
import Leaderboard from "../components/Leaderboard";
import Teams from "../components/Teams";
import Register from "../components/Registration";
import Participants from "../components/Registration/Participants";
import Members from "../components/Members";
import RegisterEvent from "../components/Registration/Event";
import RegisterTeam from "../components/Registration/Team";
import NotFound from "../components/404";
import Rounds from "../components/Rounds";
import Slots from "../components/Slots";
import Judge from "../components/Judges/StartJudging";


// import configureStore from "../store";

import Layout from "../layouts/app";

if(typeof(document)!='undefined')
  document.title="MUCAPP";


export default () =>
    <Layout>
      <Router css = {{
        height: "100%",
      }}>
        <Index path="/" />
        <Login path="/login" />

        <PrivateRoute path="/profile" component={ Profile } />

        <PrivateRoute path="/users" component={ Users } type={ 1 } />
        <PrivateRoute path="/users/add" component={ AddUser } type={ 1 } />
        <PrivateRoute path="/users/:user" component={ ViewUser } type={ 1 } />
        <PrivateRoute path="/users/:user/edit" component={ EditUser } type={ 1 } />

        <PrivateRoute path="/events" component={ Events } type={ 2 } />
        <PrivateRoute path="/events/add" component={ AddEvent } type={ 1 } />
        <PrivateRoute path="/events/:event" component={ Event } type={ 2 } />
        <PrivateRoute path="/events/:event/edit" component={ EditEvent } type={ 1 } />
        <PrivateRoute path="/events/:event/teams" component={ EventTeams } type={ 1 } />
        <PrivateRoute path="/events/:event/teams/:college/:team" component={ EventParticipants } type={ 1 } />
        <PrivateRoute path="/events/:event/rounds" exact component={ Rounds } type={ 2 } />
        <PrivateRoute path="/events/:event/rounds/:round/slot" exact component={ Slots } type={ 1 } />

        <PrivateRoute path="/colleges" component={ Colleges } type={ 1 } />
        <PrivateRoute path="/colleges/add" component={ AddCollege } type={ 1 } />
        <PrivateRoute path="/colleges/:college/teams" component={ Teams } type={ 1 } />
        <PrivateRoute path="/colleges/:college/teams/:team/members" component={ Members } type={ 1 } />

        <PrivateRoute path="/judges" component={ Judges } type={ 1 } />
        <PrivateRoute path="/judges/add" component={ AddJudge } type={ 1 } />
        <PrivateRoute path="/judge/:event/rounds/:round" exact component={ Judge } type={ 2 } />

        <PrivateRoute path="/leaderboard" component={ Leaderboard } type={ 1 } />

        <PrivateRoute path="/register" component={ Register } type={ 4 }  />
        <PrivateRoute path="/register/:event" component={ RegisterEvent } type={ 4 }  />
        <PrivateRoute path="/register/:event/teams" component={ RegisterTeam } type={ 4 }  />
        <PrivateRoute path="/register/:event/teams/:team" component={ Participants } type={ 4 }  />

        <NotFound path="/*" component={ NotFound } />
      </Router>
    </Layout>
;
