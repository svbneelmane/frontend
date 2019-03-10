import React from 'react';
// import Layout from '../../layouts/app';
import { RoundCard } from '../../commons/Card'

export default class Rounds extends React.Component{

	render(){
		return(
			<div>
				<RoundCard type={1} /* eventId={this.props.event} roundId={each.id} */ title="Round 1"/>
			</div>
		);
	}
}