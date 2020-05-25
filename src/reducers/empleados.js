import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/empleados';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.EMPLEADO_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = { ...state };
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });
      return newState;
    }
    case types.EMPLEADO_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.EMPLEADO_ADD_COMPLETED: {
      const { oldId, cliente } = action.payload;
      const newState = omit(state, oldId);
      newState[cliente.id] = {
        ...cliente,
        isConfirmed: true,
      };
      return newState;
    }
    case types.EMPLEADO_UPDATE_STARTED: {
        return {
            ...state,
            [action.payload.id]: {
            ...state[action.payload.id],
            ...action.payload,
            },
        };
      }
    case types.EMPLEADO_UPDATE_COMPLETED: {
        const { id, cliente } = action.payload;
        const newState = omit(state, oldId);
        newState[cliente.id] = {
          ...cliente,
          isConfirmed: true,
        };
        return newState;
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.EMPLEADO_FETCH_STARTED: {
      return true;
    }
    case types.EMPLEADO_FETCH_COMPLETED: {
      return false;
    }
    case types.EMPLEADO_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.EMPLEADO_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.EMPLEADO_FETCH_STARTED: {
      return null;
    }
    case types.EMPLEADO_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const addingError = (state = null, action) => {
    switch(action.type) {
      case types.EMPLEADO_ADD_FAILED: {
        return action.payload.error;
      }
      case types.EMPLEADO_ADD_STARTED: {
        return null;
      }
      case types.EMPLEADO_ADD_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
};

const updatingError = (state = null, action) => {
    switch(action.type) {
      case types.EMPLEADO_UPDATE_FAILED: {
        return action.payload.error;
      }
      case types.EMPLEADO_UPDATE_STARTED: {
        return null;
      }
      case types.EMPLEADO_UPDATE_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
};


export default combineReducers({
  byId,
  isFetching,
  error,
  addingError,
  updatingError,
});

export const getEmpleado = (state, id) => state.byId[id];
export const getEmpleado = state => state.order.map(id => getEmpleado(state, id));
export const isFetchingEmpleado = state => state.isFetching;
export const getFetchingEmpleadoError = state => state.error;
export const getAddingEmpleadoError = state => state.addingError;
export const getUpdatingEmpleadoError = state => state.updatingError;