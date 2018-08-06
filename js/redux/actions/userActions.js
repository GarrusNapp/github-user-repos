import { FETCH_USER, RECEIVE_USER, RECEIVE_USER_ERROR } from "./types";
import { fetchRepos } from "./repoActions";

export const fetchUser = username => dispatch => {
  //console.log("fetching user");
  dispatch({ type: FETCH_USER, username });
  fetch(`https://api.github.com/users/${username}`)
    .then(r => {
      if (!r.ok) {
        throw new Error(r.statusText);
      }
      return r.json();
    })
    .then(data => {
      let payload;
      if (!data.message) {
        let { login, avatar_url, name, location, bio } = data;
        payload = { login, avatar_url, name, location, bio };
        dispatch({ type: RECEIVE_USER, payload });
      } else {
        throw new Error(data.message);
      }
    })
    .then(() => {
      dispatch(fetchRepos(username));
    })
    .catch(error =>
      dispatch({
        type: RECEIVE_USER_ERROR,
        username,
        payload: { error: error.toString() }
      })
    );
};
