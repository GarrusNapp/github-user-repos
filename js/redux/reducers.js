// import {
//   FETCH_REPOS,
//   RECEIVE_REPOS,
//   FETCH_USER,
//   RECEIVE_USER
// } from "./actions";

const FETCH_REPOS = "FETCH_REPOS";
const RECEIVE_REPOS = "RECEIVE_REPOS";
const FETCH_USER = "FETCH_USER";
const RECEIVE_USER = "RECEIVE_USER";

const initialState = {
  users: ["asb", "Asd"]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { users: [...state.users] };
    case RECEIVE_USER:
      return { users: [...state.users, action.payload] };
    default:
      return state;
  }
};

export default reducer;
