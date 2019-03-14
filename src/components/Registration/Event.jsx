import React from "react";
import { Link } from "gatsby";

import collegesService from "../../services/colleges";
import eventsService from "../../services/events";
import { getUser } from "../../services/userServices";

const styles = {
  teamCard: {
    display: "inline-block",
    marginRight: 20,
    marginBottom: 20,
    padding: 20,
    width: 250,
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

const TeamCard = ({ team }) => (
  <Link to={ "/register/" + team.event } css={{
    ...styles.teamCard,
  }}>
    <div css={{
      fontSize: "1.3em",
    }}>
      { team.name }
    </div>
    <div css={{
      color: "rgba(0, 0, 0, .5)",
    }}>
      { team.members.length } members
    </div>
  </Link>
);

export default class Events extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: [],
      teams: [],
    };
  }

  componentWillMount = () => {
    eventsService.get(this.props.event).then(event => {
      this.setState({ event });
    });

    let user = getUser();
    collegesService.getTeams(user.college).then(teams => {
      teams = teams.filter(team => team.event === this.props.event );
      teams = teams.map(team => team);

      this.setState({ teams });
    });
  };

  render = () => (
    <div>
      <div>
        <h2>{ this.state.event.name } Registration</h2>
        <p>Register teams for the { this.state.event.name } event in Utsav</p>
        <p>You can register at most { this.state.event.maxTeamsPerCollege } teams for this event.</p>
      </div>
      <div css={{
        display: "flex",
        flexWrap: "wrap",
      }}>
        {
          this.state.teams.length < this.state.event.maxTeamsPerCollege
          ? <Link to={ "/register/" + this.props.event + "/teams" } css={{
              ...styles.teamCard,
              backgroundColor: "#ff5800",
              color: "white",
              ":hover": {
                color: "white",
                boxShadow: "0px 5px 50px -4px rgba(0, 0, 0, .1)",
              }
            }}>
              Register Team { this.state.teams.length + 1 }
            </Link>
          : null
        }
        { this.state.teams.map((team, i) => <TeamCard key={i} team={team} />) }
      </div>
    </div>
  );
};