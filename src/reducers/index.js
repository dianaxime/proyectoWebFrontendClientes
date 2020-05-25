import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth, * as authSelectors from './auth';
import usuarios, * as usuariosSelectors from './usuarios';
import clientes, * as clientesSelectors from './clientes';
import empleados, * as empleadosSelectors from './empleados';

const reducer = combineReducers({
  auth,
  usuarios,
  clientes,
  empleados,
  form: formReducer,
});

export default reducer;

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
export const getUsuario = state => usuariosSelectors.getUsuario(state.usuarios);
export const isFetchingUsuario = state => usuariosSelectors.isFetchingUsuario(state.usuarios);
export const getFetchingUsuarioError = state => usuariosSelectors.getFetchingUsuarioError(state.usuarios);
export const getCliente = state => clientesSelectors.getCliente(state.clientes);
export const isFetchingCliente = state => clientesSelectors.isFetchingCliente(state.clientes);
export const getFetchingClienteError = state => clientesSelectors.getFetchingClienteError(state.clientes);
export const getAddingClienteError = state => clientesSelectors.getAddingClienteError(state.clientes);
export const getUpdatingClienteError = state => clientesSelectors.getUpdatingClienteError(state.clientes);
export const getEmpleado = state => empleadosSelectors.getEmpleado(state.empleados);
export const isFetchingEmpleado = state => empleadosSelectors.isFetchingEmpleado(state.empleados);
export const getFetchingEmpleadoError = state => empleadosSelectors.getFetchingEmpleadoError(state.empleados);
export const getAddingEmpleadoError = state => empleadosSelectors.getAddingEmpleadoError(state.empleados);
export const getUpdatingEmpleadoError = state => empleadosSelectors.getUpdatingEmpleadoError(state.empleados);
