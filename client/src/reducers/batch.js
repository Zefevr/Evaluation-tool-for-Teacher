import {FETCH_BATCH} from '../actions/batches'
import {DELETE_STUDENT, ADD_STUDENT} from '../actions/students'


export default function (state = null, action) {
  switch (action.type) {
  case FETCH_BATCH:
    return action.payload

  case DELETE_STUDENT:
    return action.payload

  case ADD_STUDENT:
    return action.payload.batch

  default:
    return state
  }
}