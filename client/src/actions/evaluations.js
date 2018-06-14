import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './login'
import {isExpired} from '../jwt'

export const FETCH_EVALUATION = "FETCH_EVALUATION"
export const ADD_EVALUATION = "ADD_EVALUATION"
//export const ADD_LAST_EVALUATION = 'ADD_LAST_EVALUATION'

export const fetchEvaluation = (id) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/students/${id}/evaluations`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => 
      dispatch({
        type: FETCH_EVALUATION,
        payload: result.body
      })
    )
    .catch(err => console.error(err))
}

export const addEvaluation = (evaluation) => (dispatch) => {
  request
    .post(`${baseUrl}/evaluations`)
    .send(evaluation)
    .then(response => dispatch({
      type: ADD_EVALUATION,
      payload: response.body
    }))
}