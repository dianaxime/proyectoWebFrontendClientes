import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/compras';
import * as selectedActions from '../../actions/selectedProducto';

const ProductRow = ({ item, onSelect, onShop }) => {
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
          <Text>Q{ item.precioProducto }</Text>
          <Text>Q{ item.descuentoProducto}</Text>
          <Button title='+' onPress={sum}/>
          <Button title='-' onPress={res}/>
          <Text>{ cant }</Text>
          <Button title='Añadir' onPress={() => onShop(cant)}/>
      </TouchableOpacity>
    </View>
);
}

export default connect(
  (state, { item }) => ({
    ...selectors.getProducto(state, item),
    cliente: selectors.getCliente(state, selectors.getAuthUserID(state)),
  }),
  (dispatch, { item }) => ({
    onSelect() {
      console.log(item.id);
      dispatch(selectedActions.selectProducto(item.id));
    },
    onShop(cant, cliente ) {
      dispatch(actions.startAddingCompra(uuidv4(), cant, 'activo', cant*item.precioProducto, cant*item.descuentoProducto, item.id, cliente));
    }
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onShop(cant) {
      console.log("Hello world", cant, stateProps.cliente['id']);
      dispatchProps.onShop(cant, stateProps.cliente['id']);
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