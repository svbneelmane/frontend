import React from "react";
import { Link } from "gatsby";

import eventsService from "../../services/events";
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
      event: {},
    };
  }

  componentWillMount = () => {
    eventsService.get(this.props.event).then(event => {
      this.setState({ event });
    });
  };

  render = () => (
    <div>
      <div>
        <h2>{ this.state.event.name }</h2>
        <p>
          { this.state.event.faculty ? "Faculty Event" : "Student Event" } organized by { this.state.event.college && this.state.event.college.name + ", " + this.state.event.college.location }
        </p>
        <p>
          at { this.state.event.venue }
          <br />
          from {(new Date(this.state.event.startDate)).toLocaleString()} to {(new Date(this.state.event.endDate)).toLocaleString()}
        </p>
        <p>
          A maximum of { this.state.event.maxTeamsPerCollege } team{ this.state.event.maxTeamsPerCollege === 1 ? "" : "s" } can participate from one college.
          <br />
          {
            this.state.event.minMembersPerTeam === this.state.event.maxMembersPerTeam
            ? "A team should have " + this.state.event.minMembersPerTeam + " members."
            : "A team can contain a minimum of " + this.state.event.minMembersPerTeam + " members and a maximum of " + this.state.event.maxMembersPerTeam + " members."
          }
        </p>
        <p css={{
          fontSize: "0.9em",
          whiteSpace: "pre-wrap",
        }}>
          { this.state.event.description }
        </p>
        <div css={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}>
          <Link to={ "/events/" + this.props.event + "/teams" }>
            <button>View Teams</button>
          </Link>
          <Link to={ "/events/" + this.props.event + "/rounds" }>
            <button>View Rounds</button>
          </Link>
          <Link to={ "/events/" + this.props.event + "/edit" }>
            <button>Edit Event</button>
          </Link>
        </div>
      </div>
      <div css={{
        marginTop: 20,
        display: "flex",
        flexWrap: "wrap",
      }}>
      </div>
    </div>
  );
};
