import React, { Component } from "react";
import { Link } from "gatsby";

import store from "../../reducers/sidebarReducer";

const SidebarItem = (props) => (
  <li>
    <Link to={ props.to } title={ props.title } css={{
      display: "block",
      marginTop: 10,
      padding: 10,
      paddingLeft: 50,
      fontSize: ".9em",
      color: window.location.pathname === props.to ? "#ff5800" : "inherit",
      backgroundColor: window.location.pathname === props.to ? "rgba(255, 209, 0, .2)" : "",
      borderRight: "3px solid",
      borderColor: window.location.pathname === props.to ? "#ff5800" : "white",
      ":hover": {
        color: "#ff5800",
      },
    }}>
      { props.title }
    </Link>
  </li>
);

const SidebarItems = () => (
  <ul css = {{
    display: "flex",
    flexDirection: "column",
    margin: 0,
    marginTop: 20,
    listStyle: "none",
    padding: 0,
  }}>
    <SidebarItem to="/" title="Home" />
    <SidebarItem to="/events" title="Events" />
    <SidebarItem to="/adduser" title="Add User" />
    <SidebarItem to="/login" title="Login" />
    <SidebarItem to="/profile" title="Profile" />
  </ul>
);

export default class Sidebar extends Component {
  state = {
    open: false
  };

  componentDidMount(){
    store.subscribe(() => {
      this.setState({ open:store.getState() === "open" });
    });
  }

  render = () => (
    <div css = {{
      display: "block",
      height: "100vh",
      overflow: "hidden",
      minWidth: 200,
      marginLeft: this.state.open ? 0 : -200,
      minHeight: "100vh",
      boxShadow: "25px 0px 50px -30px rgba(0, 0, 0, .1)",
      transition: "margin .3s ease-out",
      ":hover": {
        overflowY: "auto",
      },
    }}>
      <SidebarItems />
    </div>
  );
}
