import { fork, all } from 'redux-saga/effects';

import {
  watchLoginStarted,
  watchRefreshTokenStarted,
  watchRegisterStarted,
} from './auth';

import {
  watchClienteFetch,
  watchAddCliente,
  watchUpdateCliente,
} from './clientes';

import {
  watchEmpleadoFetch,
  watchAddEmpleado,
  watchUpdateEmpleado,
} from './empleados';

import { watchFetchUsuarioStarted } from './usuarios';

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchRefreshTokenStarted),
    fork(watchRegisterStarted),
    fork(watchFetchUsuarioStarted),
    fork(watchClienteFetch),
    fork(watchAddCliente),
    fork(watchUpdateCliente),
    fork(watchEmpleadoFetch),
    fork(watchAddEmpleado),
    fork(watchUpdateEmpleado),
  ]);
}


export default mainSaga;