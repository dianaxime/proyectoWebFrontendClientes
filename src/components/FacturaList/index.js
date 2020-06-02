import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/facturas';
import * as actionsUsuarios from '../../actions/usuarios';
import * as actionsClientes from '../../actions/clientes';
import FacturaRow from '../FacturaRow';


const FacturaList = ({ facturas, isLoading, onLoad }) => {
  useEffect(onLoad, []);
  return (
    <View>
      {
        facturas.length === 0 && !isLoading && (
          <Text>{'No hay Facturas'}</Text>
        )
      }
      {
        isLoading && (
          <ActivityIndicator/>
        )
      }
      {
        facturas.length > 0 && !isLoading && (
          <ScrollView>
            {facturas && facturas.map((item, i) => (
              <FacturaRow
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
    facturas: selectors.getFacturas(state),
    isLoading: selectors.isFetchingFacturas(state),
    tipo: selectors.getUsuario(state),
    cliente: selectors.getCliente(state, selectors.getAuthUserID(state)),
  }),
  dispatch => ({
    onLoad(tipo, cliente) {
      tipo === 'Cliente' ? (
        dispatch(actions.startFetchingFacturasClientes(cliente))
      ): (
        dispatch(actions.startFetchingFacturas())
      )
    },
    onPile(){
      dispatch(actionsUsuarios.startFetchingUsuario());
      setTimeout(() => {
        dispatch(actionsClientes.startFetchingCliente());
      }, 1000);
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
        console.log("-----",stateProps.cliente, stateProps.tipo),
        stateProps.cliente != null && stateProps.tipo != null && (
          console.log("Hola mundo!"),
          dispatchProps.onLoad(stateProps.tipo, stateProps.cliente['id'])  
        );
      }, 3000);    
    },
  })
)(FacturaList);