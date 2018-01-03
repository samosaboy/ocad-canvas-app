import * as types from './constants'

const initialState = {
  userId: null,
  stateType: 'active',
  unreadCounter: null,
  courseList: [],
  courseListComplete: []
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
        courseListComplete: action.courseListComplete,
        stateType: action.stateType
      }
    case types.RETRIEVE_UNREAD_COUNT:
      return {
        ...state,
        unreadCounter: action.unreadCounter,
        badge: action.badge
      }
    default:
      return state
  }
}
