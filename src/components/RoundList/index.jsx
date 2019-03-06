import React from "react";
import { Row, Empty } from 'antd';
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
    let rounds = this.state.rounds;
    return (
      <div>
        <Row gutter={16}>
          {rounds.length===0?<Empty description="No rounds to show"/>:rounds.map((each, k) => {
            return (
              <RoundCard eventId={this.props.event} key={k}  id={each.id} status={each.status} title={"Round " + (k +1)} />
            );
          })}

        </Row>
      </div>
    );
  }
}
