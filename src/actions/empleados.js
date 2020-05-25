import * as types from '../types/empleados';


export const startFetchingEmpleado = () => ({
  type: types.EMPLEADO_FETCH_STARTED,
});
export const completeFetchingEmpleado = (id, Empleado) => ({
  type: types.EMPLEADO_FETCH_COMPLETED,
  payload: {
    id,
    EMPLEADO,
  },
});
export const failFetchingEmpleado = error => ({
  type: types.EMPLEADO_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingEMPLEADO = (nombreEmpleado, telefonoEmpleado, direccionEmpleado, nitEmpleado, idUsuario) => ({
  type: types.EMPLEADO_ADD_STARTED,
  payload: {
    nombreEmpleado,
    telefonoEmpleado,
    direccionEmpleado,
    nitEmpleado,
    idUsuario,
  },
});
export const completeAddingEmpleado = (oldId, empleado) => ({
  type: types.EMPLEADO_ADD_COMPLETED,
  payload: {
    oldId,
    empleado,
  },
});
export const failAddingEMPLEADO = (oldId, error) => ({
  type: types.EMPLEADO_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startUpdatingEmpleado = (id, direccionEmpleado, telefonoEmpleado) => ({
  type: types.EMPLEADO_UPDATE_STARTED,
  payload: {
    id,
    direccionEmpleado,
    telefonoEmpleado,
  },
});
export const completeUpdatingEMPLEADO = (id, empleado) => ({
  type: types.EMPLEADO_UPDATE_COMPLETED,
  payload: {
    id,
    empleado,
  },
});
export const failUpdatingEMPLEADO = (id, error) => ({
  type: types.EMPLEADO_UPDATE_FAILED,
  payload: {
    id,
    error,
  },
});