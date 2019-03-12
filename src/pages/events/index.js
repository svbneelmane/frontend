import React, { Component } from "react";
import Layout from '../../layouts/app';
import "./style.css";
import dance from '../../images/dance.png';
import singing from '../../images/singing.png';
import { get } from '../../actions/eventActions';
import store from '../../reducers/commonReducer';
import { navigate } from 'gatsby';

const EventCard = ({ event }) => (
  <div onClick={() => {navigate(`events/${event.id}/rounds`)}} className="event" css={{cursor: "pointer"}}>
    <img src={dance} alt={event.name} />
    <div className="header">
      <div className="name">{event.name}</div>
      <div className="venue"><label>Venue:</label> {event.college.location}</div>
      <div className="time"><label>Date:</label> {new Date(event.startDate).toDateString('en-US')}</div>
    </div>
  </div>)


export default class Adduser extends Component {

  constructor(props){
    super(props)
    this.state = {
      events: []
    }
  }


  componentWillMount = () => {
    get();
    store.subscribe(async () => {
      let state = await store.getState();
      this.setState({
        events: state.data,
      })
      console.log(this.state.events)
    });
  }

  render() {
    return (
      <Layout>
        <h3>Events</h3>
        <div className="events">
          {
            this.state.events.map((event, i) =>  <EventCard key={i} event={event} /> )
          }
        </div>
      </Layout>
    );
  }
}