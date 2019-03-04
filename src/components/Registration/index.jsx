import React from "react";
import "./style.css";
import { Participant } from './subComponents';
import constants from '../../utils/constants';
import {
  Layout, Button, Select, Input, Form, Divider, Icon
} from 'antd';

const Option = Select.Option;

class NormalRegForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      event: [],
      college: [],
      selectedCollege: null,
      selectedEvent: null,
      Participant: [],
    }
    this.id = 0;
  }

  componentWillMount = () => {
    fetch(constants.server + "/events").then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({
        event: res.data,
      })
    });

    fetch(constants.server + "/colleges").then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({
        college: res.data,
      })
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      values.participants.map((each)=> {
        each.faculty = false;
      })


      if (!err) {
        let payload = {
          "college" : this.state.selectedCollege.id,
          "participants" : values.participants,
        }

        fetch(constants.server + "/events/" + this.state.selectedEvent.id + "/teams" , {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));

      }
    });
  }

  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    console.log(this.props)
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(this.id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleEventChange = async (value) => {
    await this.setState({
      selectedEvent: this.state.event[value],
    })
  }

  handleCollegeChange = async (value) => {
    await this.setState({
      selectedCollege: this.state.college[value],
    })

  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => {

      return (
        <div key={k}>
          <Divider/>
          <h3>{"participant " + (k+1)}</h3>
          <Participant whitespace={true} form={this.props.form} idx={k} message="Please Enter Participant's Name" val="name" hint="Name" />
          <Participant whitespace={false}  form={this.props.form} idx={k} message="Please Enter Participant's Registration Number" val="registrationID" hint="Registration Number" />
          <Participant whitespace={false} type="email" form={this.props.form} idx={k} message="Please Enter Participant's Email" val="email" hint="Email" />
          <Participant whitespace={false} form={this.props.form} idx={k} message="Please Enter Participant's Mobile Number" val="mobile" hint="Mobile Number" />
          
          {keys.length > 1 ? (
              <Button
                className="dynamic-delete-button"
                type="danger"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              > Delete Participent </Button>
            ) : null}
        </div>
      );
    });
    return (
      <div className="container">
        <Select
          showSearch
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
          placeholder="Select your college"
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

        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <Form.Item>
            <Button className="field" type="dashed" onClick={this.add}> <Icon type="plus" /> Add Participant </Button>
          </Form.Item>
          
          <Form.Item >
            {
              (this.state.selectedEvent  && this.state.selectedCollege && this.id >= this.state.selectedEvent.minParticipants )  ?
               <Button  type="primary" htmlType="submit">Submit</Button> 
              :
              <Button disabled type="primary" htmlType="submit">Submit</Button>
            }
          </Form.Item>
        </Form>

      </div>
    );
  }
}


export default Form.create({ name: 'normal_reg' })(NormalRegForm);
