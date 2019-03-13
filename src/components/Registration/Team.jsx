import React from "react";
import { Link } from "gatsby";

import collegesService from "../../services/colleges";
import eventsService from "../../services/events";
import { getUser } from "../../services/userServices";
import { Input, Button } from "../../commons/Form";

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

// TODO: Implement onChange
const Participant = (props) => (
  <div>
    <h3>Participant { props.count }</h3>
    <Input
      name="regno"
      type="text"
      placeholder="Registration no."
    />
    &ensp;
    <Input
      name="name"
      type="text"
      placeholder="Name"
    />
  </div>
);

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
      participants: [],
    };
  }

  componentWillMount = () => {
    eventsService.get(this.props.event).then(event => {
      if (!event.maxMembersPerTeam) event.maxMembersPerTeam = 1;

      let participants = [];
      for (let i = 0; i < event.maxMembersPerTeam; i++) {
        participants.push(<Participant key={ i } count={ i + 1 } />);
      }

      this.setState({
        event,
        participants,
      });
    });
  };

  render = () => (
    <div>
      <div>
        <h2>Team Registration</h2>
        <p>Register a team for the { this.state.event.name } event in Utsav.</p>
      </div>
      <div css={{
      }}>
        {
          this.state.participants.map(participants => participants)
        }
        {/* // TODO: Handle submit */}
        <div>
          <Button onClick={""}>Register</Button>
        </div>
      </div>
    </div>
  );
};
