import React from "react";

import leaderboardService from '../../services/leaderboard';
import eventService from '../../services/events';
import events from "../../services/events";
import { Button } from "../../commons/Form";

export default class Bias extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title:"Event",
      teams:[]
      
    };
  }

  componentWillMount = async () => {

    let teams =  await events.getSlots(this.props.event, this.props.round);
    this.setState({teams});

    let event = await eventService.get(this.props.event);
    let roundno = event.rounds.indexOf(this.props.round)+1;
    this.setState({
      title: event.name+" - Round "+roundno
    })
    
    let response = await leaderboardService.getRound(this.props.event,this.props.round);
    if(response.length)
      this.setState({
        leaderboard: response.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)),
      });
  }

  render = () => (
    <div>
      <h1 style={{textAlign:"center"}}>{this.state.title}</h1>
      {
        this.state.teams.length>0
        ? 
        (<table css={{
          width:"100%"
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
            this.state.teams.map((slot, index) => (
            // <LBList
            //   key={ i }
            //   position={ i + 1 }
            //   title={ team.college.name }
            //   description={ team.college.location }
            //   points={ team.points }
            // />
            <tr key={index} style={{textAlign:"center"}}>
              <td>{slot.number}</td>
              <td>{slot.team.name}</td>
              <td>...</td>
              <td><input type="number" min="0" value="0" style={{width:100}}/></td>
              <td>...</td>
              <td><Button>Disqualify</Button></td>
            </tr>
          ))
        
          }
          </tbody>
        </table>): <h1 style={{textAlign:"center"}}>No results</h1>
      }
    </div>
  );
};
