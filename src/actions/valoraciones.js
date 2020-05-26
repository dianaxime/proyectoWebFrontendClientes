import * as types from '../types/valoraciones';

export const startFetchingComentarios = () => ({
  type: types.COMENTARIOS_FETCH_STARTED,
});
export const completeFetchingComentarios = (entities, order) => ({
  type: types.COMENTARIOS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingComentarios = error => ({
  type: types.COMENTARIOS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startFetchingPuntuacion = () => ({
    type: types.PUNTUACION_FETCH_STARTED,
});
export const completeFetchingPuntuacion = puntuacion => ({
    type: types.PUNTUACION_FETCH_COMPLETED,
    payload: {
      puntuacion,
    },
});
export const failFetchingPuntuacion = error => ({
    type: types.PUNTUACION_FETCH_FAILED,
    payload: {
      error,
    },
});
  
export const startAddingValoracion = (comentarioValoracion, fechaValoracion, puntuacionValoracion, idEmpleado, idCliente) => ({
  type: types.VALORACION_ADD_STARTED,
  payload: {
    comentarioValoracion,
    fechaValoracion,
    puntuacionValoracion,
    idCliente,
    idEmpleado,
  },
});
export const completeAddingValoracion = (oldId, valoracion) => ({
  type: types.VALORACION_ADD_COMPLETED,
  payload: {
    oldId,
    valoracion,
  },
});
export const failAddingValoracion = (oldId, error) => ({
  type: types.VALORACION_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});
