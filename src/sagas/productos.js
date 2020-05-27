import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    //delay,
    select,
} from 'redux-saga/effects';
  
import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/productos';
import * as types from '../types/productos';
  
  
function* fetchProductos(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const usuario = jwtDecode(token);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/productos/`,
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
            actions.completeFetchingProductos(
              jsonResult['id'],
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingProductos(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingProductos('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchProductosFetch() {
    yield takeEvery(
      types.PRODUCTOS_FETCH_STARTED,
      fetchProductos,
    );
}
  
function* addProducto(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/productos/`,
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
            actions.completeAddingProducto(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingProducto(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingProducto('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchAddProducto() {
    yield takeEvery(
      types.EMPLEADO_ADD_STARTED,
      addProducto,
    );
}
 