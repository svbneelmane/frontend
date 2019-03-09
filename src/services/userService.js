import constants from '../utils/constants';
import { navigate } from 'gatsby';

export const login = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };
  let response = await fetch(`${constants.server}/users/login`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200){
    localStorage.setItem('user', JSON.stringify(json.data));
    console.log("JSON",json.data);
    navigate("/events");
    return json.data;
  }
  else{
    return null;
  }
}

export const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

/*const handleResponse = (response) => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}*/
