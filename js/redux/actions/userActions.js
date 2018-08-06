import { FETCH_USER, RECEIVE_USER, RECEIVE_USER_ERROR } from "./types";
import { fetchRepos } from "./repoActions";

export const fetchUser = username => dispatch => {
  //console.log("fetching user");
  dispatch({ type: FETCH_USER, username });
  fetch(`https://api.github.com/users/${username}`)
    .then(r => r.json())
    .then(data => {
      let payload;
      if (!data.message) {
        let { login, avatar_url, name, location, bio } = data;
        payload = { login, avatar_url, name, location, bio };
        dispatch({ type: RECEIVE_USER, payload });
      } else {
        payload = { error: data.message };
        dispatch({ type: RECEIVE_USER_ERROR, username, payload });
      }
    })
    .then(() => {
      dispatch(fetchRepos(username));
    });
};
