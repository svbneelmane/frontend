import React from "react";
import "./style.css";
import constants from '../../utils/constants';
import {
  Layout, Button, Select, Input, Form, Divider
} from 'antd';

const Option = Select.Option;
class NormalRegForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      event: [],
      college: [],
      selectedCollege: {},
      Participant: []
    }
  }

  componentWillMount = async () => {
    await fetch(constants.server + "/events").then((res) => {
      return res.json();
    }).then((res) => {
      console.log(res);
      this.setState({
        event: res.data,
      })
    });

    await fetch(constants.server + "/colleges").then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({
        college: res.data,
      })
    });

  }

  handleEventChange = async (value) => {
    await this.setState({
      selectedEvent: this.state.event[value],
    })

    console.log(this.state.selectedEvent)
  }

  handleCollegeChange = async (value) => {
    await this.setState({
      selectedCollege: value,
    })
  }

  render() {
    return (
      <Layout.Content className="container">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a Event"
          onChange={this.handleEventChange}
          size="large"
          className="field"
        >
          {this.state.event.map((each, i) => {
            return (
              <Option key={i} value={i}>{each.name}</Option>
            );
          })}
        </Select>

        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select your collage"
          onChange={this.handleCollegeChange}
          size="large"
          className="field"
        >
          {this.state.college.map((each, i) => {
            return (
              <Option key={i} value={i}>{each.name}</Option>
            );
          })}
        </Select>

        {this.state.selectedEvent ?
          
          <div>
            <Divider />
            <p>Participant 1</p>
            <Input className="field" size="large" addonBefore="Name" />
            <Input className="field" size="large" addonBefore="Registration number" />
            <Input className="field" size="large" addonBefore="Email" />
            <Input className="field" size="large" addonBefore="Mobile" />
          </div> 
          :
          null
        }


        <br />

        <Button type="primary" className="field">Add Another Participant</Button>
        <Button type="primary">Submit</Button>
      </Layout.Content>
    );
  }
}

export default Form.create({ name: 'normal_reg' })(NormalRegForm);
