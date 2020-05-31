import * as types from '../types/listas';

export const startFetchingListas = () => ({
  type: types.LISTAS_FETCH_STARTED,
});
export const completeFetchingListas = (order, entities) => ({
  type: types.LISTAS_FETCH_COMPLETED,
  payload: {
    order,
    entities,
  },
});
export const failFetchingListas = error => ({
  type: types.LISTAS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingLista = (id, fechaLista, cantidadLista, turnoLista, idProducto, idEncargado) => ({
  type: types.LISTA_ADD_STARTED,
  payload: {
    id,
    fechaLista,
    cantidadLista,
    turnoLista,
    idProducto,
    idEncargado,
  },
});
export const completeAddingLista = (oldId, lista) => ({
  type: types.LISTA_ADD_COMPLETED,
  payload: {
    oldId,
    lista,
  },
});
export const failAddingLista = error => ({
  type: types.LISTA_ADD_FAILED,
  payload: {
    error,
  },
});

