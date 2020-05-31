import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/tiendas';
import * as actionsUsuarios from '../../actions/usuarios';
import TiendaRow from '../TiendaRow';
import UpgradeTienda from '../UpgradeTienda';

const TiendaList = ({ tiendas, isLoading, onLoad, tipo }) => {
  useEffect(onLoad, []);
  return (
    <View>
      {
        tiendas.length === 0 && !isLoading && (
          <Text>{'No hay Tiendas'}</Text>
        )
      }
      {
        isLoading && (
          <ActivityIndicator/>
        )
      }
      {
        tiendas.length > 0 && !isLoading && (
          <>
            <ScrollView>
              {tiendas && tiendas.map((item, i) => (
                <TiendaRow
                  key={i}
                  item={item} 
                />
              ))}
            </ScrollView>
            {
              tipo === 'Empleado' && (
                <UpgradeTienda />
              )
            }
          </>
        )
      }
    </View>
  );
};

export default connect(
  state => ({
    tiendas: selectors.getTiendas(state),
    isLoading: selectors.isFetchingTiendas(state),
    tipo: selectors.getUsuario(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actionsUsuarios.startFetchingUsuario());
      setTimeout(() => {
        dispatch(actions.startFetchingTiendas());
      }, 3000);   
    },
  }),
)(TiendaList);
