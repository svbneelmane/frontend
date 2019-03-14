import React from "react";
import { navigate, Link } from "gatsby";

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

const Participant = (props) => (
  <div>
    <h3>Participant { props.count }</h3>
    <Input
      name="registrationID"
      type="text"
      placeholder="Registration no."
      onChange={(e) => props.handleChange(props.count - 1, e)}
    />
    &ensp;
    <Input
      name="name"
      type="text"
      placeholder="Name"
      onChange={(e) => props.handleChange(props.count - 1, e)}
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
      participantsInput: [],
      participants: [],
    };
  }

  handleChange = (index, e) => {
    let participants = this.state.participants;
    participants[index] = {
      ...participants[index],
      [e.name]: e.value,
    };

    this.setState({
      participants,
    });
  };

  handleSubmit = () => {
    let participants = this.state.participants.map(participant => ({
      ...participant,
      faculty: participant.registrationID.startsWith("MAHE") ? true : false,
    }));

    let user = getUser();
    eventsService.createTeam(this.state.event.id, {
      college: user.college,
      participants,
    }).then(team =>
      navigate("/register/" + this.state.event.id)
    );
  };

  componentWillMount = () => {
    eventsService.get(this.props.event).then(event => {
      if (!event.maxMembersPerTeam) event.maxMembersPerTeam = 1;

      let participantsInput = [];
      for (let i = 0; i < event.maxMembersPerTeam; i++) {
        participantsInput.push(<Participant handleChange={ this.handleChange } key={ i } count={ i + 1 } />);
      }

      this.setState({
        event,
        participantsInput,
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
          this.state.participantsInput.map(participants => participants)
        }
        <div>
          <Button onClick={ this.handleSubmit }>Register</Button>
        </div>
      </div>
    </div>
  );
};
