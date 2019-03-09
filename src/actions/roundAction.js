import reducer from '../reducers/roundReducer';

export const fetchRounds=(eventId)=>{
  reducer.dispatch({type:'FETCH_ROUNDS', eventId: eventId});
}

export const sendRounds=(data)=>{
  reducer.dispatch({type:'ROUNDS_FETCHED',data});
}
