const repositories = [
  "backend",
  "frontend",
];

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      let contributors = {};

      for (let repository of repositories) {
        let url = "https://api.github.com/repos/ManipalUtsav/" + repository + "/contributors";
        const options = {
          headers: {
            "Accept": "application/json",
          },
        };

        let response = await fetch(url, options);
        let repositoryContributors = await response.json();

        for (let contributor of repositoryContributors) {
          if (contributors.hasOwnProperty(contributor.id)) contributors[contributor.id].contributions += contributor.contributions;
          else contributors[contributor.id] = {
            avatar: contributor.html_url + ".png",
            contributions: contributor.contributions,
            login: contributor.login,
            type: contributor.type,
            url: contributor.html_url,
          };
        }
      }

      resolve(contributors);
    } catch (e) {
      reject(e);
    }
  });
};
