import { LOGIN_SUCCESS, USER_LOGOUT } from "./actions/login";
import { localStorageJwtKey } from "./constants";

export const storeJwt = store => next => action => {
  try {
    if (action.type === LOGIN_SUCCESS) {
      localStorage.setItem(localStorageJwtKey, action.payload.jwt);
    }
    if (action.type === USER_LOGOUT) {
      localStorage.removeItem(localStorageJwtKey);
    }
  } catch (e) {
    console.log(`Interaction with LocalStorage went wrong`, e);
  }

  next(action);
};

