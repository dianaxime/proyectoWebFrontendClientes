import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import * as selectors from '../../reducers';
import CompraList from '../CompraList';
import ListaList from '../ListaList';

const Opciones = ({ tipo }) => {
  return (
    <View>
      {
        tipo === 'Empleado' ? (
          <ListaList />
        ) : (
            <CompraList />
        )
      }
    </View>
  );
};

export default connect(
  state => ({
    tipo: selectors.getUsuario(state, selectors.getAuthUserID(state)),
  }),
  undefined,
)(Opciones);