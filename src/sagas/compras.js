import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    // delay,
    select,
} from 'redux-saga/effects';
  
import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/compras';
import * as types from '../types/compras';
  
  
function* fetchCompras(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const usuario = jwtDecode(token);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/compras/`,
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
          yield put(
            actions.completeFetchingCompras(
              jsonResult['id'],
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingCompras(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingCompras('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchFetchCompras() {
    yield takeEvery(
      types.COMPRAS_FETCH_STARTED,
      fetchCompras,
    );
}
  
function* addCompra(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/compras/`,
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
            actions.completeAddingCompra(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingCompra(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingCompra('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchAddCompra() {
    yield takeEvery(
      types.COMPRA_ADD_STARTED,
      addCompra,
    );
}
  