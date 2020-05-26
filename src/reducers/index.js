import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth, * as authSelectors from './auth';
import usuarios, * as usuariosSelectors from './usuarios';
import clientes, * as clientesSelectors from './clientes';
import empleados, * as empleadosSelectors from './empleados';
import ofertas, * as ofertasSelectors from './ofertas';
import valoraciones, * as valoracionesSelectors from './valoraciones';
import tiendas, * as tiendasSelectors from './tiendas';

const reducer = combineReducers({
  auth,
  usuarios,
  clientes,
  empleados,
  ofertas,
  valoraciones,
  tiendas,
  form: formReducer,
});

export default reducer;

/* Authentication */
export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const getIsRegistering = state => authSelectors.getIsRegistering(state.auth);
export const getRegisteringError = state => authSelectors.getRegisteringError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);
export const getRegisteringCompleted = state => authSelectors.getRegisteringCompleted(state.auth);
/* Usuario */
export const getUsuario = state => usuariosSelectors.getUsuario(state.usuarios);
export const isFetchingUsuario = state => usuariosSelectors.isFetchingUsuario(state.usuarios);
export const getFetchingUsuarioError = state => usuariosSelectors.getFetchingUsuarioError(state.usuarios);
/* Cliente */
export const getCliente = state => clientesSelectors.getCliente(state.clientes);
export const isFetchingCliente = state => clientesSelectors.isFetchingCliente(state.clientes);
export const getFetchingClienteError = state => clientesSelectors.getFetchingClienteError(state.clientes);
export const getAddingClienteError = state => clientesSelectors.getAddingClienteError(state.clientes);
export const getUpdatingClienteError = state => clientesSelectors.getUpdatingClienteError(state.clientes);
/* Empleado */
export const getEmpleado = state => empleadosSelectors.getEmpleado(state.empleados);
export const isFetchingEmpleado = state => empleadosSelectors.isFetchingEmpleado(state.empleados);
export const getFetchingEmpleadoError = state => empleadosSelectors.getFetchingEmpleadoError(state.empleados);
export const getAddingEmpleadoError = state => empleadosSelectors.getAddingEmpleadoError(state.empleados);
export const getUpdatingEmpleadoError = state => empleadosSelectors.getUpdatingEmpleadoError(state.empleados);
/* Oferta */
export const getOferta = (state, id) => ofertasSelectors.getOferta(state.ofertas, id);
export const getOfertas = state => ofertasSelectors.getOfertas(state.ofertas);
export const isFetchingOfertas = state => ofertasSelectors.isFetchingOfertas(state.ofertas);
export const getFetchingOfertasError = state => ofertasSelectors.getFetchingOfertasError(state.ofertas);
/* Valoracion */

/* Compra */

/* Factura */

/* Lista */

/* Pedido */

/* Producto */

/* Registro */

/* Tienda */
export const getTienda = state => tiendasSelectors.getTienda(state.tiendas);
export const isFetchingTienda = state => tiendasSelectors.isFetchingTienda(state.tiendas);
export const getFetchingTiendaError = state => tiendasSelectors.getFetchingTiendaError(state.tiendas);
export const getAddingTiendaError = state => tiendasSelectors.getAddingTiendaError(state.tiendas);
export const getUpdatingTiendaError = state => tiendasSelectors.getUpdatingTiendaError(state.tiendas);
