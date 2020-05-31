import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';

import * as selectors from '../../reducers';
import * as actions from '../../actions/listas';
import * as actionsEmpleados from '../../actions/empleados';

const ListaForm = ({
  onSubmit,
  handleSubmit,
  onLoad,
}) => {
    useEffect(onLoad, []);
  const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
    return <TextInput onChangeText={onChange} {...restInput} {...rest} />
  }
  return (
    <View >
        <Field
        name={'fecha'}
        props={{
          placeholder: 'Fecha',
        }}
        component={renderInput}
      />
      <Field
        name={'cantidad'}
        props={{
          placeholder: 'Cantidad',
        }}
        component={renderInput}
      />
      <Field
        name={'turno'}
        props={{
          placeholder: 'Turno',
        }}
        component={ renderInput }
      />
      <Button onPress={handleSubmit(onSubmit)} title='Agregar'></Button>
    </View>
  );
} 

export default reduxForm({form: 'Lista'})(
  connect(
    state => ({
      producto: selectors.getSelectedProducto(state),
      empleado: selectors.getEmpleado(state, selectors.getAuthUserID(state)),
    }),
    dispatch => ({
      onSubmit(values, producto, empleado) {
        const {
          fecha,
          cantidad,
          turno,
        } = values;
        dispatch(actions.startAddingLista(uuidv4(), fecha, cantidad, turno, producto, empleado));
        dispatch(reset('Lista'));
      },
      onLoad() {
        setTimeout(() => {
          dispatch(actionsEmpleados.startFetchingEmpleado());
        }, 3000); 
      },
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onSubmit(values) {
          dispatchProps.onSubmit(values, stateProps.producto, stateProps.empleado['id']);
        },
      })
  )(ListaForm)
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

