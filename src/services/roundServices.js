import { sendRounds } from "../actions/roundAction";
import constants from "../utils/constants";

export const getRounds = async (eventId) => {
  const requestOptions = {
    method: 'GET',
  };

  let response = await fetch(`${constants.server}/events/${eventId}/rounds`, requestOptions)
  let json = await response.json();
  sendRounds(json.data);
}