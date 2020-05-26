import * as types from '../types/tiendas';


export const startFetchingTienda = () => ({
  type: types.TIENDA_FETCH_STARTED,
});
export const completeFetchingTienda = (id, tienda) => ({
  type: types.TIENDA_FETCH_COMPLETED,
  payload: {
    id,
    tienda,
  },
});
export const failFetchingTienda = error => ({
  type: types.TIENDA_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingEmpleado = (nombreTienda, ubicacionTienda, telefonoTienda, faxTienda) => ({
  type: types.TIENDA_ADD_STARTED,
  payload: {
    nombreTienda,
    ubicacionTienda,
    telefonoTienda,
    faxTienda,
  },
});
export const completeAddingEmpleado = (oldId, tienda) => ({
  type: types.TIENDA_ADD_COMPLETED,
  payload: {
    oldId,
    tienda,
  },
});
export const failAddingEmpleado = (oldId, error) => ({
  type: types.TIENDA_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startUpdatingEmpleado = (id, ubicacionTienda, telefonoTienda, faxTienda) => ({
  type: types.TIENDA_UPDATE_STARTED,
  payload: {
    id,
    ubicacionTienda,
    telefonoTienda,
    faxTienda,
  },
});
export const completeUpdatingEmpleado = (id, tienda) => ({
  type: types.TIENDA_UPDATE_COMPLETED,
  payload: {
    id,
    tienda,
  },
});
export const failUpdatingEmpleado = (id, error) => ({
  type: types.TIENDA_UPDATE_FAILED,
  payload: {
    id,
    error,
  },
});