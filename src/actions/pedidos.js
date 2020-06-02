import * as types from '../types/pedidos';


export const startFetchingPedidos = () => ({
  type: types.PEDIDOS_FETCH_STARTED,
});
export const completeFetchingPedidos = (order, entities) => ({
  type: types.PEDIDOS_FETCH_COMPLETED,
  payload: {
    order,
    entities,
  },
});
export const failFetchingPedidos = error => ({
  type: types.PEDIDOS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingPedido = ( id, estadoPedido, pagoPedido, entregaPedido, recogerPedido, idFactura, idCliente, comprasById) => ({
  type: types.PEDIDO_ADD_STARTED,
  payload: {
    id, 
    pagoPedido,
    estadoPedido,
    entregaPedido, 
    recogerPedido, 
    idFactura,
    idCliente,
    comprasById,
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

