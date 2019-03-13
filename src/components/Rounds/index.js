import React from 'react';
import { RoundCard } from '../../commons/Card';
import { getRounds } from '../../actions/eventActions';
import store from '../../reducers/commonReducer';

export default class Rounds extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			rounds : []
		}
	}

	componentWillMount = () => {
		getRounds(this.props.event);
		store.subscribe(async () => {
      let state = await store.getState();
      this.setState({
        rounds: state.data,
      })
    });
	}


	render(){
		return(
			<div>
				{this.state.rounds.map((each, i) =>{
					return(
						<RoundCard key={i} type={1}  eventId={each.event} roundId={each.id} title={`Round ${i+1}`} />
					)
				})}
			</div>
		);
	}
}