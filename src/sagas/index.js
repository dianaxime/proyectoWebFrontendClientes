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
  watchFetchFacturas,
  watchFetchFacturasClientes,
} from './facturas';

import {
  watchAddPedido,
} from './pedidos';

import { watchFetchUsuarioStarted } from './usuarios';

function* mainSaga() {
  yield all([
    /* Auth */
    fork(watchLoginStarted),
    fork(watchRefreshTokenStarted),
    fork(watchRegisterStarted),
    fork(watchFetchUsuarioStarted),
    /* Clientes */
    fork(watchClienteFetch),
    fork(watchAddCliente),
    fork(watchUpdateCliente),
    /* Empleados */
    fork(watchEmpleadoFetch),
    fork(watchAddEmpleado),
    fork(watchUpdateEmpleado),
    /* Productos */
    fork(watchProductosFetch),
    fork(watchAddProducto),
    /* Compras */
    fork(watchFetchCompras),
    fork(watchAddCompra),
    fork(watchExpireCompra),
    fork(watchEndCompras),
    fork(watchPutCompras),
    /* Tiendas */
    fork(watchFetchTiendas),
    fork(watchAddTienda),
    fork(watchUpdateTienda),
    /* Listas */
    fork(watchFetchListas),
    fork(watchAddLista),
    /* Ofertas */
    fork(watchAddOferta),
    /* Registros */
    fork(watchAddRegistro),
    /* Facturas */
    fork(watchAddFactura),
    fork(watchFetchFacturas),
    fork(watchFetchFacturasClientes),
    /* Pedidos */
    fork(watchAddPedido),
  ]);
}

export default mainSaga;
