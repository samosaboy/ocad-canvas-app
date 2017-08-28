import { combineReducers } from 'redux'
import courseReducer from './courseReducer'
import itemLoadReducer from './itemLoadReducer'
import messageReducer from './messageReducer'

const rootReducer = combineReducers({
  courseReducer,
  messageReducer,
  itemLoadReducer
})

export default rootReducer
