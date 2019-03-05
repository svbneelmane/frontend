// TODO: This is just a temporary component to test login.

import React,{Component} from "react";
import constants from '../../utils/constants';
import './style.css';
import { message } from "antd";

export default class GenerateSlots extends Component {
  state={
    slotted:false,
    loaded:false,
    slottingStarted:false
  }
  constructor(props){
    super(props);
    this.startSlotting=this.startSlotting.bind(this);
  }
  teams=[];
  async componentDidMount(){
    /**
     * TODO: Fetch teams from server (in slotted order)
     */
    let response =  await fetch(constants.server + `/events/${this.props.event}/rounds/${this.props.round}/slots`);
    let json = await response.json();
    console.log('json',json);
    ///:event/rounds/:round/slots
    if(json.data.length===0){
      message.success("Not Slotted");
    }

    this.setState({
      loaded:true,
      slotted:json.data.length>0
    });
  }
  async startSlotting(){
    console.log(this);
    let intro = document.querySelector("#intro");
    intro.classList.add("hide");
    let response =  await fetch(constants.server + `/events/${this.props.event}/rounds/${this.props.round}/slots`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });
    let json = await response.json();
    console.log(json);


  }
  notLoaded=()=>(<div>Please wait while we check for slots...</div>);

  notSlotted=()=>(
    <div id="slotWrapper">
      <div id="intro">
        <h1>Click to generate slots now</h1>
        
        <button className="slotButton" onClick={this.startSlotting}>START</button>
      </div>
      <div className="table">
      </div>
    </div>);

  slotted=()=>(<div>TODO: Slotted table</div>);
  render=()=>
    this.state.loaded?
      (this.state.slotted?
          this.slotted
          :this.notSlotted())
      :this.notLoaded();
    

}