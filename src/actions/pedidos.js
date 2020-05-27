import * as types from '../types/pedidos';


export const startFetchingPedidos = () => ({
  type: types.PEDIDOS_FETCH_STARTED,
});
export const completeFetchingPedidos = (id, pedidos) => ({
  type: types.PEDIDOS_FETCH_COMPLETED,
  payload: {
    id,
    pedidos,
  },
});
export const failFetchingPedidos = error => ({
  type: types.PEDIDOS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingPedido = (fechaPedido, estadoPedido, pagoPedido, entregaPedido, recogerPedido, idFactura, idEmpleado, idCliente) => ({
  type: types.PEDIDO_ADD_STARTED,
  payload: {
    fechaPedido,
    pagoPedido,
    estadoPedido,
    entregaPedido, 
    recogerPedido, 
    idFactura,
    idEmpleado,
    idCliente,
  },
});
export const completeAddingPedido = (oldId, pedido) => ({
  type: types.PEDIDO_ADD_COMPLETED,
  payload: {
    oldId,
    pedido,
  },
});
export const failAddingPedido = (oldId, error) => ({
  type: types.PEDIDO_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

