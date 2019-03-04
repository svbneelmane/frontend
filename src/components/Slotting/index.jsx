// TODO: This is just a temporary component to test login.

import React,{Component} from "react";
import './style.css';

export default class Slotting extends Component {
  teams=[];
  componentDidMount(){
    /**
     * TODO: Fetch teams from server (in slotted order)
     */
    let teams =[
      'KMC Manipal',
      'SOAHS, KMC Manipal',
      'SOLS, KMC Manipal',
      'SOLS, KMC Manipal'
    ];
  }
  startSlotting(){
    let intro = document.querySelector("#intro");
    intro.classList.add("hide");
  }
  render=()=>(
  <>
    <div id="slotWrapper">
      <div id="intro">
        <h1>Slotting</h1>
        
        <button class="slotButton" onClick={this.startSlotting}>START</button>
      </div>
      <div class="table">

      </div>
    </div>
   
  </>
);

}