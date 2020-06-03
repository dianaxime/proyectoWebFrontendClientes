import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from 'react-native-elements';

import * as selectors from '../../reducers';
import * as actions from '../../actions/valoraciones';
import * as actionsPuntuacion from '../../actions/selectedPuntuacion';

const ValoracionForm = ({
  onSubmit,
  handleSubmit,
  onRate,
}) => {
  const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
    return <TextInput onChangeText={onChange} {...restInput} {...rest} />
  }
  return (
    <View >
      <Field
        name={'comentarios'}
        props={{
          placeholder: 'Comentarios',
        }}
        component={renderInput}
      />
        <Icon
        raised
        name='emoji-sad'
        type='entypo'
        color='#f50'
        onPress={() => onRate(1)} 
        />
        <Icon
        raised
        name='emoji-neutral'
        type='entypo'
        color='#f50'
        onPress={() => onRate(3)} 
        />
        <Icon
        raised
        name='emoji-happy'
        type='entypo'
        color='#f50'
        onPress={() => onRate(5)} 
        />
      <Button onPress={handleSubmit(onSubmit)} title='Enviar'></Button>
    </View>
  );
} 

export default reduxForm({form: 'Valoracion'})(
  connect(
    state => ({
      rate: selectors.getSelectedPuntuacion(state),
      pedido: selectors.getPedido(state, selectors.getSelectedPedido(state)),
      cliente: selectors.getCliente(state, selectors.getAuthUserID(state)),
    }),
    dispatch => ({
      onSubmit(values, rate, empleado, cliente) {
        const {
          comentarios,
        } = values;
        console.log(rate);
        dispatch(actions.startAddingValoracion(uuidv4(), comentarios, rate, cliente, empleado));
        dispatch(reset('Valoracion'));
      },
      onRate(rate) {
        dispatch(actionsPuntuacion.selectPuntuacion(rate));
      },
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onSubmit(values) {
          dispatchProps.onSubmit(values, stateProps.rate, stateProps.pedido['idEmpleado'], stateProps.cliente['id']);
        },
    })
  )(ValoracionForm),
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
