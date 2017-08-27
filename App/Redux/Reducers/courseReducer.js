// Types
import * as types from './constants'

const initialState = {
  userId: null,
  courseList: []
}

// All kinds of ajax requests and logic/conditions to update state of store can be defined in this file.
export default function (state = initialState, action) {
  switch (action.type) {
    case types.RETRIEVE_COURSE_LIST:
      return {
        ...action
      }
    default:
      return state
  }
}
