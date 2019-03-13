import React, { Component } from "react";
import Layout from '../../layouts/app';
import "./style.css";
import dance from '../../images/dance.png';
import singing from '../../images/singing.png';
import { get } from '../../actions/eventActions';
import store from '../../reducers/commonReducer';

const EventCard = ({ event }) => (
  <div className="event">
    <img src={event.image} alt={event.alt} />
    <div className="header">
      <div className="name">{event.name}</div>
      <div className="venue"><label>Venue:</label> {event.venue}</div>
      <div className="time"><label>Date:</label> {event.date}</div>
    </div>
  </div>)


export default class Adduser extends Component {

  constructor(props){
    super(props)
    this.state = {
      events: {}
    }
  }

  events = [
    {
      image: dance,
      alt: 'dance',
      name: 'Western Solo Dancing',
      venue: 'Manipal Institute of Technolody',
      date: '2nd April'
    },
    {
      image: singing,
      alt: 'singing',
      name: 'Solo Singing',
      venue: 'Manipal College of Dental Sciences',
      date: '2nd April'
    }
  ]

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
        <h3>Eventsss</h3>
        <div className="events">
          {
            this.events.map((event, i) => <EventCard key={i} event={event} />)
          }
        </div>
      </Layout>
    );
  }
}