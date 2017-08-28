import * as types from './constants'

const initialState = {
  courseId: null,
  courseName: '',
  selectedUserId: null,
  selectedUserName: '',
  possibleUsers: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_MESSAGE_SELECT_COURSE:
      return {
        courseId: action.courseId,
        courseName: action.courseName
      }
    case types.CREATE_MESSAGE_SELECT_USER:
      return {
        ...state,
        ...action,
        selectedUserId: action.selectedUserId,
        selectedUserName: action.selectedUserName
      }
    case types.CREATE_MESSAGE_POPULATE_USER:
      return {
        ...state,
        ...action,
        possibleUsers: action.possibleUsers.data
      }
    case types.CREATE_MESSAGE_SENT:
      return {
        state: null
      }
    default:
      return state
  }
}
