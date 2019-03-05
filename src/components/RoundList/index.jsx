import React from "react";
import { Row } from 'antd';
import { RoundCard } from '../Cards/index';
import constants from '../../utils/constants';

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.event,
      rounds : [],
    }
  }

  componentWillMount = () => {
    fetch(constants.server + "/events/" + this.props.event + "/rounds").then(res => {
      return res.json();
    }).then(res => {
      console.log(res);
      this.setState({
        rounds : res.data,
      })
    })
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          {this.state.rounds.map((each, k) => {
            return (
              <RoundCard key={k}  id={each.id} status="Finished" tagColor="#fadb14" title={"round " + k} />
            );
          })}
        </Row>
      </div>
    );
  }
}
