import React from "react";
import { navigate } from "gatsby";
import Select from "react-select";

import reducer from "../../reducers/commonReducer";
import { create } from "../../services/userServices";
import { Input, Button, TextArea } from "../../commons/Form";
import constants from "../../utils/constants";
import { getAll } from "../../services/collegeServices";
import { toast } from "../../actions/toastActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class AddEvent extends React.Component {

  types = (function() {
    let options = [];

    for (let userType in constants.USER_TYPES) {
      if (constants.USER_TYPES.hasOwnProperty(userType)) {
        options.push({
          label: userType.replace(/_/g, " "),
          value: constants.USER_TYPES[userType],
        });
      }
    }

    return options;
  }());
  ADD="Add Event";
  ADDING="Adding Event...";
  state = {

    buttonText:this.ADD_USER
  };

  handleChange = (e) => {
    
    this.setState({ [e.name]: e.value },()=>{
      console.log(this.state);
    });
  };

  handleClick = () => {
    if(!this.state.name)
      return toast("Please enter name");
    if(!this.state.email)
      return toast("Please enter email id");
    if(!this.state.password)
      return toast("Please enter password");
    if(!this.state.college)
      return toast("Please select college");
    if(!this.state.type)
      return toast("Please select user type");
    
    this.setState({
      buttonText:this.ADDING
    },async ()=>{
      let response = await create({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        college: this.state.college,
        type: this.state.type,
      });
      if(!response)
        toast("Some error occured");
      else if(response.status===200)
        return navigate("/users");
      else
        toast(response.message);
      this.setState({buttonText:this.ADD})


    })
   

   
  };

  componentWillMount() {
    getAll();

    reducer.subscribe(() => {
      reducer.getState().then(state => {
        this.setState({
          colleges: state.data.map(college => ({
            value: college.id,
            label: college.name + ", " + college.location,
          })),
        });
      });
    });
  }

  render = () => (
    <div>
      <h2>Add Event</h2>
      <p>Add a new event to MUCAPP.</p>
      <div>
        <div>
          <Input
            onChange={ this.handleChange }
            autoComplete="off"
            name="name"
            type="text"
            placeholder="Name"
            required
            styles={{ width: 300 }}
          />
        </div>
        <div>
          <Select
            isSearchable={false}
            name="college"
            placeholder="College"
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
        </div>
        <div>
          <Input
            onChange={ this.handleChange }
            autoComplete="off"
            name="minMembersPerTeam"
            type="number"
            placeholder="Minimum Members Per Team"
            required
            styles={{ width: 300 }}
          />
        </div>
        <div>
          <Input
            onChange={ this.handleChange }
            autoComplete="off"
            name="maxMembersPerTeam"
            type="number"
            placeholder="Maximum Members Per Team"
            styles={{ width: 300 }}
          />
        </div>
        <div>
          <Input
            onChange={ this.handleChange }
            autoComplete="off"
            name="maxTeamsPerCollege"
            type="number"
            placeholder="Maximum Teams Per College"
            styles={{ width: 300 }}
          />
        </div>
        <div>
          <Input
            onChange={ this.handleChange }
            autoComplete="off"
            name="venue"
            type="text"
            placeholder="Venue"
            styles={{ width: 300 }}
          />
        </div>
        <div>
          <TextArea
            onChange={ this.handleChange }
            autoComplete="off"
            name="description"
            type="text"
            placeholder="Description"
            styles={{ maxWidth: 300,minWidth:300 }}
          />
        </div>
        <div>
          <Input
            onChange={ this.handleChange }
            autoComplete="off"
            name="duration"
            type="number"
            placeholder="Duration"
            styles={{ width: 300 }}
          />
        </div>
        <div>
        <DatePicker
          placeholderText="Date"
          value={this.state.date}
          onChange={(value)=>this.handleChange({name:'date',value:value.toLocaleDateString()})} />
        </div>
        <div>
          <Input
            onChange={ this.handleChange }
            autoComplete="off"
            name="startTime"
            type="time"
            placeholder="Start Time"
            styles={{ width: 300 }}
          />
        </div>
        
        <div>
          <Select
            isSearchable={false}
            name="type"
            placeholder="For"
            options={ [{label:'Students',value:'students'},{label:'Faculty',value:'faculty'}] }
            onChange={ (e) => this.setState({ type: e.value }) }
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
        </div>
        <div>
          <Input
            onChange={ this.handleChange }
            autoComplete="off"
            name="rounds"
            type="number"
            placeholder="Rounds"
            styles={{ width: 300 }}
          />
        </div>
        <div>
          <Button onClick={ this.handleClick } disabled={this.state.buttonText===this.ADDING}>{this.state.buttonText}</Button>
        </div>
      </div>
    </div>
  );
};
