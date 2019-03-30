import React from "react";

import LBList from "../../commons/LBList";
import leaderboardService from '../../services/leaderboard';
import eventService from '../../services/events';

export default class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title:"Event",
      leaderboard: [],
    };
  }

  componentWillMount = async () => {

    /*REMOVE THIS*/
    this.setState({
      leaderboard: this.state.leaderboard.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)),
    });

    let event = await eventService.get(this.props.event);
    console.log(event);
    let roundno = event.rounds.indexOf(this.props.round)+1;
    this.setState({
      title: event.name+" - Round "+roundno
    })
    
    let response = await leaderboardService.getRound(this.props.event,this.props.round);
    console.log(response);
    if(response.length)
      this.setState({
        leaderboard: response.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)),
      });
  }

  render = () => (
    <div>
      <h1 style={{textAlign:"center"}}>{this.state.title}</h1>
      {
        this.state.leaderboard.length>0
        ? this.state.leaderboard.map((slot, i) => (
            <LBList
              key={ i }
              position={ i + 1 }
              title={ slot.team.name }
              description={ "" }
              points={ slot.points }
            />
          ))
        : <h1 style={{textAlign:"center"}}>No results</h1>
      }
    </div>
  );
};
