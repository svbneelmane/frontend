import React from 'react';
import { RoundCard } from '../../commons/Card';
import { getRounds } from '../../actions/eventActions';
import store from '../../reducers/commonReducer';
import eventsService from "../../services/events";
import collegeService from '../../services/colleges'
import { toast } from '../../actions/toastActions';
import { Button } from '../../commons/Form';

export default class Rounds extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      event: {},
      rounds: [],
      teams:[]
    };
  }

  componentWillMount = () => {
    eventsService.get(this.props.event).then(event =>
      this.setState({ event })
    );
    this.fetchData();
    getRounds(this.props.event);
    store.subscribe(() => {
      store.getState().then(state =>
        this.setState({
          rounds: state.data.list,
        })
      );
    });
  }


  async fetchData(){
    let colleges = await collegeService.getAll();
    if(!colleges)
      return toast("ERROR: Failed to load colleges");
    let event = await eventsService.get(this.props.event);
    if(!event)
      return toast("ERROR: Failed to load event");
    let maxTeamsPerCollege = event.maxTeamsPerCollege;
    let teams = [];
    let names=['A','B','C','D','E'];
    colleges.forEach(college=>{
      for(let i=0;i<maxTeamsPerCollege;i++)
        teams.push(`${college.name}, ${college.location} (Team ${names[i]})`)
    });
    this.setState({teams})
  }

  render = () => (
    <div>
      <div>{console.log(this.state)}
        <h2>{ this.state.event.name }</h2>
        <p>
          { this.state.event.faculty ? "Faculty Event" : "Student Event" } organized by { this.state.event.college && this.state.event.college.name + ", " + this.state.event.college.location }
        </p>
      </div>
      <div>
        <div>

          <table>
            <caption>Following are the teams for slotting</caption>
            <thead>
              <tr><th>Sl. No.</th><th>Team</th></tr>
            </thead>
            <tbody>
              {this.state.teams.map((team,index)=><tr><th>{index+1}</th><td>{team}</td></tr>)}
            </tbody>
          </table>
          <Button>Next</Button>
        </div>
      </div>
    </div>
  );
}
