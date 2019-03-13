import constants from "../utils/constants";

const request = (path, method = "GET", body = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      let url = path ? constants.server + path : constants.server;
      const options = {
        body: body,
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        method: method,
      };

      let response = await fetch(url, options);

      resolve(await response.json());
    } catch (e) {
      reject(e);
    }
  });
};

export default request;
