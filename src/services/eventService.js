import constants from '../utils/constants';
const getEvents = () => {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${constants.server}/events`, requestOptions)
    .then((response) => response.json())
    .then(events => {
        return events;
    });
}