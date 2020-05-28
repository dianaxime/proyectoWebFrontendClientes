import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/facturas';


const FacturaRow = ({ fechaFactura, subtotalFactura, ivaFactura, totalFactura }) => (
    <TouchableOpacity>
        <Text>{ fechaFactura }</Text>
        <Text>Q{ subtotalFactura }</Text>
        <Text>Q{ ivaFactura }</Text>
        <Text>Q{ totalFactura }</Text>
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
)(FacturaRow);