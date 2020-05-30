import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/compras';
import * as selectedActions from '../../actions/selectedCompra';

const CompraRow = ({ item, producto, onSelect }) => (
    <TouchableOpacity onPress={onSelect}>
        <Text>{ producto.nombreProducto }</Text>
        <Text>{ item.cantidadCompra }</Text>
        <Text>Q{ item.subtotalCompra }</Text>
        <Text>Q{ item.descuentoCompra }</Text>
    </TouchableOpacity>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getCompra(state, item),
    producto: selectors.getProducto(state, item.idProducto)
  }),
  (dispatch, { item }) => ({
    onSelect() {
      console.log(item.id);
      dispatch(selectedActions.selectCompra(item.id));
    },
  }),
)(CompraRow);