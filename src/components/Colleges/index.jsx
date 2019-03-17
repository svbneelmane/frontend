import React from "react";
import { Link } from "gatsby";

import reducer from "../../reducers/commonReducer";
import { getAll } from "../../services/collegeServices";
import Loader from "../../commons/Loader";

const styles = {
  collegeCard: {
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

const College = (props) => (
  <Link to={ "/colleges/" + props.info.id + "/teams" } css={{
    ...styles.collegeCard,
  }}>
    <div>{ props.info.name }</div>
    <div css={{
      fontSize: ".9em",
      color: "grey",
    }}>{ props.info.location }</div>
  </Link>
);

const CollegeList = (props) => (
  <div css={{
    display: "flex",
    flexWrap: "wrap",
  }}>
    <Link to="/colleges/add" css={{
      ...styles.collegeCard,
      backgroundColor: "#ff5800",
      color: "white",
      ":hover": {
        color: "white",
        boxShadow: "0px 5px 50px -4px rgba(0, 0, 0, .1)",
      }
    }}>
      Add College
    </Link>
    {
      props.colleges
      ? props.colleges.map((college, i) => (
          <College info={college} key={i} />
        ))
      : null
    }
  </div>
);

export default class Colleges extends React.Component {
  state = {
    colleges: [],
    loading: true,
  };

  componentWillMount() {
    getAll();

    this.unsubscribe=reducer.subscribe(() => {
      reducer.getState().then(state => {
        this.setState({ colleges: state.data.list, loading: false });
      });
    });
  }
  componentWillUnmount(){
    this.unsubscribe();
  }

  render = () => (
    <div>
      <h2>Colleges</h2>
      <p>Colleges participating in Utsav.</p>
      <div>
        {
          this.state.loading
          ? <Loader/>
          : <CollegeList colleges={ this.state.colleges } />
        }
      </div>
    </div>
  );
};
