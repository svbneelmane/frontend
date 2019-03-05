import React from "react";
import { Form, Button, Row } from 'antd';
//import { CriteriaCard } from '../Cards/index'
import constants from '../../utils/constants';
import { AutoCompleteInput } from "./subComponents";
import './style.css'

class Judge extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      judges: [],
      judgeLocked: false,
      JudgeId: null,
      eventId: this.props.event,
      roundId: this.props.round,
    }
  }

  componentWillMount = () => {

    fetch(constants.server + "/judges").then((res) => {
      return res.json();
    }).then((res) => {
      console.log(res)
      this.setState({
        judges: res.data,
      });
    });
  }

  onSelect = (value) => {
    this.setState({
      JudgeId: value,
    })
  }

  handleSubmit = () => {
    this.setState({
      judgeLocked: true,
    })
    this.getRoundPayload();
  }

  getRoundPayload = () => {
    console.log(constants.server + "/events/" + this.state.eventId + "/rounds/" + this.state.roundId)
    // fetch(constants.server + "/events/" + this.state.eventId + "/rounds/" + this.state.roundId).then(res => {
    //   this.setState({
    //     round: res.data,
    //   })
    // })
  }

  render() {
    console.log("here")
    return (

      <div>
        {!this.state.judgeLocked ?
          <div className="judge-container">
            <h2 className="judge-title">Enter Judge Name</h2>
            <Form
              onSubmit={event => {
                event.preventDefault();
                this.handleSubmit(event);
              }}
            >
              <Form.Item>
                <AutoCompleteInput judges={this.state.judges} onSelect={this.onSelect} />
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
            <Row gutter={16}>
              {console.log(this.state.round)}
              {/* {this.state.round.map((each, k) => {
                return(
                <CriteriaCard key={k} title={each.criteria} />
                );
              })} */}
            </Row>
          </div>
        }
      </div>
    );
  }
}

export default Form.create({ name: 'judge' })(Judge);