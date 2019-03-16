import request from "../utils/request";
import constants from "../utils/constants";
import { toast } from "../actions/toastActions";

const create = async (college) => {
  let response = await request("/colleges", "POST", college);

  if (response && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};


const get = async (collegeID) => {
  let response = await request("/colleges/" + collegeID);

  if (response && response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

const getAll = async () => {
  let response = await request("/colleges");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

const getCollege = async(college)=>{
  try{
  let response = await fetch(`${constants.server}/colleges/${college}`,{
    credentials:"include"
  });
  let json = await response.json();
  if(json.status===200)
    return json.data;
  else
    toast(json.message);
  }
  catch(err){
    toast(err.message);
  }

}

const getTeams = async (collegeID) => {
  let response = await request("/colleges/" + collegeID + "/teams");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};


const getParticipants = async (collegeID) => {
  let response = await request("/colleges/" + collegeID + "/participants");

  if (response && response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};
export default {
  create,
  get,
  getAll,
  getTeams,
  getParticipants,
  getCollege
};
