import React from "react";
import html2canvas from 'html2canvas'

import leaderboardService from '../../services/leaderboard';
import eventService from '../../services/events';
import Top from "../../images/top.png"
import Bottom from "../../images/bottom.png"
import { Button } from "../../commons/Form";

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
    let event = await eventService.get(this.props.event);
    await this.setState({ event });

    eventService.getSlots(this.props.event, this.props.round).then(slots =>
      leaderboardService.getRound(this.props.event,this.props.round).then(lb => {
        if (!lb.length) return;

        let teams = slots;
        
        for (let team of teams) {
          let score = lb.find(score => score.team._id === team.team._id);

          team.points = score.judgePoints || 0;
          // team.points = score.points || 0;
          team.overtime = score.overtime || 0;
          team.bias = score.bias;
          team.total = score.points;
        }
        let scores = Array.from(new Set(teams.map(team => team.points)));
        teams.filter(slot => !slot.disqualified).sort((a, b) => parseFloat(b.points) - parseFloat(a.points))
        let ranks=this.state.ranks;
        teams.forEach(team=>{
          let rank = scores.indexOf(team.points)+1;
          if(rank>=1&&rank<=3)
            ranks[rank].push("#"+team.number+" "+team.team.name.match(/[\w\s]+/)[0]);
        });
        console.log(ranks);
        this.setState({  scoreStatus: true,ranks },()=>{
          console.log(this.state.teams);
        });
      })
    );

    
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
      <div css={{textAlign:"center"}}>
        <h1 css={{color:"#900"}}>FIRST POSITION</h1>
        {
          this.state.ranks[1].map((i,j)=><h2 key={j}>{i}</h2>)
        }
      </div>
      <div css={{textAlign:"center"}}>
        <h1 css={{color:"#900"}}>SECOND POSITION</h1>
        {
          this.state.ranks[2].map((i,j)=><h2 key={j}>{i}</h2>)
        }
      </div>
      <div css={{textAlign:"center"}}>
        <h1 css={{color:"#900"}}>THIRD POSITION</h1>
        {
          this.state.ranks[3].map((i,j)=><h2 key={j}>{i}</h2>)
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
