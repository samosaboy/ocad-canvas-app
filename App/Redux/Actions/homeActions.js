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

export function retrieveCourses () {
  return function (dispatch) {
    return this.api.getCourses()
      .then(res => {
        dispatch(retrieveCoursesSuccess(res))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
