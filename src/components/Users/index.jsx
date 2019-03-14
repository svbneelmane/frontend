import React from "react";
import { Link } from "gatsby";

import reducer from "../../reducers/commonReducer";
import { getAll } from "../../services/userServices";
import constants from "../../utils/constants";

const styles = {
  userCard: {
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

const getUserType = (type) => {
  for (let userType in constants.USER_TYPES)
    if (constants.USER_TYPES.hasOwnProperty(userType))
      if (constants.USER_TYPES[userType] === type) return userType.replace(/_/g, " ");
};

const User = (props) => (
  <Link to={ "/users/" + props.info.id } css={{
    ...styles.userCard,
  }}>
    <div>{ props.info.name }</div>
    <div css={{
      fontSize: ".7em",
      color: "grey",
    }}>{ getUserType(props.info.type) }</div>
  </Link>
);

const UsersList = (props) => (
  <div css={{
    display: "flex",
    flexWrap: "wrap",
  }}>
    <Link to="/users/add" css={{
      ...styles.userCard,
      backgroundColor: "#ff5800",
      color: "white",
      ":hover": {
        color: "white",
        boxShadow: "0px 5px 50px -4px rgba(0, 0, 0, .1)",
      }
    }}>
      Add User
    </Link>
    {
      props.users
      ? props.users.map((user, i) => (
          <User info={user} key={i} />
        ))
      : null
    }
  </div>
);

export default class Users extends React.Component {
  state = {
    users: [],
  };

  componentWillMount() {
    getAll();

    reducer.subscribe(() => {
      reducer.getState().then(state => {
        this.setState({ users: state.data.list });
      });
    });
  }

  render = () => (
    <div>
      <h2>Users</h2>
      <p>Users of MUCAPP.</p>
      <div>
        <UsersList users={ this.state.users } />
      </div>
    </div>
  );
};
