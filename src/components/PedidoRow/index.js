import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/pedidos';
import * as selectedActions from '../../actions/selectedPedido';
import moment from 'moment';
import RegistroList from '../RegistroList';
import ValoracionForm from '../ValoracionForm';

const PedidoRow = ({ item, pedido, onSelect, tipo, onAccept, onComplete }) => (
    <TouchableOpacity onPress={onSelect}>
        <Text>{ moment(item.fechaPedido).calendar() }</Text>
        <Text>{ item.entregaPedido }</Text>
        {
            pedido === item.id && (
                <>
                    <RegistroList
                    key={pedido}
                    item={pedido} 
                    />
                    {
                        tipo === 'Cliente' && (
                            <ValoracionForm />
                        )
                    }
                    {
                        tipo === 'Empleado' && (
                            <>
                                <Button title='Aceptar' onPress={onAccept}></Button>
                                <Button title='Completar' onPress={onComplete}></Button>
                            </>
                        )
                    }
                </>
            )
        }
    </TouchableOpacity>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getPedido(state, item),
    pedido: selectors.getSelectedPedido(state),
    tipo: selectors.getUsuario(state),
    empleado: selectors.getEmpleado(state, selectors.getAuthUserID(state)),
  }),
  (dispatch, { item }) => ({
    onSelect() {
      console.log(item.id);
      dispatch(selectedActions.selectPedido(item.id));
    },
    onAccept(empleado, pedido) {
        dispatch(actions.startTakingPedido(pedido, empleado));
    },
    onComplete(pedido){
        dispatch(actions.startEndingPedido(pedido));
    },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onAccept(){
        console.log("------",stateProps.empleado['id'], stateProps.pedido)
        dispatchProps.onAccept(stateProps.empleado['id'], stateProps.pedido);
    },
    onComplete(){
        dispatchProps.onComplete(stateProps.pedido);
    },
  })
)(PedidoRow);