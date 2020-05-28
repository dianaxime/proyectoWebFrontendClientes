import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/productos';
import CompraRow from '../CompraRow';


const CompraList = ({ compras, isLoading, onLoad }) => {
  useEffect(onLoad, []);
  return (
    <View>
      {
        compras.length === 0 && !isLoading && (
          <Text>{'No hay Compras'}</Text>
        )
      }
      {
        isLoading && (
          <ActivityIndicator/>
        )
      }
      {
        compras.length > 0 && !isLoading && (
          <FlatList
            data={compras}
            renderItem={({ id }) => <CompraRow key={id} id={id} />}
          />
        )
      }
    </View>
  );
};

export default connect(
  state => ({
    compras: selectors.getPetOwners(state),
    isLoading: selectors.isFetchingPetOwners(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingPetOwners());
    },
  }),
)(CompraList);