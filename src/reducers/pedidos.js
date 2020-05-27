import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/pedidos';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.LISTAS_FETCH_COMPLETED: {
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
    case types.LISTA_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.LISTA_ADD_COMPLETED: {
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
    case types.LISTAS_FETCH_STARTED: {
      return true;
    }
    case types.LISTAS_FETCH_COMPLETED: {
      return false;
    }
    case types.LISTAS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.LISTAS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.LISTAS_FETCH_STARTED: {
      return null;
    }
    case types.LISTAS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const addingError = (state = null, action) => {
    switch(action.type) {
      case types.LISTA_ADD_FAILED: {
        return action.payload.error;
      }
      case types.LISTA_ADD_STARTED: {
        return null;
      }
      case types.LISTA_ADD_COMPLETED: {
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

export const getLista = state => state.byId;
export const isFetchingLista = state => state.isFetching;
export const getFetchingListaError = state => state.error;
export const getAddingListaError = state => state.addingError;
export const getUpdatingListaError = state => state.updatingError;