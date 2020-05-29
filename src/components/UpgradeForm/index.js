import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';

import * as selectors from '../../reducers';
import * as actionsCliente from '../../actions/clientes';
import * as actionsEmpleado from '../../actions/empleados';

const UpgradeForm = ({
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
        {
        isLoading ? (
          <ActivityIndicator/>
        ) : (
          <Button onPress={handleSubmit(onSubmit)} title='Actualizar'></Button>
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
      cliente: selectors.getCliente(state, selectors.getAuthUserID(state)),
      empleado: selectors.getEmpleado(state, selectors.getAuthUserID(state)),
    }),
    dispatch => ({
      onSubmit(values, tipo, cliente, empleado, idUsuario) {
        const {
          telefono,
          direccion,
        } = values;
        tipo === 'Cliente' ? (
            dispatch(actionsCliente.startUpdatingCliente(cliente['id'], direccion, telefono, idUsuario))
        ) : (
            dispatch(actionsEmpleado.startUpdatingEmpleado(empleado['id'], direccion, telefono, idUsuario))
        )
        dispatch(reset('Update'));
      },
    }),
    (stateProps, dispatchProps, ownProps) => ({
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
      onSubmit(values) {
        dispatchProps.onSubmit(values, stateProps.tipo, stateProps.cliente, stateProps.empleado, stateProps.idUsuario);
      },
    })
  )(UpgradeForm)
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

