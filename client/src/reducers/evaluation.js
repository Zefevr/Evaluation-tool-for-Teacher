import {FETCH_EVALUATION} from '../actions/evaluations'

export default (state = [], action ) => {
  switch (action.type) {
        
  case FETCH_EVALUATION:
    return action.payload

  default:
    return state
  }
}