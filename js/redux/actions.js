export const FETCH_REPOS = "FETCH_REPOS";
export const RECEIVE_REPOS = "RECEIVE_REPOS";
export const RECEIVE_REPOS_ERROR = "RECEIVE_REPOS_ERROR";
export const FETCH_USER = "FETCH_USER";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERROR = "RECEIVE_USER_ERROR";

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
