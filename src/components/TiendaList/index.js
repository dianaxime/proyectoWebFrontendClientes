import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
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
          <FlatList
            data={tiendas}
            renderItem={({ id }) => <TiendaRow key={id} id={id} />}
          />
        )
      }
    </View>
  );
};

export default connect(
  state => ({
    tiendas: selectors.getPetOwners(state),
    isLoading: selectors.isFetchingPetOwners(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingPetOwners());
    },
  }),
)(TiendaList);