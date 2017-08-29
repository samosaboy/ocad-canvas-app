import * as types from './constants'

const initialState = {
  userId: null,
  stateType: 'active',
  courseList: []
}

// All kinds of ajax requests and logic/conditions to update state of store can be defined in this file.
export default function (state = initialState, action) {
  switch (action.type) {
    case types.RETRIEVE_ACTIVE_COURSE_LIST:
      return {
        ...action,
        stateType: action.stateType
      }
    case types.RETRIEVE_COMPLETED_COURSE_LIST:
      return {
        ...state,
        courseList: action.courseList,
        stateType: action.stateType
      }
    default:
      return state
  }
}
