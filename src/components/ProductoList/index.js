import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/productos';
import * as actionsUsuarios from '../../actions/usuarios';
import ProductoRow from '../ProductoRow';
import OfertaForm from '../OfertaForm';
import ListaForm from '../ListaForm';

const ProductList = ({ productos, isLoading, onLoad, tipo }) => {
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
          <>
            <ScrollView>
              {productos && productos.map((item, i) => (
                <ProductoRow
                  key={i}
                  item={item} 
                />
              ))}
            </ScrollView>
            {
              tipo === 'Empleado' && (
                <>
                  <ListaForm />
                  <OfertaForm />
                </>
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
    productos: selectors.getProductos(state),
    isLoading: selectors.isFetchingProductos(state),
    tipo: selectors.getUsuario(state, selectors.getAuthUserID(state)),
  }),
  dispatch => ({
    onLoad() {
      setTimeout(() => {
        dispatch(actionsUsuarios.startFetchingUsuario());
      }, 3000); 
      dispatch(actions.startFetchingProductos());
    },
  }),
)(ProductList);