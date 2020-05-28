import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';

import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';


const UpgradeForm = ({
  onSubmit,
  isLoading,
  error = null,
  handleSubmit,
  onDisplay,
  onHand,
  kindOfTyte,
}) => {
  const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
    return <TextInput onChangeText={onChange} {...restInput} {...rest} />
  }
  return (
    <View>
      {
        kindOfTyte === 'Cliente' ? (
            <View style={styles.container}>
              {
                error && (
                  <Text>{error}</Text>
                )
              }
              <Field
                name={'telefonoCliente'}
                props={{
                  placeholder: 'Número de telefóno',
                }}
                component={renderInput}
              />
              <Field
                name={'direccionCliente'}
                props={{
                  placeholder: 'Dirección',
                }}
                component={ renderInput }
              />
                {
                  isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <Button onPress={handleSubmit(onDisplay)} title='Registrar'></Button>
                  )
                }
            </View>
        ) : (
            <View style={styles.container}>
              {
                error && (
                  <Text>{error}</Text>
                )
              }
              <Field
                name={'telefonoEmpleado'}
                props={{
                  placeholder: 'Número de telefóno',
                }}
                component={renderInput}
              />
              <Field
                name={'direccionEmpleado'}
                props={{
                  placeholder: 'Dirección',
                }}
                component={ renderInput }
              />
              <Field
                name={'puestoEmpleado'}
                props={{
                  placeholder: 'Puesto de trabajo',
                  secureTextEntry: true,
                  }}
                  component={renderInput}
                />
                {
                  isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <Button onPress={handleSubmit(onHand)} title='Registrar'></Button>
                  )
                }
            </View>
          )
        }
    </View>
  );
} 

export default reduxForm({form: 'Actualizar'})(
  connect(
    state => ({
      isLoading: selectors.getIsRegistering(state),
      error: selectors.getRegisteringError(state),
    }),
    dispatch => ({
      onSubmit(values) {
        const {email, username, password, password2, tipo} = values;
        dispatch(actions.startRegister(username, password, password2, email, tipo));
        dispatch(reset('Actualizar'));
      },
    }),
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
