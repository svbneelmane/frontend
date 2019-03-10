import React from 'react';
// import Layout from '../../layouts/app';
import { List } from '../../commons/List'
<<<<<<< HEAD
=======

>>>>>>> aa96eaddf9223b81f9d923a3001b0ad9844995d4
export default class LeaderBoard extends React.Component{

	render(){
		let data = [
		{
			teamName: "Team Name 1",
			points : "30",
			collegeName : "Manipal Instutuion of Technology"
		},
		{
			teamName: "Team Name 2",
			points : "28",
			collegeName : "Kasturba Medial College"
		}
	]
		return(
			<div>
				{data.map((each, i) => {
					return (
						<List key={i} position={i + 1} title={each.teamName} subTitle={each.collegeName} points={each.points}/>
					);
				})}
			</div>
		);
	}
}