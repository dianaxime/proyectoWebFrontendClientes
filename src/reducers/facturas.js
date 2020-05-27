import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/facturas';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.FACTURAS_FETCH_COMPLETED: {
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
    case types.FACTURA_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.FACTURA_ADD_COMPLETED: {
      const { oldId, lista } = action.payload;
      const newState = omit(state, oldId);
      newState[lista.id] = {
        ...lista,
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
    case types.FACTURAS_FETCH_STARTED: {
      return true;
    }
    case types.FACTURAS_FETCH_COMPLETED: {
      return false;
    }
    case types.FACTURAS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.FACTURAS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.FACTURAS_FETCH_STARTED: {
      return null;
    }
    case types.FACTURAS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const addingError = (state = null, action) => {
    switch(action.type) {
      case types.FACTURA_ADD_FAILED: {
        return action.payload.error;
      }
      case types.FACTURA_ADD_STARTED: {
        return null;
      }
      case types.FACTURA_ADD_COMPLETED: {
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

export const getFactura = state => state.byId;
export const isFetchingFactura = state => state.isFetching;
export const getFetchingFacturaError = state => state.error;
export const getAddingFacturaError = state => state.addingError;
export const getUpdatingFacturaError = state => state.updatingError;