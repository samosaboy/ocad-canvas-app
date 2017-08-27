/* eslint-disable global-require */
/* eslint-disable no-undef */

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../Reducers/rootReducer'
import { createLogger } from 'redux-logger'

let middleware = [thunk]

if (__DEV__) {
  const logger = createLogger({ collapsed: true })
  middleware = [...middleware, logger]
}

middleware = [...middleware]

export default function configureStore (initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )
}
