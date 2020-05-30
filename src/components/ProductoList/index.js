import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/productos';
import ProductoRow from '../ProductoRow';


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
          <ScrollView>
            {productos && productos.map((item, i) => (
              <ProductoRow
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
    productos: selectors.getProductos(state),
    isLoading: selectors.isFetchingProductos(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingProductos());
    },
  }),
)(ProductList);