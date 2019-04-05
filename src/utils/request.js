import constants from "../utils/constants";

const isBrowser = () => typeof window !== "undefined";

const getToken = () => {
  let me = isBrowser() && window.sessionStorage.getItem("me");

  if (!me) return null;
  me = JSON.parse(me);

  if ("token" in me) return me.token;
  return null;
};

const request = (path, method = "GET", body = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let url = path ? constants.server + path : constants.server;
      const options = {
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        method: method,
      };

      let token = getToken();
      if (token) options.headers["Authorization"] = token;

      if (![ "GET", "HEAD" ].includes(method))
        options.body = typeof body === "object" ? JSON.stringify(body) : body;
    
      let response = typeof window !== "undefined" && await window.fetch(url, options);
      if(response)
        resolve(await response.json());
      else
        resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default request;
