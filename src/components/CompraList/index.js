import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Button } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/compras';
import * as actionsClientes from '../../actions/clientes';
import * as actionsProductos from '../../actions/productos';
import * as actionsUsuarios from '../../actions/usuarios';
import CompraRow from '../CompraRow';


const CompraList = ({ compras, isLoading, onLoad, onExpire, onFinish }) => {
  useEffect(onLoad, []);
  return (
    <View>
      {
        compras.length === 0 && !isLoading && (
          <Text>{'No hay Compras'}</Text>
        )
      }
      {
        isLoading && (
          <ActivityIndicator/>
        )
      }
      {
        compras.length > 0 && !isLoading && (
          <>
            <ScrollView>
              {compras && compras.map((item, i) => (
                <CompraRow
                  key={i}
                  item={item} 
                />
              ))}
            </ScrollView>
            <Button title='Finalizar' onPress={onFinish}/>
            <Button title='Quitar Producto' onPress={onExpire}/>
          </>
        )
      }
    </View>
  );
};

export default connect(
  state => ({
    compras: selectors.getCompras(state),
    isLoading: selectors.isFetchingCompras(state),
    cliente: selectors.getCliente(state, selectors.getAuthUserID(state)),
    selectedCompra: selectors.getSelectedCompra(state),
    tienda: selectors.getSelectedTienda(state),
  }),
  dispatch => ({
    onLoad(cliente) {
      dispatch(actions.startFetchingCompras(cliente));
    },
    onCharge(){
      dispatch(actionsProductos.startFetchingProductos());
    },
    onPile(){
      dispatch(actionsUsuarios.startFetchingUsuario());
      setTimeout(() => {
        dispatch(actionsClientes.startFetchingCliente());
      }, 1000);
    },
    onExpire(producto){
      dispatch(actions.startExpiringCompra(producto));
    },
    onFinish(cliente, tienda, compras){
      dispatch(actions.startPutingCompras(cliente, tienda, compras, compras))
    },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onLoad() {
      setTimeout(() => {
        dispatchProps.onPile();
      }, 1000);
      setTimeout(() => {
        dispatchProps.onCharge();
      }, 1000);
      setTimeout(() => {
        console.log("-----",stateProps.cliente),
        stateProps.cliente != null && (
          console.log("Hola mundo!"),
          dispatchProps.onLoad(stateProps.cliente['id'])  
        );
      }, 2000);    
    },
    onExpire(){
      dispatchProps.onExpire(stateProps.selectedCompra);
    },
    onFinish(){
      dispatchProps.onFinish(stateProps.cliente, stateProps.tienda, stateProps.compras);
    },
  })
)(CompraList);