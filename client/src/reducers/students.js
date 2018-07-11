import {ADD_EVALUATION } from '../actions/students'

export default function(state = [], action ) {
  switch (action.type) {
 
  case ADD_EVALUATION:
    return state.map(student => {
      if (student.id === action.payload.id) {
        return action.payload
      }
      else return student
    })

  default: 
    return state
  } 
}