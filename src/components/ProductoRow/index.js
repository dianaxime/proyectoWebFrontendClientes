import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/productos';


const ProductRow = ({ nombreProducto, descripcionProducto, precioProducto, descuentoProducto }) => (
    <TouchableOpacity>
        <Text>{ nombreProducto }</Text>
        <Text>{ descripcionProducto }</Text>
        <Text>{ precioProducto }</Text>
        <Text> { descuentoProducto}</Text>
        <Button title='+'/>
        <Button title='-'/>
        <Button title='Añadir'/>
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
)(ProductRow);