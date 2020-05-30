import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/productos';
import * as selectedActions from '../../actions/selectedProducto';

const ProductRow = ({ item, onSelect }) => {
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
    <TouchableOpacity onPress={onSelect}>
        <Text>{ item.nombreProducto }</Text>
        <Text>{ item.descripcionProducto }</Text>
        <Text>Q{ item.precioProducto }</Text>
        <Text>Q{ item.descuentoProducto}</Text>
        <Button title='+' onPress={sum}/>
        <Text>{ cant }</Text>
        <Button title='-' onPress={res}/>
        <Button title='Añadir'/>
    </TouchableOpacity>
);
}

export default connect(
  (state, { item }) => ({
    ...selectors.getProducto(state, item),
  }),
  (dispatch, { item }) => ({
    onSelect() {
      console.log(item);
      //dispatch(selectedActions.selectProducto(id));
    },
  }),
)(ProductRow);