import {FETCHED_ALL_BATCHES} from '../actions/batches'

export default function(state = [], action ) {
  switch (action.type) {
  
  case FETCHED_ALL_BATCHES:
    return action.payload
        
        
  default: 
    return state
  } 
}