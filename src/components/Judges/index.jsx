import React from "react";
import { Link } from "gatsby";

import reducer from "../../reducers/commonReducer";
import { getAll } from "../../services/judgeServices";

const styles = {
  judgeCard: {
    display: "inline-block",
    marginRight: 20,
    marginBottom: 20,
    padding: 20,
    width: 250,
    borderRadius: 3,
    border: "2px solid rgba(0, 0, 0, .1)",
    color: "inherit",
    boxShadow: "0px 5px 20px -4px rgba(0, 0, 0, .1)",
    transition: "box-shadow .2s ease",
    ":hover": {
      color: "inherit",
      boxShadow: "0px 5px 50px -4px rgba(0, 0, 0, .1)",
    }
  },
};

const Judge = (props) => (
  <Link to={ "/judges/" + props.info.id } css={{
    ...styles.judgeCard,
  }}>
    <div>{ props.info.name }</div>
    <div css={{
      fontSize: ".7em",
      color: "grey",
    }}>{ props.info.rounds.length + " round" + (props.info.rounds.length === 1 ? "" : "s") }</div>
  </Link>
);

const JudgesList = (props) => (
  <div css={{
    display: "flex",
    flexWrap: "wrap",
  }}>
    <Link to="/judges/add" css={{
      ...styles.judgeCard,
      backgroundColor: "#ff5800",
      color: "white",
      ":hover": {
        color: "white",
        boxShadow: "0px 5px 50px -4px rgba(0, 0, 0, .1)",
      }
    }}>
      Add Judge
    </Link>
    {
      props.judges
      ? props.judges.map((judge, i) => (
          <Judge info={judge} key={i} />
        ))
      : null
    }
  </div>
);

export default class Judges extends React.Component {
  state = {
    judges: [],
  };

  componentWillMount() {
    getAll();

    this.unsubscribe=reducer.subscribe(() => {
      reducer.getState().then(state => {
        this.setState({ judges: state.data.list });
      });
    });
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  render = () => (
    <div>
      <h2>Judges</h2>
      <p>Judges in in Utsav events.</p>
      <div>
        <JudgesList judges={ this.state.judges } />
      </div>
    </div>
  );
};
