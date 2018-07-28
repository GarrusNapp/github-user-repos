export const FETCH_REPOS = "FETCH_REPOS";
export const RECEIVE_REPOS = "RECEIVE_REPOS";
export const FETCH_USER = "FETCH_USER";
export const RECEIVE_USER = "RECEIVE_USER";

export const fetchUser = username => dispatch => {
  dispatch({ type: FETCH_USER });
  fetch(`https://api.github.com/users/${username}`)
    .then(r => r.json())
    .then(data => {
      let payload;

      if (!data.message) {
        let { login, avatar_url, name, location, bio } = data;
        payload = { login, avatar_url, name, location, bio };
      } else {
        payload = { error: data.message };
      }

      dispatch({ type: RECEIVE_USER, payload });
    });
};

export const fetchRepos = username => dispatch => {
  ///check
  dispatch({ type: FETCH_REPOS });
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(r => r.json())
    .then(data => {
      let payload;
      if (data.length > 0) {
        payload = data.map(el => {
          let { name, description, fork, language } = el;
          return { name, description, fork, language };
        });
      } else {
        payload = { error: "No repositories available" };
      }
      dispatch({ type: RECEIVE_REPOS, payload });
    });
};
