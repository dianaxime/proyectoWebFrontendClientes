import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/registros';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.REGISTRO_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.REGISTRO_ADD_COMPLETED: {
      const { oldId, registro } = action.payload;
      const newState = omit(state, oldId);
      newState[registro.id] = {
        ...registro,
        isConfirmed: true,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};

const addingError = (state = null, action) => {
    switch(action.type) {
      case types.REGISTRO_ADD_FAILED: {
        return action.payload.error;
      }
      case types.REGISTRO_ADD_STARTED: {
        return null;
      }
      case types.REGISTRO_ADD_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
};

export default combineReducers({
  byId,
  addingError,
});

export const getRegistro = state => state.byId;
export const getAddingRegistroError = state => state.addingError;
