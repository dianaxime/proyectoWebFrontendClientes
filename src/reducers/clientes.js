import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/clientes';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.CLIENTE_FETCH_COMPLETED: {
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
    case types.CLIENTE_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.CLIENTE_ADD_COMPLETED: {
      const { oldId, cliente } = action.payload;
      const newState = omit(state, oldId);
      newState[cliente.id] = {
        ...cliente,
        isConfirmed: true,
      };
      return newState;
    }
    case types.CLIENTE_UPDATE_STARTED: {
        return {
            ...state,
            [action.payload.id]: {
            ...state[action.payload.id],
            ...action.payload,
            },
        };
      }
    case types.CLIENTE_UPDATE_COMPLETED: {
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
    case types.CLIENTE_FETCH_STARTED: {
      return true;
    }
    case types.CLIENTE_FETCH_COMPLETED: {
      return false;
    }
    case types.CLIENTE_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.CLIENTE_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.CLIENTE_FETCH_STARTED: {
      return null;
    }
    case types.CLIENTE_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const addingError = (state = null, action) => {
    switch(action.type) {
      case types.CLIENTE_ADD_FAILED: {
        return action.payload.error;
      }
      case types.CLIENTE_ADD_STARTED: {
        return null;
      }
      case types.CLIENTE_ADD_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
};

const updatingError = (state = null, action) => {
    switch(action.type) {
      case types.CLIENTE_UPDATE_FAILED: {
        return action.payload.error;
      }
      case types.CLIENTE_UPDATE_STARTED: {
        return null;
      }
      case types.CLIENTE_UPDATE_COMPLETED: {
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

export const getCliente = (state, id) => state.byId[id];
export const getCliente = state => state.order.map(id => getCliente(state, id));
export const isFetchingCliente = state => state.isFetching;
export const getFetchingClienteError = state => state.error;
export const getAddingClienteError = state => state.addingError;
export const getUpdatingClienteError = state => state.updatingError;