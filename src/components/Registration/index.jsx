import React from "react";
import "./style.css";
import Select from "react-select";
import reducer from "../../reducers/commonReducer";
import { get } from "../../services/eventService";
import { getAll } from "../../services/collegeServices";
import { Input, Button } from "../../commons/Form";

const Participant = (props) => (
  <div>
    <h3>Participant {props.count}</h3>
    <Input name="regno" type="text" placeholder="Registration no."/>
    <Input name="name" type="text" placeholder="Name"/>    
  </div>
)

export default class RegisterEvent extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      event: null,
      college: null,
      minParticipant: 1,
      maxParticipant: null,
      participantField: [],
      participants: [],
    };
  }

  handleEventChange = (e) => {
    var rows = [];
    for (var i = 0; i < 2; i++) {
      rows.push(<Participant key={i} count={i+1}/>);
    }

    this.setState({
      college: e.value,
      minParticipant: 2,//e.value.minMembersPerTeam,
      maxParticipant: 4,//e.value.maxMembersPerTeam,
      participantField: rows,
    });
  }

  addParticipantField = () => {
    let count = this.state.participantField.length + 1;
    let row = [...this.state.participantField];
    row.push(<Participant key={count-1} count={count}/>);
    
    this.setState({
      participantField: row,
    })
  }

  submit = () => {
    let payload = {
      college: this.state.college.id,
      participants: this.state.participants,
    }
  }

  componentWillMount = () => {
    get();
    getAll();

    reducer.subscribe(() => {
      reducer.getState().then(state => {
        this.setState({
          [state.data.src]: state.data.list.map(data => ({
            value: data,
            label: data.name,
          }))
        });
      });
     });
  }

  render = () => {
    console.log(this.state);
    return (
    <div>
      <Select
        isSearchable={false}
        name="event"
        placeholder="Select an event"
        options={ this.state.events }
        onChange={this.handleEventChange}
        styles={{
          control: (provided, state) => ({
            ...provided,
            marginBottom: 10,
            border: state.isFocused ? "1px solid #ffd100" : "1px solid rgba(0, 0, 0, .1)",
            boxShadow: state.isFocused ? "0 3px 10px -5px rgba(0, 0, 0, .3)" : "",
            ":hover": {
              border: "1px solid #ff5800",
              boxShadow: "0 3px 10px -5px rgba(0, 0, 0, .3)",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#ff5800" : "",
            ":hover": {
              backgroundColor: "#ffd100",
              color: "black",
            },
          }),
        }}
        css = {{
          fontSize: "16px",
          width: 300,
        }}
      />
      <Select
        isSearchable={false}
        name="college"
        placeholder="Select your college"
        options={ this.state.colleges }
        onChange={ (e) => this.setState({ college: e.value }) }
        styles={{
          control: (provided, state) => ({
            ...provided,
            marginBottom: 10,
            border: state.isFocused ? "1px solid #ffd100" : "1px solid rgba(0, 0, 0, .1)",
            boxShadow: state.isFocused ? "0 3px 10px -5px rgba(0, 0, 0, .3)" : "",
            ":hover": {
              border: "1px solid #ff5800",
              boxShadow: "0 3px 10px -5px rgba(0, 0, 0, .3)",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#ff5800" : "",
            ":hover": {
              backgroundColor: "#ffd100",
              color: "black",
            },
          }),
        }}
        css = {{
          fontSize: "16px",
          width: 300,
        }}
      />
      {
        this.state.participantField.map(field => (field))
      }
      {
        (this.state.participantField.length < this.state.maxParticipant)
        ?
          <Button onClick={ this.addParticipantField }>Add participant</Button>
        :
          null
      }
      {
        (this.state.participants.length >= this.state.minParticipant) 
        ?
          <Button onClick={ this.submit }>Register</Button>
        :
          null
      }
    </div>
  );
  }
};
