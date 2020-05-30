import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';

import * as selectors from '../../reducers';
import * as actions from '../../actions/productos';

const ProductoForm = ({
  onSubmit,
  isLoading,
  error = null,
  handleSubmit,
}) => {
  const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
    return <TextInput onChangeText={onChange} {...restInput} {...rest} />
  }
  return (
    <View style={styles.container}>
      {
        error && (
          <Text>{error}</Text>
        )
      }
        <Field
            name={'nombre'}
            props={{
            placeholder: 'Nombre del Producto',
            }}
            component={renderInput}
        />
        <Field
            name={'descripcion'}
            props={{
            placeholder: 'Descripción',
            }}
            component={ renderInput }
        />
        <Field
            name={'precio'}
            props={{
            placeholder: 'Precio',
            }}
            component={renderInput}
        />
        {
        isLoading ? (
          <ActivityIndicator/>
        ) : (
          <Button onPress={handleSubmit(onSubmit)} title='Agregar'></Button>
        )
      }
    </View>
  );
} 

export default reduxForm({form: 'Producto'})(
  connect(
    state => ({
      idUsuario: selectors.getAuthUserID(state),
      tipo: selectors.getUsuario(state),
    }),
    dispatch => ({
      onSubmit(values) {
        const {
          nombre,
          descripcion,
          precio,
        } = values;
        dispatch(actions.startAddingProducto(uuidv4(), nombre, descripcion, precio, 0));
        dispatch(reset('Producto'));
      },
    }),
  )(ProductoForm)
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

