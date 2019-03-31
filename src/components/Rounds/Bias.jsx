import React from "react";

import leaderboardService from '../../services/leaderboard';
import eventService from '../../services/events';
import { Button } from "../../commons/Form";
import Dialog from "../../commons/Dialog";
import { navigate } from "gatsby";

export default class Bias extends React.Component {
  BUTTON_NORMAL="Save";
  BUTTON_CLICKED="Saving...";
  constructor(props) {
    super(props);
    this.handleOvertime=this.handleOvertime.bind(this);
    this.confirmDisqualify=this.confirmDisqualify.bind(this);
    this.handleDisqualifcation=this.handleDisqualifcation.bind(this);
    this.handleSave=this.handleSave.bind(this);
    this.state = {
      title:"Event",
      slots:[],
      button: this.BUTTON_NORMAL
    };
  }

  componentWillMount = async () => {
    //Load slots
    

    //get  event details
    let event = await eventService.get(this.props.event);
    //find round number
    let roundno = event.rounds.indexOf(this.props.round)+1;
    //set title
    this.setState({
      title: event.name+" - Round "+roundno
    })
    
    //get scores
    let scores = await leaderboardService.getRound(this.props.event,this.props.round);
    
    
    let slots =  await eventService.getSlots(this.props.event, this.props.round);
    
    slots.forEach(slot=>{
      if(scores.length){
        let score = scores.find(score=>score.team._id===slot.team._id);
        slot.points = score.judgePoints;
        slot.overtime = Number(score.overtime);
        slot.bias = score.bias;
        slot.total=score.points;
      }
      else{
        slot.points = 0;
        slot.total=slot.points;
        slot.overtime=0;
      }
      
      //mapping slots to scores
      
    })

    //slots.forEach(slot=>{slot.ovetime=0;});
    this.setState({slots});
    console.log(slots);
    
    // if(response.length)
    //   this.setState({
    //     //sort rouds as per score
    //     leaderboard: response.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)),
    //   });
  }

  handleOvertime(event){
    let slots = this.state.slots;
    let number = Number(event.target.name.replace('overtime-',''));
    let slot = slots.find(slot=>slot.number===number);
    slot.overtime=Number(event.target.value);
    let minus = slot.overtime>0?5*(Math.floor(slot.overtime/5)+1):0;

    slot.total = slot.points - minus;
    this.setState({slots});
  }
  confirmDisqualify(number){
    let slots = this.state.slots;
    let slot = slots.find(slot=>slot.number===number); 
    this.setState({
      disqualifyNumber:number,
      dialogBody:"Are you sure you want to disqualify "+slot.team.name+"?",
      showDialog:true
    });
  }
  handleDisqualifcation(){
    let slots = this.state.slots;
    let number = this.state.disqualifyNumber;
    let slot = slots.find(slot=>slot.number===number); 
    slot.team.disqualified=true;
    this.setState({
      slots,
      showDialog:false
    });
    console.log("SUCCEESS");
  }
  async handleSave(){
    let bias = this.state.slots.map(slot=>{
      return{
        id:slot.team._id,
        overtime:slot.overtime,
        disqualified: slot.team.disqualified
      }
    });
    await this.setState({button: this.BUTTON_CLICKED});
    if(await eventService.addBias(this.props.event,this.props.round,bias))
      return navigate(`events/${this.props.event}/rounds`);
    this.setState({button: this.BUTTON_NORMAL});
    
  }
  render = () => (
    <div>
      <h1 style={{textAlign:"center"}}>{this.state.title}</h1>
      {
        this.state.slots.length>0
        ? 
        (<>
        <table css={{
          width:"100%",
          borderCollapse:"collapse"
        }}>
        <thead>
          <tr>
            <th>Slot No.</th>
            <th>Team Name</th>
            <th>Judge's Score</th>
            <th>Overtime (Mins)</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.slots.map((slot, index) => (
            // <LBList
            //   key={ i }
            //   position={ i + 1 }
            //   title={ team.college.name }
            //   description={ team.college.location }
            //   points={ team.points }
            // />
            <tr key={index} style={{textAlign:"center"}} css={
              slot.team.disqualified?{
                color:"#900",
                background:"#fad4d4"
              }:{}
            }>
              <td>{slot.number}</td>
              <td>{slot.team.name}</td>
              <td>{slot.points}</td>
              <td><input type="number" name={`overtime-`+slot.number} min="0" onChange={this.handleOvertime} value={this.state.slots[index].overtime} style={{width:100}}/></td>
              <td>{slot.total}</td>
              <td>{slot.team.disqualified?"Disqualified":<Button onClick={()=>this.confirmDisqualify(slot.number)}>Disqualify</Button>}</td>
            </tr>
          ))
        
          }
          </tbody>
        </table>
        <div css={{textAlign:"right",marginRight:"100px",marginTop:10}}>
          <Button onClick={this.handleSave} disabled={this.state.button===this.BUTTON_CLICKED}>{this.state.button}</Button>
        </div>
        </>
        ): <h1 style={{textAlign:"center"}}>No results</h1>
        
      }
      <Dialog 
        title="Confrim disqualification" 
        body={this.state.dialogBody}
        positiveButton={{
          label:"Yes",
          handler:this.handleDisqualifcation
        }}
        negativeButton={{
          label:"No"
        }}
        show={this.state.showDialog}
      />
    </div>
  );
};
