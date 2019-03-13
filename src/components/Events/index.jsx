import React from "react";
import { Link } from "gatsby";

import eventIcon from "../../images/event.png";
import { get } from "../../services/eventService";
import { toast } from "../../actions/toastActions";

const EventCard = ({ event }) => (
  <Link to={ "/events/" + event.id } css={{
    color: "inherit",
  }}>
    <div css={{
      padding: "15px 0",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px dashed rgba(0, 0, 0, .1)",
    }}>
      <div css={{
        marginRight: 20,
      }}>
        <img
          src={ event.image }
          alt={ event.name }
        />
      </div>
      <div>
        <div css={{
          fontSize: "1.3em",
        }}>
          { event.name }
        </div>
        <div css={{
          color: "rgba(0, 0, 0, .5)",
        }}>
          { event.description }
        </div>
        <div css={{
          fontSize: "0.9em",
          color: "green",
        }}>
          { /* TODO: If we know the time the event starts, we should use .toLocaleString() instead. */ }
          starts {(new Date(event.startDate)).toDateString()} at { (event.venue ? event.venue + " - " : "") + event.college.name }
        </div>
        <div css={{
          fontSize: "0.8em",
          color: "rgba(0, 0, 0, .5)",
        }}>
          { event.rounds.length } Round{ event.rounds.length === 1 ? "" : "s" }
        </div>
      </div>
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
    let response = await get();

    if (!response) return toast("Failed to load events, refresh to try again.");
    if (response.status !== 200) return toast(response.message);

    let events = response.data.map(event=>({
      id: event.id,
      name: event.name,
      description: event.description || "This is a fantastic event!",
      college: event.college,
      venue: event.venue,
      rounds: event.rounds,
      startDate: event.startDate,
      endDate: event.endDate,

      image: eventIcon,
    }));

    this.setState({ events });
  };

  render = () => (
    <div>
      <div>
        <h2>Events</h2>
        <p>Events in Utsav.</p>
        <Link to="/events/add"><button>Add Event</button></Link>
      </div>
      <div css={{
        marginTop: 20,
      }}>
        { this.state.events.map((event, i) => <EventCard key={i} event={event} />) }
      </div>
    </div>
  );
};
