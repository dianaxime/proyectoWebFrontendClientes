import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/registros';

const RegistroRow = ({ item, producto }) => (
    <TouchableOpacity >
        <Text>{ producto.nombreProducto }</Text>
        <Text>{ item.cantidadRegistro }</Text>
    </TouchableOpacity>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getRegistro(state, item),
    producto: selectors.getProducto(state, item.idProducto)
  }),
  undefined,
)(RegistroRow);