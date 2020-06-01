import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/listas';

const ListaRow = ({ item, producto }) => (
    <TouchableOpacity>
        <Text>{ producto.nombreProducto }</Text>
        <Text>{ item.fechaLista }</Text>
        <Text>{ item.cantidadLista }</Text>
        <Text>{ item.turnoLista }</Text>
    </TouchableOpacity>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getCompra(state, item),
    producto: selectors.getProducto(state, item.idProducto)
  }),
  undefined,
)(ListaRow);