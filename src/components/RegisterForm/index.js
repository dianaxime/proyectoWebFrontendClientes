import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';

import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';

const RegisterForm = ({
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
        name={'email'}
        props={{
          placeholder: 'Correo',
        }}
        component={renderInput}
      />
      <Field
        name={'username'}
        props={{
          placeholder: 'Nombre de Usuario',
        }}
        component={renderInput}
      />
      <Field
        name={'tipo'}
        props={{
          placeholder: 'Cliente/Empleado',
        }}
        component={ renderInput }/>
      <Field
        name={'password'}
        props={{
          placeholder: 'Contraseña',
          secureTextEntry: true,
        }}
        component={renderInput}
      />
      <Field
        name={'password2'}
        props={{
          placeholder: 'Confirmar Contraseña',
          secureTextEntry: true,
        }}
        component={renderInput}
      />
      {
        isLoading ? (
          <ActivityIndicator/>
        ) : (
          <Button onPress={handleSubmit(onSubmit)} title='Registrarse'></Button>
        )
      }
    </View>
  );
} 

export default reduxForm({form: 'Register'})(
  connect(
    state => ({
      isLoading: selectors.getIsRegistering(state),
      error: selectors.getRegisteringError(state),
    }),
    dispatch => ({
      onSubmit(values) {
        const {
          email, 
          username, 
          password, 
          password2, 
          tipo,
        } = values;
        dispatch(actions.startRegister(username, password, password2, email, tipo));
        dispatch(reset('Register'));
      },
    }),
  )(RegisterForm)
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
