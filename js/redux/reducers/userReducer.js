import {
  FETCH_REPOS,
  RECEIVE_REPOS,
  RECEIVE_REPOS_ERROR,
  FETCH_USER,
  RECEIVE_USER,
  RECEIVE_USER_ERROR
} from "../actions/types";

const initialState = {
  users: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        users: {
          ...state.users,
          [action.username]: { fetching: true }
        }
      };
    case RECEIVE_USER:
      return {
        users: {
          ...state.users,
          [action.payload.login.toLowerCase()]: {
            ...action.payload,
            fetching: false
          }
        }
      };
    case RECEIVE_USER_ERROR:
      return {
        users: {
          ...state.users,
          [action.username]: { fetching: false, error: action.payload.error }
        }
      };
    case FETCH_REPOS:
      return {
        users: {
          ...state.users,
          [action.username]: {
            ...state.users[action.username],
            repos: []
          }
        }
      };
    case RECEIVE_REPOS:
    case RECEIVE_REPOS_ERROR:
      //console.log("editing repos")
      return {
        users: {
          ...state.users,
          [action.username]: {
            ...state.users[action.username],
            repos: action.payload
          }
        }
      };
    default:
      return state;
  }
};

export default userReducer;
