import React from "react";
import { Link } from "gatsby";

import dance from '../../images/dance.png';
import singing from '../../images/singing.png';
import {get} from '../../services/eventService';
import { toast } from "../../actions/toastActions";

const EventCard = ({ event }) => (
  <div className="event">
    <img src={event.image} alt={event.alt} />
    <div className="header">
      <div className="name">{event.name}</div>
      <div className="venue"><label>Venue:</label> {event.venue}</div>
      <div className="time"><label>Date:</label> {event.date}</div>
    </div>
  </div>)

export default class Events extends React.Component {
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

  componentWillMount = async() => {
   let response = await get();
   if(!response)
    return toast("Failed to load events, refresh to try again. ");
  if(response.status!==200)
    return toast(response.message);
  let events = response.data.map(event=>{
    return{
      
    }
  })
  }

  render = () => (
    <div>
      <h2>Events <Link to="/events/add"><button>Add Event</button></Link></h2>
      <p>Events of MUCAPP.</p>
      <div className="events">
          {
            this.events.map((event, i) => <EventCard key={i} event={event} />)
          }
        </div>
    </div>
  );
};
