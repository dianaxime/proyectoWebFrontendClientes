import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Login from '../components/LoginForm';
import Register from '../components/RegisterForm';

const screens = {
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Inicio de sesión'
        },
    },
    Register: {
        screen: Register,
        navigationOptions: {
            title: 'Crea una cuenta'
        },
    }
}

const AuthStack = createStackNavigator(screens);

export default createAppContainer(AuthStack);