import request from "../utils/request";

const create = async (event) => {
  let response = await request("/events", "POST", event);

  if (response && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const createRound = async (eventID, round) => {
  let response = await request("/events/" + eventID + "/rounds", "POST", round);

  if (response && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const createScores = async (eventID, roundID, scores) => {
  let response = await request("/events/" + eventID + "/rounds/" + roundID + "/scores", "POST", scores);

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

const createSlots = async (eventID, roundID) => {
  let response = await request("/events/" + eventID + "/rounds/" + roundID + "/slots", "POST");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

const createTeam = async (eventID, team) => {
  let response = await request("/events/" + eventID + "/teams", "POST", team);

  if (response && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const get = async (eventID) => {
  let response = await request("/events/" + eventID);

  if (response && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const getAll = async () => {
  let response = await request("/events");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

const getRound = async (eventID, roundID) => {
  let response = await request("/events/" + eventID + "/rounds" + roundID);

  if (response && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const getRounds = async (eventID) => {
  let response = await request("/events/" + eventID + "/rounds");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

const getSlots = async (eventID, roundID) => {
  let response = await request("/events/" + eventID + "/rounds" + roundID + "/slots");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

const getTeams = async (eventID) => {
  let response = await request("/events/" + eventID + "/teams");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

const getTeamsByRound = async (eventID, roundID) => {
  let response = await request("/events/" + eventID + "/rounds" + roundID + "/teams");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

export default {
  create,
  createRound,
  createScores,
  createSlots,
  createTeam,
  get,
  getAll,
  getRound,
  getRounds,
  getSlots,
  getTeams,
  getTeamsByRound,
};
