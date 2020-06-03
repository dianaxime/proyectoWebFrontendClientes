import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/valoraciones';
import ValoracionRow from '../ValoracionRow';;

const ValoracionList = ({ comentarios, isLoading, onLoad, puntuacion }) => {
  useEffect(onLoad, []);
  return (
    <View>
        <Text>{ puntuacion }</Text>
      {
        comentarios.length === 0 && !isLoading && (
          <Text>{'No hay Comentarios'}</Text>
        )
      }
      {
        isLoading && (
          <ActivityIndicator/>
        )
      }
      {
        comentarios.length > 0 && !isLoading && (
          <>
            <ScrollView>
              {comentarios && comentarios.map((item, i) => (
                <ValoracionRow
                  key={i}
                  item={item} 
                />
              ))}
            </ScrollView>
          </>
        )
      }
    </View>
  );
};

export default connect(
  state => ({
    comentarios: selectors.getComentarios(state),
    isLoading: selectors.isFetchingComentarios(state),
    puntuacion: selectors.getPuntuacion(state),
    empleado: selectors.getEmpleado(state, selectors.getAuthUserID(state)),
  }),
  dispatch => ({
    onLoad(empleado) {
      dispatch(actions.startFetchingComentarios(empleado));
      dispatch(actions.startFetchingPuntuacion(empleado));
    },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onLoad() {
      dispatchProps.onLoad(stateProps.empleado);
    },
  })
)(ValoracionList);
