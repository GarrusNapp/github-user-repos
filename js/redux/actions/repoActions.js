import { FETCH_REPOS, RECEIVE_REPOS, RECEIVE_REPOS_ERROR } from "./types";

export const fetchRepos = username => dispatch => {
  //console.log("fetching repos");
  dispatch({ type: FETCH_REPOS, username });
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(r => r.json())
    .then(data => {
      let payload;
      if (data.length > 0) {
        payload = data.map(el => {
          let { name, description, fork, language, html_url, id } = el;
          return { name, description, fork, language, html_url, id };
        });
      } else {
        payload = [{ error: "No repositories available" }];
        dispatch({ type: RECEIVE_REPOS_ERROR, username, payload });
      }
      dispatch({ type: RECEIVE_REPOS, username, payload });
    });
};
