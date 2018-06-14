import { LOGIN_SUCCESS, USER_LOGOUT } from '../actions/login'

export default (state = null, { type, payload }) => {
  switch (type) {
  case LOGIN_SUCCESS:
    return payload

  case USER_LOGOUT:
    return null

  default:
    return state
  }
}