import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/productos';
import ProductRow from '../ProductoRow';


const ProductList = ({ productos, isLoading, onLoad }) => {
  useEffect(onLoad, []);
  return (
    <View>
      {
        productos.length === 0 && !isLoading && (
          <Text>{'No hay Productos'}</Text>
        )
      }
      {
        isLoading && (
          <ActivityIndicator/>
        )
      }
      {
        productos.length > 0 && !isLoading && (
          <FlatList
            data={productos}
            renderItem={({ id }) => <ProductRow key={id} id={id} />}
          />
        )
      }
    </View>
  );
};

export default connect(
  state => ({
    productos: selectors.getPetOwners(state),
    isLoading: selectors.isFetchingPetOwners(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingPetOwners());
    },
  }),
)(ProductList);