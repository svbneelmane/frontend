import React from 'react';
// import Layout from '../../layouts/app';
import { RoundCard } from '../../commons/Card'
import {fetchRounds} from '../../actions/roundAction';
import reducer from '../../reducers/roundReducer';

export default class Rounds extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			rounds  : {},
			eventId : null
		}		
	}

	componentWillMount(){
		fetchRounds( this.state.eventId );
		reducer.subscribe(()=>{
			let reducerState = reducer.getState();
			if(reducerState.type=="ROUNDS_FETCHED")
				this.setState({rounds:reducerState.data});
		})
	}

	render(){
		return(
			<div>
				<RoundCard type={1} /* eventId={this.props.event} roundId={each.id} */ title="Round 1"/>
			</div>
		);
	}
}