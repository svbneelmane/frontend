import React from "react";
import { Form, Button,  Input, message } from 'antd';
import constants from '../../utils/constants';
import './style.css'

class Judge extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      judges: [],
      JudgeId: null,
      eventId: this.props.event,
      roundId: this.props.round,
    }
  }

  componentWillMount = () => {

   /* fetch(constants.server + "/").then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({
        judges: res.data,
      });
    });*/

    this.getRoundPayload();
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
    let response   = await fetch(constants.server + "/judges/",{
      method: "POST",
      body:JSON.stringify({
        name,
        round:this.props.round
      }),
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
    });
    let json = await response.json();
    console.log(json);
    this.setState({
      JudgeId: json.data._id,
    })
  }

  getRoundPayload = async () => {
    let response   = await fetch(constants.server + "/events/" + this.state.eventId + "/rounds/" + this.state.roundId);
    let json = await response.json();
    this.setState({
        round : json.data
    },()=>{
      console.log(this.state);
    });
  }

  render() {
    console.log(this);
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
           <table className="judgeTable">
             <thead>
               <th>Slot. No</th>
               <th>Team Name</th>
               {
                 this.state.round.criteria.map(i=><th>{i}</th>)
               }
               <th>Total</th>
             </thead>
           </table>
          </div>
        }
      </div>
    );
  }
}

export default Form.create({ name: 'judge' })(Judge);