import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/compras';


const CompraRow = ({ nombreProducto, cantidadCompra, precioProducto, subtotalCompra }) => (
    <TouchableOpacity>
        <Text>{ nombreProducto }</Text>
        <Text>{ cantidadCompra }</Text>
        <Text>{ precioProducto }</Text>
        <Text> { subtotalCompra }</Text>
        <Button title='x'/>
    </TouchableOpacity>
);

export default connect(
  (state, { id }) => ({
    ...selectors.getPetOwner(state, id),
  }),
  (dispatch, { id }) => ({
    onDelete() {
      dispatch(actions.startRemovingPetOwner(id));
    }
  }),
)(CompraRow);