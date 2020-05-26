import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/productos';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.PRODUCTOS_FETCH_COMPLETED: {
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
    case types.PRODUCTO_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.PRODUCTO_ADD_COMPLETED: {
      const { oldId, empleado } = action.payload;
      const newState = omit(state, oldId);
      newState[empleado.id] = {
        ...empleado,
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
    case types.PRODUCTOS_FETCH_STARTED: {
      return true;
    }
    case types.PRODUCTOS_FETCH_COMPLETED: {
      return false;
    }
    case types.PRODUCTOS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.PRODUCTOS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.PRODUCTOS_FETCH_STARTED: {
      return null;
    }
    case types.PRODUCTOS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const addingError = (state = null, action) => {
    switch(action.type) {
      case types.PRODUCTO_ADD_FAILED: {
        return action.payload.error;
      }
      case types.PRODUCTO_ADD_STARTED: {
        return null;
      }
      case types.PRODUCTO_ADD_COMPLETED: {
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
});

export const getProducto = state => state.byId;
export const isFetchingProducto = state => state.isFetching;
export const getFetchingProductoError = state => state.error;
export const getAddingProductoError = state => state.addingError;
