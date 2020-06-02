import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/compras';
import * as actionsListas from '../../actions/listas';
import * as selectedActions from '../../actions/selectedProducto';
import moment from 'moment';

const ProductRow = ({ item, onSelect, onShop, tipo }) => {
  const [cant, changeCant] = useState(0);
  const sum = () => changeCant(cant+1);
  const res = () => {
    cant > 0 ? (
      changeCant(cant-1)
    ) : (
      changeCant(0)
    )
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSelect}>
          <Text>{ item.nombreProducto }</Text>
          <Text>{ item.descripcionProducto }</Text>
          <Text>Q{ parseFloat(item.precioProducto).toFixed(2) }</Text>
          <Text>Q{ parseFloat(item.descuentoProducto).toFixed(2) }</Text>
          {
            (tipo === 'Cliente') && (
              <>
                <Button title='+' onPress={sum}/>
                <Button title='-' onPress={res}/>
                <Text>{ cant }</Text>
                <Button title='Añadir' onPress={() => onShop(cant)}/>
              </>
            )
          }
      </TouchableOpacity>
    </View>
);
}

export default connect(
  (state, { item }) => ({
    ...selectors.getProducto(state, item),
    cliente: selectors.getCliente(state, selectors.getAuthUserID(state)),
    tipo: selectors.getUsuario(state),
    listas: selectors.getListas(state),
  }),
  (dispatch, { item }) => ({
    onSelect() {
      console.log(item.id);
      dispatch(selectedActions.selectProducto(item.id));
    },
    onShop(cant, cliente, listas ) {
      dispatch(actions.startAddingCompra(uuidv4(), cant, 'activo', cant*item.precioProducto, cant*item.descuentoProducto, item.id, cliente));
      listas.map(lista => {
        lista.idProducto === item.id && lista.fechaLista === moment().format('YYYY-MM-DD') && (
          dispatch(actionsListas.startDecreasingLista(lista.id, cant))
        )
      });
    }
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onShop(cant) {
      console.log("Hello world", cant, stateProps.cliente['id']);
      dispatchProps.onShop(cant, stateProps.cliente['id'], stateProps.listas);
    },
  })
)(ProductRow);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});