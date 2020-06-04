import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';

import * as selectors from '../../reducers';
import * as actionsCliente from '../../actions/clientes';
import * as actionsEmpleado from '../../actions/empleados';

const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
  return <TextInput onChangeText={onChange} {...restInput} {...rest} />
}

const DataForm = ({
  onSubmit,
  isLoading,
  error = null,
  handleSubmit,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Completa tus Datos</Text>
      {
        error && (
          <Text style={styles.errors}>{error}</Text>
        )
      }
      <View style={styles.inputs}>
        <Field
            name={'nombre'}
            props={{
            placeholder: 'Nombre',
            }}
            component={renderInput}
            style={styles.textboxes}
        />
        <Field
            name={'telefono'}
            props={{
            placeholder: 'Número de telefóno',
            }}
            component={renderInput}
            style={styles.textboxes}
        />
        <Field
            name={'direccion'}
            props={{
            placeholder: 'Dirección',
            }}
            component={ renderInput }
            style={styles.textboxes}
        />
        <Field
            name={'nit'}
            props={{
            placeholder: 'NIT/Puesto',
            }}
            component={renderInput}
            style={styles.textboxes}
        />
      </View>
        {
        isLoading ? (
          <ActivityIndicator color='#400601'/>
        ) : (
          <View style={styles.buttonsignin}>
            <Button onPress={handleSubmit(onSubmit)} title='Completar' color='#400601'></Button>
          </View>
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
    justifyContent: 'center'
  },
  inputs: {
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  textboxes: {
    padding: 2,
    margin: 2,
    marginBottom: 25,
    borderBottomColor: '#0d0100',
    color: '#0d0100',
    borderBottomWidth: 1,
    width: 200,
  },
  buttonlogin: {
    padding: 10,
    marginTop: 20,
  },
  buttonsignin: {
    padding: 10,
    marginTop: 30,
  },
  errors: {
    color: '#950601',
    margin: 20,
  },
  titulo: {
    color: '#950601',
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
