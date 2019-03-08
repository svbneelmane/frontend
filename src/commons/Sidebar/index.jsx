import React, { Component } from "react";
import store from "../../reducers/sidebarReducer";
import './style.css';
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
        <li>Nav Link 1</li>
        <li>Nav Link 2</li>
        <li>Nav Link 3</li>
        <li>Nav Link 4</li>
      </ul>
    </sidebar>
  );
}
