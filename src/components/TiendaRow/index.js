import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/tiendas';


const TiendaRow = ({ nombreTienda, ubicacionTienda, telefonoTienda, faxTienda }) => (
    <TouchableOpacity>
        <Text>{ nombreTienda }</Text>
        <Text>{ ubicacionTienda }</Text>
        <Text>{ telefonoTienda }</Text>
        <Text> { faxTienda }</Text>
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
)(TiendaRow);