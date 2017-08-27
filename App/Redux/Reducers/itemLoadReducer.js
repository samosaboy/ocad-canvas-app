import * as types from './constants'

const initialState = {
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.IS_LOADING:
      return {
        ...action
      }
    default:
      return state
  }
}
