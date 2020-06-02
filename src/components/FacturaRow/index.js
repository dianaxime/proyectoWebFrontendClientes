import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/facturas';
import moment from 'moment';

const FacturaRow = ({ item }) => (
    <TouchableOpacity>
        <Text>{ moment(item.fechaFactura).calendar() }</Text>
        <Text>Q{ parseFloat(item.subtotalFactura).toFixed(2) }</Text>
        <Text>Q{ parseFloat(item.ivaFactura).toFixed(2) }</Text>
        <Text>Q{ parseFloat(item.totalFactura).toFixed(2) }</Text>
    </TouchableOpacity>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getFactura(state, item),
  }),
  undefined,
)(FacturaRow);