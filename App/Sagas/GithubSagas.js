import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import GithubActions from '../Redux/GithubRedux'

export function * getUserAvatar (api) {
  // make the call to the api
  const response = yield call(api.getCourses)

  if (response.ok) {
    const firstUser = path(['data', 'items'], response)[0]
    const avatar = firstUser.avatar_url
    // do data conversion here if needed
    yield put(GithubActions.userSuccess(avatar))
  } else {
    yield put(GithubActions.userFailure())
  }
}
