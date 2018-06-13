import * as request from 'superagent'
import { BASE_URL } from '../constants'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'

export const login = (email, password) => dispatch => {
  request
    .post(`${BASE_URL}/logins`)
    .send({ email, password })
    .then(response => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.body
      })
    })
    .catch(error => {
      if (error.status === 400) {
        dispatch({
          type: LOGIN_FAILED,
          payload: error.response.body.message || 'Unknown error'
        })
      } else {
        console.log(error)
      }
    })
}