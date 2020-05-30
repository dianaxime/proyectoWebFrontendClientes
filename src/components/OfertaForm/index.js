import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';

import * as selectors from '../../reducers';
import * as actions from '../../actions/ofertas';

const OfertaForm = ({
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
            name={'vence'}
            props={{
            placeholder: 'Fecha de Vencimiento',
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
            name={'descuento'}
            props={{
            placeholder: '% de Descuento',
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

export default reduxForm({form: 'Oferta'})(
  connect(
    state => ({
      producto: selectors.getSelectedProducto(state),
    }),
    dispatch => ({
      onSubmit(values, producto) {
        const {
          vence,
          descripcion,
          descuento,
        } = values;
        dispatch(actions.startAddingProducto(descripcion, descuento, vence, producto));
        dispatch(reset('Oferta'));
      },
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onSubmit(values) {
          dispatchProps.onSubmit(values, stateProps.producto);
        },
      })
  )(OfertaForm)
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

