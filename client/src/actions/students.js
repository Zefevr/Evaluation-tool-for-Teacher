import * as request from "superagent";
import {baseUrl} from '../constants'
import {logout} from './login'
import {isExpired} from '../jwt'

export const FETCHED_ALL_STUDENTS = 'FETCHED_ALL_STUDENTS'
export const FETCH_STUDENT = 'FETCH_STUDENT'

export const ADD_STUDENT = 'ADD_STUDENT'

export const DELETE_STUDENT = 'DELETE_STUDENT'

export const UPDATE_STUDENT = 'UPDATE_STUDENT'

export const ADD_EVALUATION = 'ADD_EVALUATION'


export const fetchAllStudents = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())
  
  request
    .get(`${baseUrl}/students`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result =>
      dispatch({
        type: FETCHED_ALL_STUDENTS,
        payload: result.body.entity
      })
    )
    .catch(err => alert(err));
};

export const fetchStudent = (id) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())
  
  request
    .get(`${baseUrl}/students/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch({
      type: FETCH_STUDENT,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const createStudent = (student) => (dispatch) => {
  request
    .post(`${baseUrl}/students`)
    .send(student)
    .then(response => dispatch({
      type: ADD_STUDENT,
      payload: response.body
    }))
}

export const deleteStudent = (studentId) => (dispatch, getState) => {
  const state = getState()

  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  request
    .delete(`${baseUrl}/students/${studentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: DELETE_STUDENT,
        payload: response.body.batch
      })
    );
};

export const updateStudent = (id, updates) => (dispatch) => {
    
  request
    .put(`${baseUrl}/students/${id}`)
    .send(updates)
    .then(response => dispatch({
      type: UPDATE_STUDENT,
      payload: response.body
    }))
}

export const addLastColor = (evaluations) => (dispatch, getstate) => {
  const state = getstate()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  request
    .put(`${baseUrl}/students/${evaluations.studentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(evaluations)
    .then(response => dispatch({
      type: ADD_EVALUATION,
      payload: response.body
    }))
}