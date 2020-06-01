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
import * as actions from '../actions/registros';
import * as types from '../types/registros';
    
function* addRegistro(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/registros/`,
          {
            method: 'POST',
            body: JSON.stringify({
              cantidadRegistro: action.payload.cantidadRegistro,
              precioUnidadRegistro: action.payload.precioUnidadRegistro,
              subtotalRegistro: action.payload.subtotalRegistro,
              descuentoRegistro: action.payload.descuentoRegistro,
              totalRegistro: action.payload.totalRegistro,
              idProducto: action.payload.idProducto,
              idPedido: action.payload.idPedido,
            }),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          const jsonResult = yield response.json();
          yield put(
            actions.completeAddingRegistro(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingRegistro(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingRegistro('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchAddRegistro() {
    yield takeEvery(
      types.REGISTRO_ADD_STARTED,
      addRegistro,
    );
}
 