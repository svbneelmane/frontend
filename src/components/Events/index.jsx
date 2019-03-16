import React from "react";
import { Link } from "gatsby";

import { get } from "../../services/eventService";
import reducer from "../../reducers/commonReducer";

const styles = {
  eventCard: {
    marginRight: 20,
    marginBottom: 20,
    padding: 20,
    width: 285,
    borderRadius: 3,
    border: "2px solid rgba(0, 0, 0, .1)",
    color: "inherit",
    boxShadow: "0px 5px 20px -4px rgba(0, 0, 0, .1)",
    transition: "box-shadow .2s ease",
    ":hover": {
      color: "inherit",
      boxShadow: "0px 5px 50px -4px rgba(0, 0, 0, .1)",
    },
  },
};

const EventCard = ({ event }) => (
  <Link to={ "/events/" + event.id } css={{
    ...styles.eventCard,
  }}>
    <div css={{
      fontSize: "1.3em",
    }}>
      { event.name }
    </div>
    <div css={{
      fontSize: "0.9em",
      color: "green",
    }}>
      starts {(new Date(event.startDate)).toLocaleString()} at { event.venue }
    </div>
    <div css={{
      fontSize: "0.8em",
      color: "rgba(0, 0, 0, .5)",
    }}>
      { event.rounds.length } Round{ event.rounds.length === 1 ? "" : "s" }
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
    get();

    this.unsubscribe=reducer.subscribe(() => {
      reducer.getState().then(state => {
        let events = state.data.list.map(event=>({
          id: event.id,
          name: event.name,
          description: event.description,
          college: event.college,
          venue: event.venue,
          rounds: event.rounds,
          startDate: event.startDate,
          endDate: event.endDate,
        }));

        this.setState({ events });
      });
    });

    // if (!response) return toast("Failed to load events, refresh to try again.");
    // if (response.status !== 200) return toast(response.message);
  };
  componentWillUnmount(){
    this.unsubscribe();
  }

  render = () => (
    <div>
      <div>
        <h2>Events</h2>
        <p>Events in Utsav.</p>
        <Link to="/events/add"><button>Add Event</button></Link>
      </div>
      <div css={{
        marginTop: 20,
        display: "flex",
        flexWrap: "wrap",
      }}>
        { this.state.events.map((event, i) => <EventCard key={i} event={event} />) }
      </div>
    </div>
  );
};
