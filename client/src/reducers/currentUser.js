import { LOGIN_SUCCESS, USER_LOGOUT } from '../actions/login'
import { localStorageJwtKey } from "../constants";

let initialState = null;
try {
  const jwt = localStorage.getItem(localStorageJwtKey);
  if (jwt) {
    initialState = { jwt };
  }
} catch (e) {
  console.log(`Error retrieving data from local storage`, e);
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case LOGIN_SUCCESS:
    return payload

  case USER_LOGOUT:
    return null

  default:
    return state
  }
}