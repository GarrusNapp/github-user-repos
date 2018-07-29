import {
  FETCH_REPOS,
  RECEIVE_REPOS,
  FETCH_USER,
  RECEIVE_USER,
  RECEIVE_USER_ERROR
} from "./actions";

const initialState = {
  users: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        users: Object.assign({}, state.users, {
          [action.username]: { fetching: true }
        })
      };
    case RECEIVE_USER:
      return {
        users: Object.assign({}, state.users, {
          [action.payload.login.toLowerCase()]: Object.assign({}, action.payload, {
            fetching: false
          })
        })
      };
      case RECEIVE_USER_ERROR:
      return {
        users: Object.assign({}, state.users, {
          [action.username]: { fetching: false, error: action.payload.error }
        })
      };
    default:
      return state;
  }
};

export default reducer;
