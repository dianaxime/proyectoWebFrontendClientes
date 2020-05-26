import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/valoraciones';


const comentarios = (state = {}, action) => {
  switch(action.type) {
    case types.COMENTARIOS_FETCH_COMPLETED: {
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
    default: {
      return state;
    }
  }
};

const orderComentarios = (state = [], action) => {
  switch(action.type) {
    case types.COMENTARIOS_FETCH_COMPLETED: {
      return [...state, ...action.payload.orderComentarios];
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.COMENTARIOS_FETCH_STARTED: {
      return true;
    }
    case types.COMENTARIOS_FETCH_COMPLETED: {
      return false;
    }
    case types.COMENTARIOS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.COMENTARIOS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.COMENTARIOS_FETCH_STARTED: {
      return null;
    }
    case types.COMENTARIOS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const puntuacion = (state = null, action) => {
    switch(action.type) {
      case types.PUNTUACION_FETCH_COMPLETED: {
        return action.payload.usuario;
      }
      case types.PUNTUACION_FETCH_STARTED: {
          return null;
      }
      case types.PUNTUACION_FETCH_FAILED: {
          return null;
      }
      default: {
        return state;
      }
    }
};

const byId = (state = {}, action) => {
    switch(action.type) {
      case types.VALORACION_ADD_STARTED: {
        const newState = { ...state };
        newState[action.payload.id] = {
          ...action.payload,
          isConfirmed: false,
        };
        return newState;
      }
      case types.VALORACION_ADD_COMPLETED: {
        const { oldId, valoracion } = action.payload;
        const newState = omit(state, oldId);
        newState[valoracion.id] = {
          ...valoracion,
          isConfirmed: true,
        };
        return newState;
      }
      default: {
        return state;
      }
    }
};
  
const order = (state = [], action) => {
    switch(action.type) {
      case types.VALORACION_ADD_STARTED: {
        return [...state, action.payload.id];
      }
      case types.VALORACION_ADD_COMPLETED: {
        const { oldId, valoracion } = action.payload;
        return state.map(id => id === oldId ? valoracion.id : id);
      }
      default: {
        return state;
      }
    }
};

export default combineReducers({
  byId,
  order,
  isFetching,
  error,
  puntuacion,
  comentarios,
  orderComentarios,
});

//export const getPetOwner = (state, id) => state.byId[id];
//export const getPetOwners = state => state.order.map(id => getPetOwner(state, id));
export const isFetchingComentarios = state => state.isFetching;
export const getFetchingComentariosError = state => state.error;