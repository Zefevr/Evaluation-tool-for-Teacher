import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './login'
import {isExpired} from '../jwt'


export const FETCH_EVALUATION = "FETCH_EVALUATION"
export const FETCH_STUDENT = 'FETCH_STUDENT'

export const ADD_STUDENT_SUCCESS = "ADD_STUDENT_SUCCESS"
export const ADD_STUDENT_FAILED = "ADD_STUDENT_FAILED"

export const DELETE_STUDENT_SUCCESS = "DELETE_STUDENT_SUCCESS"
export const DELETE_STUDENT_FAILED = "DELETE_STUDENT_FAILED"

export const fetchStudent = (id) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
     
  const batchId = ((window.location.href).split('/')[4])
  console.log((window.location.href).split('/'))
  
  if (isExpired(jwt)) return dispatch(logout())
  
  request
    .get(`${baseUrl}/batches/${batchId}/students/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => 
      dispatch({
        type: FETCH_STUDENT,
        payload: result.body.studentById,
      },
      {
        type: FETCH_EVALUATION,
        payload: result.body.studentById.evaluation
      })
    )
    .catch(err => console.error(err))
}

export const createStudent = (firstName, lastName, profilePicture, lastEvaluation, batch ) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  const batchId = ((window.location.href).split('/')[4])
  console.log((window.location.href).split('/')[4])
  
  if (isExpired(jwt)) return dispatch(logout())
  
  request
    .post(`${baseUrl}/batches/${batchId}/students`)
    .send({ firstName, lastName, profilePicture, lastEvaluation, batch: batchId })
    .then(result => {
      dispatch({
        type: ADD_STUDENT_SUCCESS
      })
    })
    .catch(err => {
      if (err.status === 400) {
        dispatch({
          type: ADD_STUDENT_FAILED,
          payload: err.response.body.message || 'Unknown error'
        })
      }
      else {
        console.error(err)
      }
    })
}

export const deleteStudent = (studentId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  const batchId = ((window.location.href).split('/')[4])
  console.log((window.location.href).split('/')[4])
  
  if (isExpired(jwt)) return dispatch(logout())
  
  request
    .delete(`${baseUrl}/batches/${batchId}/students/${studentId}`)
    .then(result => {
      dispatch({
        type: DELETE_STUDENT_SUCCESS
      })
    })
    .catch(err => {
      if (err.status === 400) {
        dispatch({
          type: DELETE_STUDENT_FAILED,
          payload: err.response.body.message || 'Unknown error'
        })
      }
      else {
        console.error(err)
      }
    })
}