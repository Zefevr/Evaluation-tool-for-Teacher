import {DELETE_STUDENT_SUCCESS, DELETE_STUDENT_FAILED} from '../actions/students'


export default (state = {}, action ) => {
  switch (action.type) {

  case DELETE_STUDENT_SUCCESS:
    return {
      success: true
    }

  case DELETE_STUDENT_FAILED:
    return {
      error: action.payload
    }

  default:
    return state
  }
}