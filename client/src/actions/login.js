import * as request from 'superagent'
import {baseUrl} from '../constants'



export const LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_LOGOUT = 'USER_LOGOUT'


export const logout = () => ({
  type: USER_LOGOUT
})

export const login = (email, password) => (dispatch) =>
  request
    .post(`${baseUrl}/logins`)
    .send({email, password})
    .then(result => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: result.body
      })
    })
    .catch(err => {
    	if (err.status === 400) {
    		dispatch({
    			type: LOGIN_FAILED,
    			payload: err.response.body.message || 'Unknown error'
    		})
    	}
    	else {
    		console.error(err)
    	}
    })
