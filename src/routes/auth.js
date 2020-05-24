import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Login from '../components/LoginForm';
import Register from '../components/RegisterForm';

const screens = {
    Register: {
        screen: Register
    },
    Login: {
        screen: Login
    }
}

const AuthStack = createStackNavigator(screens);

export default createAppContainer(AuthStack);