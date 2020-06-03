import 'react-native-gesture-handler';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { connect } from 'react-redux';
import * as selectors from './src/reducers';

import Logout from './src/components/Logout';
import TokenRefresh from './src/components/TokenRefresh';
import Login from './src/components/LoginForm';
import Register from './src/components/RegisterForm';
import DataForm from './src/components/DataForm';
import UpgradeForm from './src/components/UpgradeForm';
import ProductoForm from './src/components/ProductoForm';
import ProductoList from './src/components/ProductoList';
import CompraList from './src/components/CompraList';
import TiendaForm from './src/components/TiendaForm';
import TiendaList from './src/components/TiendaList';
import ListaList from './src/components/ListaList';
import FacturaList from './src/components/FacturaList';
import PedidoList from './src/components/PedidoList';
import Options from './src/components/Options';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainApp = ({
  isAuthenticated = false,
  fetchingCliente = false,
  fetchingEmpleado = false,
  tipo = null,
  cliente = null,
  empleado = null,
}) => {
  return (
    <>
    <NavigationContainer>
      {
        !isAuthenticated ? (
          <Stack.Navigator>
            <Stack.Screen name='LogIn' options={{title: 'Iniciar Sesión'}} component={Login}/>
            <Stack.Screen name='SignIn' options={{title: 'Registro'}} component={Register}/>
          </Stack.Navigator>
        ) : (
          <>
            <Logout />
            <TokenRefresh />
            <Drawer.Navigator initialRouteName="Productos">
              <Drawer.Screen name="Productos" component={ProductoList} />
              <Drawer.Screen name="Ubicaciones" component={TiendaList} />
              <Drawer.Screen name="Actualizar" component={UpgradeForm} />
              <Drawer.Screen name="Facturas" component={FacturaList} />
              <Drawer.Screen name="Pedidos" component={PedidoList} />
              <Drawer.Screen name="Options" component={Options} />
            </Drawer.Navigator>
            {/*
            <ProductoList />
            <TiendaList />
            <UpgradeForm />
            <FacturaList />
            <PedidoList />
            <CompraList />
            <ListaList />
          */}
          {
            !fetchingCliente && !fetchingEmpleado && !cliente && !empleado && tipo && isAuthenticated && (
              <DataForm />
            )
          }
          </>
        )
      }
    </NavigationContainer>
    </>
  );
};

export default connect(
  state => ({
    isAuthenticated: selectors.isAuthenticated(state),
    fetchingCliente: selectors.isFetchingCliente(state),
    fetchingEmpleado: selectors.isFetchingEmpleado(state),
    tipo: selectors.getUsuario(state),
    cliente: selectors.getCliente(state, selectors.getAuthUserID(state)),
    empleado: selectors.getEmpleado(state, selectors.getAuthUserID(state)),
  }),
  undefined
)
(MainApp);