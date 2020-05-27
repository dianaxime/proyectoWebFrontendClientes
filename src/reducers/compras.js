import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/compras';

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.COMPRAS_FETCH_COMPLETED: {
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
    case types.COMPRA_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.COMPRA_ADD_COMPLETED: {
      const { oldId, compra } = action.payload;
      const newState = omit(state, oldId);
      newState[compra.id] = {
        ...compra,
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
    case types.COMPRAS_FETCH_STARTED: {
      return true;
    }
    case types.COMPRAS_FETCH_COMPLETED: {
      return false;
    }
    case types.COMPRAS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.COMPRAS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.COMPRAS_FETCH_STARTED: {
      return null;
    }
    case types.COMPRAS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const addingError = (state = null, action) => {
    switch(action.type) {
      case types.COMPRA_ADD_FAILED: {
        return action.payload.error;
      }
      case types.COMPRA_ADD_STARTED: {
        return null;
      }
      case types.COMPRA_ADD_COMPLETED: {
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

export const getCompra = state => state.byId;
export const isFetchingCompras = state => state.isFetching;
export const getFetchingComprasError = state => state.error;
export const getAddingCompraError = state => state.addingError;
