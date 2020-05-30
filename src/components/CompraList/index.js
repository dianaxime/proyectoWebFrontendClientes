import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/compras';
import * as actionsClientes from '../../actions/clientes';
import * as actionsProductos from '../../actions/productos';
import CompraRow from '../CompraRow';


const CompraList = ({ compras, isLoading, onLoad }) => {
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
          <ScrollView>
            {compras && compras.map((item, i) => (
              <CompraRow
                key={i}
                item={item} 
              />
            ))}
          </ScrollView>
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
  }),
  dispatch => ({
    onLoad(cliente) {
      dispatch(actions.startFetchingCompras(cliente));
    },
    onCharge(){
      dispatch(actionsProductos.startFetchingProductos());
    },
    onPile(){
      dispatch(actionsClientes.startFetchingCliente());
    }
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
      }, 1000);    
    },
  })
)(CompraList);