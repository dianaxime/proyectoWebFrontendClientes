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
import * as actions from '../actions/facturas';
import * as types from '../types/facturas';
  
  
function* fetchFacturas(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const usuario = jwtDecode(token);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/facturas/`,
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
            actions.completeFetchingFacturas(
              jsonResult['id'],
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingFacturas(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingFacturas('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchFetchFacturas() {
    yield takeEvery(
      types.FACTURAS_FETCH_STARTED,
      fetchFacturas,
    );
}
  
function* addFactura(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/facturas/`,
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
            actions.completeAddingFactura(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingFactura(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingFactura('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchAddFactura() {
    yield takeEvery(
      types.FACTURA_ADD_STARTED,
      addFactura,
    );
}
  