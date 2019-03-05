import React from "react";
import { Row } from 'antd';
import { RoundCard } from '../Cards/index';
import constants from '../../utils/constants';

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds : [],
    }
  }

  componentWillMount = () => {
    if(this.props.eventId) {
      typeof window !== "undefined" && window.localStorage.setItem("eventId", this.props.eventId);
    }
    
    fetch(constants.server + "/events/" + localStorage.getItem("eventId") + "/rounds").then(res => {
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
          {this.state.rounds.map((each, k) => {
            return (
              <RoundCard key={k} setRoundId={this.props.setRoundId} id={each.id} status="Finished" tagColor="#fadb14" title={"round " + k} />
            );
          })}
        </Row>
      </div>
    );
  }
}
