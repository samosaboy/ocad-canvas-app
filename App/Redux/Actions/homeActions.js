import API from '../../Services/Api'
import * as types from '../Reducers/constants'
this.api = API.create()

export function isLoading (bool) {
  return {
    type: types.IS_LOADING,
    isLoading: bool
  }
}

export function createMessageSelectCourse (id: number, name: string) {
  return (dispatch) => {
    dispatch({
      type: types.CREATE_MESSAGE_SELECT_COURSE,
      courseId: id,
      courseName: name
    })
  }
}

export function createMessagePopulateUsers (id: number) {
  return (dispatch) => {
    return this.api.getPossibleRecipients(`course_${id}`)
      .then((response) => {
        dispatch({
          type: types.CREATE_MESSAGE_POPULATE_USER,
          possibleUsers: response
        })
        dispatch({
          type: types.CREATE_MESSAGE_POPULATE_USER_AWAIT,
          possibleUsersLoaded: true
        })
      })
  }
}

export function createMessageSelectUser (id: number, name: string) {
  return (dispatch) => {
    dispatch({
      type: types.CREATE_MESSAGE_SELECT_USER,
      selectedUserId: id,
      selectedUserName: name
    })
  }
}

export function createMessageSent () {
  return (dispatch) => {
    dispatch({
      type: types.CREATE_MESSAGE_SENT
    })
  }
}

export function retrieveCourses (state?: string) {
  return (dispatch) => {
    if (state === 'active') {
      dispatch(isLoading(true))
      this.api.getCourses('active')
        .then(response => {
          dispatch({
            type: types.RETRIEVE_ACTIVE_COURSE_LIST,
            userId: response.data[0].enrollments[0].user_id, // for now...
            stateType: 'active',
            courseList: response.data
          })
          dispatch(isLoading(false))
        })
        .catch(() => {
          dispatch(isLoading(true))
        })
    }
    if (state === 'completed') {
      dispatch(isLoading(true))
      this.api.getCourses('completed')
        .then(response => {
          dispatch({
            type: types.RETRIEVE_COMPLETED_COURSE_LIST,
            stateType: 'completed',
            courseList: response.data
          })
          dispatch(isLoading(false))
        })
        .catch(() => {
          dispatch(isLoading(true))
        })
    }
  }
}
