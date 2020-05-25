import { fork, all } from 'redux-saga/effects';

import {
  watchLoginStarted,
  watchRefreshTokenStarted,
  watchRegisterStarted,
} from './auth';

import { watchFetchUsuarioStarted } from './usuarios';

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchRefreshTokenStarted),
    fork(watchRegisterStarted),
    fork(watchFetchUsuarioStarted),
  ]);
}


export default mainSaga;