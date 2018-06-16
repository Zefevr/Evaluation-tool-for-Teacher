import {FETCHED_ALL_STUDENTS, ADD_STUDENT} from '../actions/students'

export default function(state = [], action ) {
  switch (action.type) {
  case FETCHED_ALL_STUDENTS:
    return action.payload
        
  case ADD_STUDENT:
    return [...state, action.payload.entity]
        
  default: 
    return state
  } 
}
