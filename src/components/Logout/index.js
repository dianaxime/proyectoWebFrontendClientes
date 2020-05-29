import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Button, Text } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';


const Logout = ({ onClick, isHidden = false, tipo }) => (
  <View style={styles.container}>
    {
      !isHidden && (
        <Button onPress={onClick} title='Cerrar sesión'>
        </Button>
      )
    }
    <Text>{tipo}</Text>
  </View>
);


export default connect(
  state => ({
    isHidden: !selectors.isAuthenticated(state),
    tipo: selectors.getUsuario(state),
  }),
  dispatch => ({
    onClick() {
      dispatch(actions.logout());
    },
  })
)(Logout);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});