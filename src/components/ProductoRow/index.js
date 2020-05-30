import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/productos';
import * as selectedActions from '../../actions/selectedProducto';

const ProductRow = ({ nombreProducto, descripcionProducto, precioProducto, descuentoProducto }) => (
    <TouchableOpacity onPress={() => onSelect()}>
        <Text>{ nombreProducto }</Text>
        <Text>{ descripcionProducto }</Text>
        <Text>Q{ precioProducto }</Text>
        <Text>Q{ descuentoProducto}</Text>
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
    onSelect() {
      dispatch(selectedActions.selectProducto(id));
    }
  }),
)(ProductRow);