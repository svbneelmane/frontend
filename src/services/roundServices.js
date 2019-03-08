// import store from '../reducers/roundReducer';

// const getRounds = () => {
//   const requestOptions = {
//     method: 'GET',
//   };

//   return fetch("https://utsavb.bastionbot.org/events", requestOptions)
//     .then((response) => response.json())
//     .then(rounds => {
//         store.dispatch({type:'ROUNDS_RECIEVED',data:rounds});
//     });
// }