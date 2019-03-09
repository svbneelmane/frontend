import React, { Component } from "react";
import store from "../../reducers/sidebarReducer";
import './style.css';
import { Link } from "gatsby";
export default class Sidebar extends Component{
    state={
      open:false
    }
    componentDidMount(){
      store.subscribe(()=>{
        this.setState({open:store.getState()==='open'})
      })
    }
    render=() => (
    <sidebar className="sidebar" css = {{
      display: "block",
      borderRight: "1px solid #efefef",
      minWidth: 300,
      marginLeft:this.state.open?0:-300,
      minHeight: "100vh",
      transition: "margin-left 0.3s ease-out"
    }}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/adduser">Add User</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        
      </ul>
    </sidebar>
  );
}
