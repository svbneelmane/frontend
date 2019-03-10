import React from "react";
import { navigate } from "gatsby";

import reducer from "../../reducers/commonReducer";
import { create } from "../../services/collegeServices";
import { Input, Button } from "../../commons/Form";

export default class AddCollege extends React.Component {
  state = {};

  handleChange = (e) => {
    this.setState({ [e.name]: e.value });
  };

  handleClick = () => {
    create({
      name: this.state.name,
      location: this.state.location,
    });

    reducer.subscribe(() => {
      navigate("/colleges");
    });
  };

  render = () => (
    <div>
      <h2>Add College</h2>
      <p>Add a new college to Utsav.</p>
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
          <Input
            onChange={ this.handleChange }
            autoComplete="off"
            name="location"
            type="text"
            placeholder="Location"
            required
            styles={{ width: 300 }}
          />
        </div>
        <div>
          <Button onClick={this.handleClick}>Add</Button>
        </div>
      </div>
    </div>
  );
};
