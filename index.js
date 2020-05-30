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

const Stack = createStackNavigator();
const MainApp = ({
  isAuthenticated = false 
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
            {/*<DataForm />
            <UpgradeForm />
            <ProductoForm />
            <ProductoList />
            */}
            <CompraList />
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
  }),
  undefined
)
(MainApp);