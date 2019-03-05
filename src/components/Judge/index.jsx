import React from "react";
import { Form, Button,Row } from 'antd';
import { CriteriaCard } from '../Cards/index'
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
      eventId: this.props.eventId,
      roundId: this.props.roundId,
    }
  }

  componentWillMount = () => {
    if (this.props.eventId) {
      typeof window !== "undefined" && window.localStorage.setItem("eventId", this.props.eventId);
    }

    if (this.props.roundId) {
      typeof window !== "undefined" && window.localStorage.setItem("roundId", this.props.roundId);
    }

    this.setState({
      eventId: localStorage.getItem("eventId"),
      roundId: localStorage.getItem("roundId")
    })

    fetch(constants.server + "/judges").then((res) => {
      return res.json();
    }).then((res) => {
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
    fetch(constants.server + "/events/" + this.state.eventId + "/rounds/" + this.state.roundId).then(res => {
      this.setState({
        round: res.data,
      })
    })
  }

  render() {
    return (
      <div className="judge-container">
        <h2 className="judge-title">Enter Judge Name</h2>
        {!this.state.judgeLocked ?
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
          :
          <div>
            <Row gutter={16}>
              {this.state.round.map((each, k) => {
                return(
                <CriteriaCard key={k} title={each.criteria} />
                );
              })}
            </Row>
          </div>
        }
      </div>
    );
  }
}

export default Form.create({ name: 'judge' })(Judge);