import * as request from "superagent";
import {baseUrl} from '../constants'
import {logout} from './login'
import {isExpired} from '../jwt'

export const FETCHED_ALL_BATCHES = 'FETCHED_ALL_BATCHES'
export const FETCH_BATCH = 'FETCH_BATCH'

export const ADD_BATCH_SUCCESS = 'ADD_BATCH_SUCCESS'
export const ADD_BATCH_FAILED = 'ADD_BATCH_FAILED'

export const fetchAllBatches = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/batches`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result =>
      dispatch({
        type: FETCHED_ALL_BATCHES,
        payload: result.body
      })
    )
    .catch(err => alert(err));
};

export const fetchBatch = (id) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/batches/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch({
      type: FETCH_BATCH,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const createBatch = (batchId, startDate, endDate) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/batches`)
    .send({ batchId, startDate, endDate })
    .then(result => {
      dispatch({
        type: ADD_BATCH_SUCCESS
      })
    })
    .catch(err => {
      if (err.status === 400) {
        dispatch({
          type: ADD_BATCH_FAILED,
          payload: err.response.body.message || 'Unknown error'
        })
      }
      else {
        console.error(err)
      }
    })
}