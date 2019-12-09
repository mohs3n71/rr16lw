import {all, fork} from 'redux-saga/effects'
import map from 'lodash/map'

import auth from './auth'


export default function * sagas () {
  yield all(map([
    ...auth,
  ], (saga) => fork(saga)))
}
