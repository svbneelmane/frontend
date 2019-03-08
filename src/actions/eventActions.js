import { eventService } from '../services/eventService';

export const getEvents = () => dispatch => {

  const success = (user) => { return { type: 'LOGIN_SUCCESS', user } }
  const failure = (error) => { return { type: 'LOGIN_FAILURE', error } }

  eventService.getEvents()
    .then(
      events => {
        dispatch(success(events));
      },
      error => {
        dispatch(failure(error.toString()));
      }
    )
}
