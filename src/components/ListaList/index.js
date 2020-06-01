import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Button } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/listas';
import * as actionsProductos from '../../actions/productos';
import ListaRow from '../ListaRow';


const ListaList = ({ listas, isLoading, onLoad }) => {
  useEffect(onLoad, []);
  return (
    <View>
      {
        listas.length === 0 && !isLoading && (
          <Text>{'No hay Listas'}</Text>
        )
      }
      {
        isLoading && (
          <ActivityIndicator/>
        )
      }
      {
        listas.length > 0 && !isLoading && (
          <>
            <ScrollView>
              {listas && listas.map((item, i) => (
                <ListaRow
                  key={i}
                  item={item} 
                />
              ))}
            </ScrollView>
          </>
        )
      }
    </View>
  );
};

export default connect(
  state => ({
    listas: selectors.getListas(state),
    isLoading: selectors.isFetchingListas(state),
  }),
  dispatch => ({
    onLoad() {
        setTimeout(() => {
            dispatch(actions.startFetchingListas());
        }, 1000);
        setTimeout(() => {
            dispatch(actionsProductos.startFetchingProductos());
      }, 1000);
    },
  }),
)(ListaList);