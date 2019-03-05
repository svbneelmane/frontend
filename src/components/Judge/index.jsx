import React from "react";
import { AutoComplete, Form, Button } from 'antd';
import constants from '../../utils/constants';
import { AutoCompleteInput } from "./subComponents";

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
    if(this.props.eventId) {
      typeof window !== "undefined" && window.localStorage.setItem("eventId", this.props.eventId);
    }

    if(this.props.roundId) {
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
  }

  render() {
    console.log(this.state);
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {!this.state.judgeLocked ?
            <Form
              onSubmit={event => {
                event.preventDefault();
                this.handleSubmit(event);
              }}
            >
              <Form.Item>
                <AutoCompleteInput judges={this.state.judges} onSelect={this.onSelect}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Start
                </Button>
              </Form.Item>
            </Form>
          :
            null
        }
      </div>
    );
  }
}

export default Form.create({ name: 'judge' })(Judge);