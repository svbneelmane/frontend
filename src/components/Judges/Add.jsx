import React from "react";
import { navigate } from "gatsby";

import reducer from "../../reducers/commonReducer";
import { create } from "../../services/judgeServices";
import { Input, Button } from "../../commons/Form";

export default class AddJudge extends React.Component {
  state = {};

  handleChange = (e) => {
    this.setState({ [e.name]: e.value });
  };

  handleClick = () => {
    create({
      name: this.state.name,
    });

    reducer.subscribe(() => {
      navigate("/judges");
    });
  };

  render = () => (
    <div>
      <h2>Add Judge</h2>
      <p>Add a new judge for Utsav events.</p>
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
          <Button onClick={ this.handleClick }>Add</Button>
        </div>
      </div>
    </div>
  );
};
