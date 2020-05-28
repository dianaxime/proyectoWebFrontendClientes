import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/facturas';
import FacturaRow from '../FacturaRow';


const FacturaList = ({ facturas, isLoading, onLoad }) => {
  useEffect(onLoad, []);
  return (
    <View>
      {
        facturas.length === 0 && !isLoading && (
          <Text>{'No hay Productos'}</Text>
        )
      }
      {
        isLoading && (
          <ActivityIndicator/>
        )
      }
      {
        facturas.length > 0 && !isLoading && (
          <FlatList
            data={facturas}
            renderItem={({ id }) => <FacturaRow key={id} id={id} />}
          />
        )
      }
    </View>
  );
};

export default connect(
  state => ({
    facturas: selectors.getPetOwners(state),
    isLoading: selectors.isFetchingPetOwners(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingPetOwners());
    },
  }),
)(FacturaList);