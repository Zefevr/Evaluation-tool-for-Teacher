import {FETCH_BATCH} from '../actions/batches'

export default function (state = null, action) {
  switch (action.type) {
  case FETCH_BATCH:
    return action.payload

  default:
    return state
  }
}