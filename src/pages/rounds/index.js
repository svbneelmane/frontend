import React from 'react';
// import Layout from '../../layouts/app';
import { RoundCard } from '../../commons/Card'
// import store from '../reducers/roundReducer';


export default class Rounds extends React.Component{

	// componentWillMount(){
	// 	store.subscribe(()=>{
 //  	let state = store.getState();
 //  })
	// }
	render(){

		return(
			<div>
				<RoundCard type={1} /* eventId={this.props.event} roundId={each.id} */ title="Round 1"/>
			</div>
		);
	}
}