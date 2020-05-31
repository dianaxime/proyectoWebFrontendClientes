import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';

import * as selectors from '../../reducers';
import * as actions from '../../actions/tiendas';

const TiendaForm = ({
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
        <Field
            name={'nombreTienda'}
            props={{
            placeholder: 'Nombre de la Tienda',
            }}
            component={renderInput}
        />
        <Field
            name={'ubicacionTienda'}
            props={{
            placeholder: 'Ubicación',
            }}
            component={ renderInput }
        />
        <Field
            name={'telefonoTienda'}
            props={{
            placeholder: 'Telefóno',
            }}
            component={renderInput}
        />
        <Field
            name={'faxTienda'}
            props={{
            placeholder: 'Fax',
            }}
            component={renderInput}
        />
        <Button onPress={handleSubmit(onSubmit)} title='Agregar'></Button>
    </View>
  );
} 

export default reduxForm({form: 'Tienda'})(
  connect(
    state => ({
      tipo: selectors.getUsuario(state),
    }),
    dispatch => ({
      onSubmit(values) {
        const {
          nombreTienda,
          ubicacionTienda,
          telefonoTienda,
          faxTienda,
        } = values;
        dispatch(actions.startAddingTienda(uuidv4(), nombreTienda, ubicacionTienda, telefonoTienda, faxTienda));
        dispatch(reset('Tienda'));
      },
    }),
  )(TiendaForm)
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

