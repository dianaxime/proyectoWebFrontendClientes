import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';

import * as selectors from '../../reducers';
import * as actionsCliente from '../../actions/clientes';
import * as actionsEmpleado from '../../actions/empleados';

const DataForm = ({
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
            placeholder: 'Nombre',
            }}
            component={renderInput}
        />
        <Field
            name={'telefono'}
            props={{
            placeholder: 'Número de telefóno',
            }}
            component={renderInput}
        />
        <Field
            name={'direccion'}
            props={{
            placeholder: 'Dirección',
            }}
            component={ renderInput }
        />
        <Field
            name={'nit'}
            props={{
            placeholder: 'NIT/Puesto',
            secureTextEntry: true,
            }}
            component={renderInput}
        />
        {
        isLoading ? (
          <ActivityIndicator/>
        ) : (
          <Button onPress={handleSubmit(onSubmit)} title='Completar'></Button>
        )
      }
    </View>
  );
} 

export default reduxForm({form: 'Update'})(
  connect(
    state => ({
      idUsuario: selectors.getAuthUserID(state),
      tipo: selectors.getUsuario(state),
    }),
    dispatch => ({
      onSubmit(values, tipo, idUsuario) {
        const {
          nombre,
          telefono,
          direccion,
          nit,
        } = values;
        tipo === 'Cliente' ? (
            dispatch(actionsCliente.startAddingCliente(uuidv4(), nombre, telefono, direccion, nit, idUsuario))
        ) : (
            dispatch(actionsEmpleado.startAddingEmpleado(uuidv4(), nombre, telefono, direccion, nit, idUsuario))
        )
        dispatch(reset('Update'));
      },
    }),
    (stateProps, dispatchProps, ownProps) => ({
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
      onSubmit(values) {
        console.log("Hola", stateProps.idUsuario, stateProps.tipo);
        dispatchProps.onSubmit(values, stateProps.tipo, stateProps.idUsuario);
      },
    })
  )(DataForm)
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
