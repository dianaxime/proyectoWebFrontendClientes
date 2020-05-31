import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';

import * as selectors from '../../reducers';
import * as actions from '../../actions/tiendas';

const UpgradeTienda = ({
  onSubmit,
  handleSubmit,
}) => {
  const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
    return <TextInput onChangeText={onChange} {...restInput} {...rest} />
  }
  return (
    <View style={styles.container}>
        <Field
            name={'ubicacionTienda'}
            props={{
            placeholder: 'Ubicación',
            }}
            component={ renderInput }
        />
        <Field
            name={'telefonoTienda'}
            props={{
            placeholder: 'Telefóno',
            }}
            component={renderInput}
        />
        <Field
            name={'faxTienda'}
            props={{
            placeholder: 'Fax',
            }}
            component={renderInput}
        />
        <Button onPress={handleSubmit(onSubmit)} title='Actualizar'></Button>
    </View>
  );
} 

export default reduxForm({form: 'UpgradeTienda'})(
  connect(
    state => ({
      tipo: selectors.getUsuario(state),
      tiendaId: selectors.getSelectedTienda(state),
    }),
    dispatch => ({
      onSubmit(values, tiendaId) {
        const {
          ubicacionTienda,
          telefonoTienda,
          faxTienda,
        } = values;
        dispatch(actions.startUpdatingTienda(tiendaId, ubicacionTienda, telefonoTienda, faxTienda));
        dispatch(reset('UpgradeTienda'));
      },
    }),
  )(UpgradeTienda)
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
