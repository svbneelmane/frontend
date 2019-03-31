import React from "react";

import LBList from "../../commons/LBList";
import leaderboardService from '../../services/leaderboard';
import eventService from '../../services/events';
import { Button } from "../../commons/Form";

export default class extends React.Component {
  BUTTON_NORMAL="Publish";
  BUTTON_CLICKED="Publishing..."
  constructor(props) {
    super(props);
    this.handlePublish=this.handlePublish.bind(this);
    this.state = {
      title:"Event",
      leaderboard: [],
      button: this.BUTTON_NORMAL
    };
  }

  componentWillMount = async () => {

    /*REMOVE THIS*/
    this.setState({
      leaderboard: this.state.leaderboard.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)),
    });

    let event = await eventService.get(this.props.event);

    let round = await eventService.getRound(this.props.event,this.props.round);
    
    let roundno = event.rounds.indexOf(this.props.round)+1;
    this.setState({
      title: event.name+" - Round "+roundno,
      published: round.published
    })
    
    let response = await leaderboardService.getRound(this.props.event,this.props.round);
    console.log(response);

    let leaderboard = response.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));
    leaderboard = leaderboard.filter(slot=>!slot.disqualified);
    let position=0;
    let points=0;
    leaderboard.forEach(slot=>{
      if(slot.points===points)
        slot.position=position;
      else{
        slot.position=++position;
        points=slot.points;
      }
    });
    if(response.length)
      this.setState({
        leaderboard: leaderboard,
      });
  }
  async handlePublish(){
    this.setState({
      button: this.BUTTON_CLICKED
    })
    if(await eventService.publishRoundLeaderboard(this.props.event,this.props.round))
      this.setState({
        published:true
      })
    else
      this.setState({
        button: this.BUTTON_NORMAL
      })
  }
  render = () => (
    <div>
      <h1 style={{textAlign:"center"}}>{this.state.title}</h1>
      {
        this.state.leaderboard.length>0
        ? <>{this.state.leaderboard.map((slot, i) => (
            <LBList
              key={ i }
              position={ slot.position }
              title={ slot.team.name }
              description={ "" }
              points={ slot.points }
            />
          ))}
          <div style={{textAlign:"center",padding:20}}>
           {this.state.published?<div style={{color:"#090"}}>Published</div>:<Button onClick={this.handlePublish} disabled={this.state.button===this.BUTTON_CLICKED}> {this.state.button}</Button>}
          </div>
          </>
        : <h1 style={{textAlign:"center"}}>No results</h1>
      }
    </div>
  );
};
