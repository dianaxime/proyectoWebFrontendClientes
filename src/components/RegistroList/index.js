import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/registros';
import RegistroRow from '../RegistroRow';


const RegistroList = ({ registros, isLoading, onLoad, item }) => {
  useEffect(onLoad, []);
  return (
    <View>
      {
        registros.length === 0 && !isLoading && (
          <Text>{'No hay Registros'}</Text>
        )
      }
      {
        isLoading && (
          <ActivityIndicator/>
        )
      }
      {
        registros.length > 0 && !isLoading && (
          <ScrollView>
            {registros && registros.map((reg, i) => (
                item === reg.idPedido && (
                    <RegistroRow
                      key={i}
                      item={reg} 
                    />
                )
            ))}
          </ScrollView>
        )
      }
    </View>
  );
};

export default connect(
  (state, {item}) => ({
    ...selectors.getPedido(state, item),
    registros: selectors.getRegistros(state),
    isLoading: selectors.isFetchingRegistros(state),
    tipo: selectors.getUsuario(state),
    pedido: selectors.getSelectedPedido(state),
    pedido: selectors.getPedido(state, item),
  }),
  (dispatch, {item}) => ({
    onLoad() {
      dispatch(actions.startFetchingRegistros())
    },    
}),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
  })
)(RegistroList);