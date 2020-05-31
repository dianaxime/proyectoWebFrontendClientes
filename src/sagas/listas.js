import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    //delay,
    select,
} from 'redux-saga/effects';

import { normalize } from 'normalizr';
import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/listas';
import * as types from '../types/listas';
import * as schemas from '../schemas/listas';    
  
function* fetchListas(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const usuario = jwtDecode(token);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/listas/obtener-listas/`,
          {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          const jsonResult = yield response.json();
          const {
            entities: { listas },
            result,
          } = normalize(jsonResult, schemas.lista);
          yield put(
            actions.completeFetchingListas(
              result,
              listas,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingListas(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingListas('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchFetchListas() {
    yield takeEvery(
      types.LISTAS_FETCH_STARTED,
      fetchListas,
    );
}
  
function* addLista(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/listas/`,
          {
            method: 'POST',
            body: JSON.stringify(action.payload),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          const jsonResult = yield response.json();
          yield put(
            actions.completeAddingLista(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingLista(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingLista('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchAddLista() {
    yield takeEvery(
      types.LISTA_ADD_STARTED,
      addLista,
    );
}
 