import React from "react";
import { AutoComplete, Form, Button } from 'antd';
import constants from '../../utils/constants';
import { AutoCompleteInput } from "./subComponents";

class Judge extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      judges: [],
      selectedJudge: null,
      judgeLocked: false,
    }
  }

  componentWillMount = () => {
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
      selectedJudge: value,
    })
  }

  handleSubmit = () => {
    this.setState({
      judgeLocked: true,
    })
  }

  render() {
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