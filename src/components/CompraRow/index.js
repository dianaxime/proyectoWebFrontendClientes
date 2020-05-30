import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/compras';


const CompraRow = ({ item, producto }) => (
    <TouchableOpacity>
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
    /*onDelete() {
      dispatch(actions.startRemovingPetOwner(id));
    }*/
  }),
)(CompraRow);