import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/valoraciones';
import moment from 'moment';

const ValoracionRow = ({ item }) => (
    <TouchableOpacity >
      <Text>{ moment(item.fechaValoracion).calendar() }</Text>
      <Text>{ item.comentarioValoracion }</Text>
      <Text>{ item.puntuacionValoracion }</Text>
    </TouchableOpacity>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getComentario(state, item),
  }),
  undefined,
)(ValoracionRow);