import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/tiendas';
import TiendaRow from '../TiendaRow';

const TiendaList = ({ tiendas, isLoading, onLoad }) => {
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
          <ScrollView>
            {tiendas && tiendas.map((item, i) => (
              <TiendaRow
                key={i}
                item={item} 
              />
            ))}
          </ScrollView>
        )
      }
    </View>
  );
};

export default connect(
  state => ({
    tiendas: selectors.getTiendas(state),
    isLoading: selectors.isFetchingTiendas(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingTiendas());
    },
  }),
)(TiendaList);
