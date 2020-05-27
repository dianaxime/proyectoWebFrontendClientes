import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';

import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';


const LoginForm = ({
  onSubmit,
  isLoading,
  error = null,
  isAuthenticated = false,
  authUsername = '',
  handleSubmit,
  navigation,
}) => {
  const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
    return <TextInput onChangeText={onChange} {...restInput} {...rest} />
  }
  const goRegister = () =>{
    navigation.push('Register')
  }
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
        name={'username'}
        props={{
          placeholder: 'Correo',
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
        {
          isLoading ? (
            <ActivityIndicator/>
          ) : (
            <Button onPress={handleSubmit(onSubmit)} title='Ingresar'></Button>
          )
        }
        <Button title='¿Aún no tienes una cuenta?' onPress={goRegister}></Button>
    </View>
  );
} 

export default reduxForm({form: 'Login'})(
  connect(
    state => ({
      isLoading: selectors.getIsAuthenticating(state),
      error: selectors.getAuthenticatingError(state),
      isAuthenticated: selectors.isAuthenticated(state),
      authUsername: selectors.getAuthUsername(state),
    }),
    dispatch => ({
      onSubmit(values) {
        const {username, password} = values;
        dispatch(actions.startLogin(username, password));
        dispatch(reset('Login'));
      },
    }),
  )(LoginForm)
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
