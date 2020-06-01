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

const order = (state = [], action) => {
  switch(action.type) {
    case types.REGISTRO_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.REGISTRO_ADD_COMPLETED: {
      const { oldId, registro } = action.payload;
      return state.map(id => id === oldId ? registro.id : id);
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  byId,
  order,
});

export const getRegistro = (state, id) => state.byId[id];
export const getRegistros = state => state.order.map(id => getRegistro(state, id));
