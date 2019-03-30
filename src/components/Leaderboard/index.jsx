import React from "react";

import LBList from "../../commons/LBList";
import constants from "../../utils/constants";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      leaderboard: [],
    };
  }

  getRank = (points) => {
    if (!this.state.leaderboard.length) return 0;

    let scores = Array.from(new Set(this.state.leaderboard.map(team => team.points)));
    return scores.indexOf(points) + 1;
  };

  componentWillMount = () => {
    fetch(
      constants.server
        + "/leaderboard"
    ).then(res => res.json()).then(res => {
      this.setState({
        leaderboard: res.data.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)),
      });
    })
  }

  render = () => (
    <div>
      {
        this.state.leaderboard
        ? this.state.leaderboard.map((team, i) => (
            <LBList
              key={ i }
              position={ this.getRank(team.points) }
              title={ team.college.name }
              description={ team.college.location }
              points={ team.points }
            />
          ))
        : null
      }
    </div>
  );
};
