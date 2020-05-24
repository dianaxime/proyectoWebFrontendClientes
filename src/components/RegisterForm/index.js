import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Select } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm, formValueSelector } from 'redux-form';

import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';


const RegisterForm = ({
  onSubmit,
  isLoading,
  error = null,
  isAuthenticated = false,
  authUsername = '',
  handleSubmit,
}) => {
  const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
    return <TextInput onChangeText={onChange} {...restInput} {...rest} />
  }
  const typeOptions = [
    {label: 'Cliente', value: 'Cliente'},
    {label: 'Empleado', value: 'Empleado'}]
  if (isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text>{`Bienvenido ${authUsername} nuevamente!`}</Text>
      </View>
    );
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
          placeholder: 'Nombre de Usuario',
          options: {typeOptions},
        }}
        component={renderInput}
      />
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
            <Text>{'Cargando...'}</Text>
          ) : (
            <Button onPress={handleSubmit(onSubmit)} title='Registrar'></Button>
          )
        }
    </View>
  );
} 

export default reduxForm({form: 'Register'})(
  connect(
    state => ({
      isLoading: selectors.getIsAuthenticating(state),
      error: selectors.getAuthenticatingError(state),
      isAuthenticated: selectors.isAuthenticated(state),
      authUsername: selectors.getAuthUsername(state),
    }),
    dispatch => ({
      onSubmit(values) {
        const {email, username, password, password2, tipo} = values;
        console.log(values);
        //dispatch(actions.startRegister(email, username, password, password2));
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
