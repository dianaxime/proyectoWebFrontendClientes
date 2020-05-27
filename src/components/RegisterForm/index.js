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
  onDisplay,
  onHand,
  isRegister,
  kindOfTyte,
}) => {
  const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
    return <TextInput onChangeText={onChange} {...restInput} {...rest} />
  }
  return (
    <View>
      {
        !isRegister ? (
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
              component={ renderInput }
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
                  <ActivityIndicator/>
                ) : (
                  <Button onPress={handleSubmit(onSubmit)} title='Siguiente'></Button>
                )
              }
          </View>
        ) : (
          kindOfTyte === 'Cliente' ? (
            <View style={styles.container}>
              {
                error && (
                  <Text>{error}</Text>
                )
              }
              <Field
                name={'nombreCliente'}
                props={{
                  placeholder: 'Nombre',
                }}
                component={renderInput}
              />
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
              <Field
                name={'nitCliente'}
                props={{
                  placeholder: 'Número de NIT',
                  secureTextEntry: true,
                  }}
                  component={renderInput}
                />
                {
                  isLoading ? (
                    <ActivityIndicator/>
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
                name={'nombreEmpleado'}
                props={{
                  placeholder: 'Nombre',
                }}
                component={renderInput}
              />
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
                    <ActivityIndicator/>
                  ) : (
                    <Button onPress={handleSubmit(onHand)} title='Registrar'></Button>
                  )
                }
            </View>
          )
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
        const {email, username, password, password2, tipo} = values;
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
