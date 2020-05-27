import * as types from '../types/facturas';


export const startFetchingFacturas = () => ({
  type: types.FACTURAS_FETCH_STARTED,
});
export const completeFetchingFacturas = (id, facturas) => ({
  type: types.FACTURAS_FETCH_COMPLETED,
  payload: {
    id,
    facturas,
  },
});
export const failFetchingFacturas = error => ({
  type: types.FACTURAS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingFactura = (fechaFactura, subtotalFactura, ivaFactura, totalFactura, idTienda, idCliente) => ({
  type: types.FACTURA_ADD_STARTED,
  payload: {
    fechaFactura,
    subtotalFactura,
    ivaFactura,
    totalFactura,
    idTienda,
    idCliente,
  },
});
export const completeAddingFactura = (oldId, factura) => ({
  type: types.FACTURA_ADD_COMPLETED,
  payload: {
    oldId,
    factura,
  },
});
export const failAddingFactura = (oldId, error) => ({
  type: types.FACTURA_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

