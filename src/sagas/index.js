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

import {
  watchProductosFetch,
  watchAddProducto,
} from './productos';

import {
  watchFetchCompras,
  watchAddCompra,
  watchEndCompras,
  watchExpireCompra,
  watchPutCompras,
} from './compras';

import {
  watchFetchTiendas,
  watchAddTienda,
  watchUpdateTienda,
} from './tiendas';

import {
  watchFetchListas,
  watchAddLista,
} from './listas';

import {
  watchAddOferta,
} from './ofertas';

import {
  watchAddRegistro,
} from './registros';

import {
  watchAddFactura,
} from './facturas';

import {
  watchAddPedido,
} from './pedidos';


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
    fork(watchProductosFetch),
    fork(watchAddProducto),
    fork(watchFetchCompras),
    fork(watchAddCompra),
    fork(watchExpireCompra),
    fork(watchEndCompras),
    fork(watchFetchTiendas),
    fork(watchAddTienda),
    fork(watchUpdateTienda),
    fork(watchFetchListas),
    fork(watchAddLista),
    fork(watchAddOferta),
    fork(watchPutCompras),
    fork(watchAddRegistro),
    fork(watchAddFactura),
    fork(watchAddPedido),
  ]);
}

export default mainSaga;
