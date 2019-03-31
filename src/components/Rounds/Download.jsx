import React from "react";
import html2canvas from 'html2canvas'

import leaderboardService from '../../services/leaderboard';
import eventService from '../../services/events';
import Top from "../../images/top.png"
import Bottom from "../../images/bottom.png"
import { Button } from "../../commons/Form";
import collegesService from '../../services/colleges';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.download = this.download.bind(this);
    this.state = {
      event: {},
      leaderboard: [],
      published: false,
      ranks: {1:[],2:[],3:[]},
      button: this.BUTTON_NORMAL,
    };
  }

  getRank = (points) => {
    if (!this.state.teams.length) return 0;

    let scores = Array.from(new Set(this.state.teams.map(team => team.points)));
    return scores.indexOf(points) + 1;
  };

  componentWillMount = async () => {
    console.log(1);
    let event = await eventService.get(this.props.event);
    console.log(2);

    await this.setState({ event });
    console.log(3);

    let slots = await eventService.getSlots(this.props.event, this.props.round);
    console.log(4);

    let lb = await leaderboardService.getRound(this.props.event,this.props.round);
    console.log(5);

    if (!lb.length) return;
    console.log(6);

    let teams = slots;
    for (let team of teams) {
      let score = lb.find(score => score.team._id === team.team._id);

      team.points = score.judgePoints || 0;
      // team.points = score.points || 0;
      team.overtime = score.overtime || 0;
      team.bias = score.bias;
      team.total = score.points;
    }
    console.log(7);

    let scores = Array.from(new Set(teams.map(team => team.points))).sort((a,b)=>b-a);
    console.log(8);

    teams=teams.filter(slot => !slot.disqualified).sort((a, b) => parseFloat(b.points) - parseFloat(a.points))
    let ranks=this.state.ranks;
    console.log(9);

    for(let i=0;i<teams.length;i++){
      let team=teams[i];
      let rank = scores.indexOf(team.points)+1;
      
      if(rank>=1&&rank<=3){
        
       
      
        let name = <>{"#"+team.number+" "+team.team.name.match(/[\w\s]+/)[0]}</>;

        if(team.team.members.length===1){
          let participants = await collegesService.getParticipants(team.team.college)
          let participant=participants.find(participant=>team.team.members.includes(participant.id));
          name = <>{"#"+team.number+" "+participant.name}<br/><small>{team.team.name.match(/[\w\s]+/)[0]}</small></>;
        }
        console.log(name);
        ranks[rank].push(name);


      }
    }
    console.log(10);

    console.log("aaa");
    await this.setState({  scoreStatus: true,ranks });
    console.log(11);

    
  }

  async componentDidMount(){
    
    //document.body.appendChild(canvas);
  }
  async download(){
    let leaderboard = document.querySelector("#leaderboard");
    let canvas = await html2canvas(leaderboard);
    let data = canvas.toDataURL("image/png");
    let a = document.createElement("A");
    a.href=data;
    console.log(this.state);
    a.download=this.state.event.name;
    a.click();
  }
  render = () => (
    <>
    <div id="leaderboard" css={{width:1000,background: "#eae8e3",margin:"auto"}}>
      <img src={Top} alt="top" style={{width:"100%"}}/>
      <h1 css={{color:"#900",fontSize:"3em",fontFamily:"'Cinzel Decorative', cursive",textAlign:"center"}}>{this.state.event.name}</h1>
      <div css={{textAlign:"center"}}>
        <h2 css={{color:"#900"}}>FIRST POSITION</h2>
        {
          this.state.ranks[1].map((i,j)=><h3 key={j}>{i}</h3>)
        }
      </div>
      <div css={{textAlign:"center"}}>
        <h2 css={{color:"#900"}}>SECOND POSITION</h2>
        {
          this.state.ranks[2].map((i,j)=><h3 key={j}>{i}</h3>)
        }
      </div>
      <div css={{textAlign:"center"}}>
        <h2 css={{color:"#900"}}>THIRD POSITION</h2>
        {
          this.state.ranks[3].map((i,j)=><h3 key={j}>{i}</h3>)
        }
      </div>
      <img src={Bottom} alt="top" style={{width:"100%"}}/>
    </div>
    <div style={{textAlign:"center",padding:20}}>
      <Button onClick={this.download}>Download</Button>
    </div>
    
    </>
  );
};
