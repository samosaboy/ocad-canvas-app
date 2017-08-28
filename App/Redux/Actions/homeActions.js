import API from '../../Services/Api'
import * as types from '../Reducers/constants'
this.api = API.create()

// retrieve courses
export function retrieveCoursesSuccess (res: Object) {
  return {
    type: types.RETRIEVE_COURSE_LIST,
    userId: res.data[0].enrollments[0].user_id, // for now...
    courseList: res.data
  }
}

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

export function retrieveCourses () {
  return (dispatch) => {
    this.api.getCourses()
      .then(response => {
        dispatch(retrieveCoursesSuccess(response))
        dispatch(isLoading(false))
      })
      .catch(() => {
        dispatch(isLoading(true))
      })
  }
}
