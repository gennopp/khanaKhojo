import getUser from '../fetchData/fetchUser.js';

export const GET_INIT = "user/GET_INIT";
export const GET_DONE = "user/GET_DONE";
export const SET_SELECTED = "user/SET_SELECTED";

export function loaduser() {
  return async dispatch => {
    dispatch({ type: GET_INIT });;
    getUser()
      .then(result => {
        dispatch({ type: GET_DONE, payload: result });
      })
      .catch(err => {
        console.error(err);
      });
  };
}

const initialState = { userData: [], isLoading: false}

export default function user(
  state = initialState,
  action
) {
  switch (action.type) {
    case GET_INIT:
      return { ...state, isLoading: true };
    case GET_DONE:
      console.log("I came to the reducer");
      return { ...state, userData: action.payload, isLoading: false };
    default:
      return state;
  }
}
