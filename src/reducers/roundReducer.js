import {createStore} from 'redux';
import { getRounds } from '../services/roundServices';

const reducer = (state={},action)=>{
	switch(action.type){
		case 'FETCH_ROUNDS' : 
				getRounds(action.eventId);
			return action;
		case 'ROUNDS_FETCHED' : 
		return action
	}
	return state;
}

export default createStore(reducer);