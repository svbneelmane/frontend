import React from "react";
import { Link } from "gatsby";

import reducer from "../../reducers/commonReducer";
import { getTeamsForCollege } from "../../services/collegeServices";
import { TeamList } from "../../commons/List";


export default class Teams extends React.Component {
  state = {
    teams: [],
  };

  componentWillMount() {
    getTeamsForCollege(this.props.college);

    reducer.subscribe(() => {
      reducer.getState().then(state => {
        this.setState({ teams: state.data.list });
      });
    });
  }

  render = () => {
    return (
      <div>
        <h2>Teams</h2>
        <div>
        {
          this.state.teams.map((team, i) => (
              <TeamList
                key={ i }
                name={team.name}
                subName={team.event.name}
              />
            ))
        }
        </div>
      </div>
    );
  }
};
