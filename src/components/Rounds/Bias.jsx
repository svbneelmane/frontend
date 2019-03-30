import React from "react";

import LBList from "../../commons/LBList";
import leaderboardService from '../../services/leaderboard';
import eventService from '../../services/events';

export default class Bias extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title:"Event",
      leaderboard: [
        {points:12,
          college:{
            name:"MIT Team A",
            location:"Manipal"
          }
        },
        {points:48,
          college:{
            name:"KMC Team B",
            location:"Manipal"
          }
        },
        {points:12,
          college:{
            name:"MCODS Team B",
            location:"Manipal"
          }
        },
        {points:24,
          college:{
            name:"Sikkim Team A",
            location:"Manipal"
          }
        },
        
      ],
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
        ? 
        (<table css={{
          width:"100%"
        }}>
          <tr>
            <th>Slot No.</th>
            <th>Team Name</th>
            <th>Judge's Score</th>
            <th>Bias</th>
            <th>Total</th>
          </tr>
          {
            this.state.leaderboard.map((team, i) => (
            // <LBList
            //   key={ i }
            //   position={ i + 1 }
            //   title={ team.college.name }
            //   description={ team.college.location }
            //   points={ team.points }
            // />
            <tr></tr>
          ))
        
          }
        </table>): <h1 style={{textAlign:"center"}}>No results</h1>
      }
    </div>
  );
};
