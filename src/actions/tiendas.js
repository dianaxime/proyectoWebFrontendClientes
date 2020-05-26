import * as types from '../types/tiendas';


export const startFetchingTienda = () => ({
  type: types.TIENDAS_FETCH_STARTED,
});
export const completeFetchingTienda = (id, tienda) => ({
  type: types.TIENDAS_FETCH_COMPLETED,
  payload: {
    id,
    tienda,
  },
});
export const failFetchingTienda = error => ({
  type: types.TIENDAS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingTienda = (nombreTienda, ubicacionTienda, telefonoTienda, faxTienda) => ({
  type: types.TIENDA_ADD_STARTED,
  payload: {
    nombreTienda,
    ubicacionTienda,
    telefonoTienda,
    faxTienda,
  },
});
export const completeAddingTienda = (oldId, tienda) => ({
  type: types.TIENDA_ADD_COMPLETED,
  payload: {
    oldId,
    tienda,
  },
});
export const failAddingTienda = (oldId, error) => ({
  type: types.TIENDA_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startUpdatingTienda = (id, ubicacionTienda, telefonoTienda, faxTienda) => ({
  type: types.TIENDA_UPDATE_STARTED,
  payload: {
    id,
    ubicacionTienda,
    telefonoTienda,
    faxTienda,
  },
});
export const completeUpdatingTienda = (id, tienda) => ({
  type: types.TIENDA_UPDATE_COMPLETED,
  payload: {
    id,
    tienda,
  },
});
export const failUpdatingTienda = (id, error) => ({
  type: types.TIENDA_UPDATE_FAILED,
  payload: {
    id,
    error,
  },
});