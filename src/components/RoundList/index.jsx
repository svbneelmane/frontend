import React from "react";
import { Row } from 'antd';
import { RoundCard } from '../Cards/index';
import constants from '../../utils/constants';

export default class RoundView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds : [],
    }
  }

  componentWillMount = () => {
    fetch(constants.server + "/events/" + this.props.event + "/rounds").then(res => {
      return res.json();
    }).then(res => {
      this.setState({
        rounds : res.data,
      })
    })
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          {console.log(this.state)}
          {this.state.rounds.map((each, k) => {
            console.log(each)
            return (
              <RoundCard eventId={this.props.event} key={k}  id={each.id} status={each.status} title={"round " + (k +1)} />
            );
          })}
        </Row>
      </div>
    );
  }
}
