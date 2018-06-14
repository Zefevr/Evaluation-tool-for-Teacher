import {ADD_STUDENT_SUCCESS, ADD_STUDENT_FAILED} from '../actions/students'

export default (state = {}, action ) => {
  switch (action.type) {

  case ADD_STUDENT_SUCCESS:
    return {
      success: true
    }
    
  case ADD_STUDENT_FAILED:
    return {
      error: action.payload
    }

  default:
    return state
  }
}