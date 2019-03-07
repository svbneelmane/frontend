import React from "react";
import { List } from "antd";
import constants from "../../utils/constants";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      leaderboard: [],
    };
  }

  componentWillMount = () => {
    fetch(
      constants.server
        + "/events/"
        + this.state.eventId
        + "/rounds/"
        + this.state.roundId
        + "/leaderboard"
    ).then(res => res.json()).then(res => {
      this.setState({
        leaderboard: res.data.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)),
      });
    });
  }

  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.state.leaderboard}
        renderItem={(item, i) => (
          <List.Item>
            <List.Item.Meta
              title={ (i + 1) + ". " + item.college }
              description={ item.points + " points "}
              style={{
                cursor: "pointer",
              }}
            />
          </List.Item>
        )}
      />
    );
  }
};
