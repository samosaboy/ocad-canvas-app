import { combineReducers } from 'redux'
import courseReducer from './courseReducer'
import itemLoadReducer from './itemLoadReducer'

const rootReducer = combineReducers({
  courseReducer,
  itemLoadReducer
})

export default rootReducer
