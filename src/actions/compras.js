import * as types from '../types/compras';


export const startFetchingCompras = () => ({
  type: types.COMPRAS_FETCH_STARTED,
});
export const completeFetchingCompras = (id, compras) => ({
  type: types.COMPRAS_FETCH_COMPLETED,
  payload: {
    id,
    compras,
  },
});
export const failFetchingCompras = error => ({
  type: types.COMPRAS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingCompra = (cantidadCompra, fechaCompra, estadoCompra, subtotalCompra, descuentoCompra, idProducto, idCliente) => ({
  type: types.COMPRA_ADD_STARTED,
  payload: {
    cantidadCompra,
    fechaCompra,
    estadoCompra,
    subtotalCompra,
    descuentoCompra,
    idProducto,
    idCliente,
  },
});
export const completeAddingCompra = (oldId, compra) => ({
  type: types.COMPRA_ADD_COMPLETED,
  payload: {
    oldId,
    compra,
  },
});
export const failAddingCompra = (oldId, error) => ({
  type: types.COMPRA_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

