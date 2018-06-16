import { DELETE_STUDENT} from '../actions/students'

export default function(state = [], action ) {
  switch (action.type) {
  case  DELETE_STUDENT:
    return true
        
  default: 
    return state
  } 
}