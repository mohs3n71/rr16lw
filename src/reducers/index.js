import {combineReducers} from 'redux-immutable'

import auth from './auth'

import {LOGOUT_SUCCESS, LOGOUT_ERROR} from '../actions/auth'

const appReducer = combineReducers({
  auth: combineReducers(auth)
})

export default (state, action) => {
  if (action.type === LOGOUT_SUCCESS || action.type === LOGOUT_ERROR) {
    state = undefined
  }
  return appReducer(state, action)
}
