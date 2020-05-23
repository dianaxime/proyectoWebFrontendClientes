import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';

import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';


const LoginForm = ({
  onSubmit,
  isLoading,
  error = null,
  isAuthenticated = false,
  authUsername = '',
}) => {
  if (isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text>{`Bienvenido ${authUsername} nuevamente!`}</Text>
      </View>
    );
  }

  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');
  return (
    <View style={styles.container}>
      {
        error && (
          <Text>{error}</Text>
        )
      }
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText = {valor => changeUsername(valor)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Contraseña"
          value={password}
          onChangeText = {valor => changePassword(valor)}
        />
      <View>
        {
          isLoading ? (
            <Text>{'Cargando...'}</Text>
          ) : (
            <Button onPress={() => onSubmit(username, password)} title='Enviar'></Button>
          )
        }
      </View>
    </View>
  );
} 


export default connect(
  state => ({
    isLoading: selectors.getIsAuthenticating(state),
    error: selectors.getAuthenticatingError(state),
    isAuthenticated: selectors.isAuthenticated(state),
    authUsername: selectors.getAuthUsername(state),
  }),
  dispatch => ({
    onSubmit(username, password) {
      dispatch(actions.startLogin(username, password));
    },
  }),
)(LoginForm);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
