import React from "react";
import { Form, Button, message, Input } from 'antd';
import constants from '../../utils/constants';
import { JudgeTable } from "./subComponents";

import './style.css'

class Judge extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state =JSON.parse(localStorage.getItem("Judge"))||{
      judges: [],
      judgeLocked: false,
      JudgeId:null,
      eventId: this.props.event,
      roundId: this.props.round,
      round: null,
      slotData: null,
    }
  }

  componentWillMount = () => {
    this.getRoundPayload();
  }

  componentDidMount = () => {
    fetch(constants.server + `/events/${this.state.eventId}/rounds/${this.state.roundId}/slots`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          slotData: res.data,
        })
      })
  }

  onSelect = (value) => {
    this.setState({
      JudgeId: value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.saveJudge();
  }
  async saveJudge(){
    let name = document.querySelector("#judge-name").value;
    if(name.length===0)
      {
        message.error("Name is required!");
        return;
      }
    let response   = await fetch(constants.server + `/events/${this.state.eventId}/rounds/${this.state.roundId}/judge`,{
      method: "POST",
      body:JSON.stringify({
        name
      }),
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
    });
    let json = await response.json();
    console.log('JSON',json);
    console.log(json.data.id);
    this.setState({
      JudgeId: json.data._id,
    },()=>{
      console.log(1);
      localStorage.setItem('Judge',JSON.stringify(this.state));
    })
  }

  getRoundPayload = async () => {
    let response   = await fetch(constants.server + `/events/${this.state.eventId}/rounds/${this.state.roundId}`);
    let json = await response.json();
    await this.setState({
        round : json.data
    });
  }

  render() {
    return (
      <div>
        {!this.state.JudgeId ?
          <div className="judge-container">
            <h2 className="judge-title">Enter Judge Name</h2>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item>
                <Input id="judge-name"/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Start
                </Button>
              </Form.Item>
            </Form>
          </div>
          :
          <div>
            <JudgeTable round={this.state.round} slotData={this.state.slotData}/>
          </div>
        }
      </div>
    );
  }
}

export default Form.create({ name: 'judge' })(Judge);