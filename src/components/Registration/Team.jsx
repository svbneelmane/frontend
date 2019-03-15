import React from "react";
import { navigate } from "gatsby";

import eventsService from "../../services/events";
import { getUser } from "../../services/userServices";
import { Input, Button } from "../../commons/Form";
import { toast } from "../../actions/toastActions";

const Participant = (props) => (
  <div>
    <h3>Participant { props.count }</h3>
    <Input
      name="registrationID"
      type="text"
      placeholder="Registration no."
      pattern="/^(?:(?:MAHE[\d]{7})|(?:[\d]{9}))$/"
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

export default class Events extends React.Component {
  REGISTERING="Registering..."
  REGISTER="Register"
  constructor(props) {
    super(props);

    this.state = {
      event: [],
      participantsInput: [],
      participants: [],
      button: this.REGISTER
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
      faculty: participant.registrationID&&participant.registrationID.startsWith("MAHE") ? true : false,
    }));
    let pass=true;
    this.state.participants.map(participant => {
      if(!participant.registrationID){
        pass=false;
        return toast("Register number misssing");
      }
      if(!participant.registrationID.match(/^(?:(?:MAHE[\d]{7})|(?:[\d]{9}))$/i)){
        pass=false;
        return toast(participant.registrationID+" is invalid register number");
      }
      if(this.state.event.faculty&&participant.registrationID.match(/^[\d]{9}$/i)){
        pass=false;
        return toast(participant.registrationID+" cannot participate in a faculty event");
      }
      if(!this.state.event.faculty&&!participant.registrationID.match(/^[\d]{9}$/i)){
        pass=false;
        return toast(participant.registrationID+" is cannot participate in a student event");
      }
      if(!participant.name||participant.name.length===0){
        pass=false;
        return toast("Please enter participant name");
      }
      if(!participant.name.match(/^[A-Z\s]*$/i)){
        pass=false;
        return toast("Participant name cannot contain non alphabetical characters");
      }
      return participant;
    });
    if(this.state.participants.length<this.state.event.minMembersPerTeam){
      pass=false;
      return toast("Minimum of "+this.state.event.minMembersPerTeam+" participants are required to register for this event.");
    }
    this.state.participants.forEach((Ielem,i)=>{
      this.state.participants.forEach((Jelem,j)=>{
      if(i!==j&&Ielem.registrationID===Jelem.registrationID)
      {
        pass=false;
        return toast(Ielem.registrationID+" has been entered more then once");
      }
    })
  });
   if(!pass)
    return;

    let user = getUser();
    this.setState({
      button: this.REGISTERING
    },()=>{
      eventsService.createTeam(this.state.event.id, {
        college: user.college,
        participants,
      }).then(team =>
        navigate("/register/" + this.state.event.id)
      );
    })


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
        <div css={{marginTop: "20px"}}>
          <Button onClick={ this.handleSubmit } disabled={this.state.button===this.REGISTERING}>{this.state.button}</Button>
          <Button styles={{marginLeft: "10px"}} onClick={() => { navigate("/register")} }>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
