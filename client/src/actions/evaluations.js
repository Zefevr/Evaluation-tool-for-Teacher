import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './login'
import {isExpired} from '../jwt'

export const FETCH_EVALUATION = "FETCH_EVALUATION"
export const ADD_EVALUATION = "ADD_EVALUATION"

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

export const createEvaluation = (student, batch, colour, remarks ) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  const studentId = (window.location.href).split('/').pop()
  const batchId = ((window.location.href).split('/')[4])
  console.log((window.location.href).split('/')[4])
  
  if (isExpired(jwt)) return dispatch(logout())
  
  request
    .post(`${baseUrl}/batches/${batchId}/students/${studentId}/evaluations`)
    .send({ student: studentId, batch: batchId, colour, remarks,  })
    .then(result => {
      dispatch({
        type: ADD_EVALUATION,
        payload: result.body
      })
    })
    .catch(err => {console.error(err)})
}