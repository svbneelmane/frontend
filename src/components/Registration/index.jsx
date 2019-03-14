import React from "react";
import { Link } from "gatsby";

import eventsService from "../../services/events";
import {getTeams} from "../../services/collegeServices";
import { Button } from "../../commons/Form";

const EventCard = ({ event }) => (
  <Link to={ "/register/" + event.id } css={{
    display: "inline-block",
    marginRight: 20,
    marginBottom: 20,
    padding: 20,
    width: 350,
    borderRadius: 3,
    border: "2px solid rgba(0, 0, 0, .1)",
    color: "inherit",
    boxShadow: "0px 5px 20px -4px rgba(0, 0, 0, .1)",
    transition: "box-shadow .2s ease",
    ":hover": {
      color: "inherit",
      boxShadow: "0px 5px 50px -4px rgba(0, 0, 0, .1)",
    }
  }}>
    <div css={{
      fontSize: "1.3em",
      marginBottom: "8px"
    }}>
      { event.name }
    </div>
    <div css={{
      color: "rgba(0, 0, 0, .5)",
      fontSize: "0.9em",
      marginBottom: "8px",
      maxHeight: 270,
      overflowY: "auto",
      whiteSpace: "pre-wrap"
    }}>
      { event.description.replace(/[>]/g,'- ') }
    </div>
    <div css={{
      fontSize: "0.8em",
      color: "rgba(0, 0, 0, .5)",
    }}>
      Organized by { event.college.name }
    </div>
    <div style={{textAlign:"right",padding:10}}>
      <Button style={{marginTop:10}}>{event.registered?"View Team":"Register Now"}</Button>
    </div>
  </Link>
);

export default class Events extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  componentWillMount = async () => {
    let response = await getTeams();
    let teams = response&&response.status==200?response.data:[];
    console.log("TEAMS",teams);
    eventsService.getAll().then(events => {
      console.log(events);
      events = events.map(event => {
        let team = teams.find((team)=>{
          return team.event===event.id;
        });
        if(team){
          console.log("Has");
        }
        else
          console.log("NOPE");
        return({
        id: event.id,
        name: event.name,
        description: event.description,
        college: event.college,
        venue: event.venue,
        rounds: event.rounds,
        startDate: event.startDate,
        endDate: event.endDate,
        registered:!!team
      })});

      this.setState({ events },()=>{
        console.log(this.state);
      });
    });
   
  };

  render = () => (
    <div>
      <div>
        <h2>Registration</h2>
        <p>Register teams for the events in Utsav</p>
      </div>
      <div css={{
        display: "flex",
        flexWrap: "wrap",
      }}>
        { this.state.events.map((event, i) => <EventCard key={i} event={event} />) }
      </div>
    </div>
  );
};
