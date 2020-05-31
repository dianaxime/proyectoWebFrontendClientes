import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/tiendas';
import * as selectedActions from '../../actions/selectedTienda';

const TiendaRow = ({ item, onSelect }) => (
    <TouchableOpacity onPress={onSelect}>
      <Text>{ item.nombreTienda }</Text>
      <Text>{ item.ubicacionTienda }</Text>
      <Text>{ item.telefonoTienda }</Text>
      <Text>{ item.faxTienda }</Text>
    </TouchableOpacity>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getTienda(state, item),
  }),
  (dispatch, { item }) => ({
    onSelect() {
      console.log(item.id);
      dispatch(selectedActions.selectTienda(item.id));
    },
  }),
)(TiendaRow);
