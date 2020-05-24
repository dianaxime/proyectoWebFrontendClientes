import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { configureStore } from './src/store';
import AuthNavigator from './src/routes/auth';
import Logout from './src/components/Logout';
import TokenRefresh from './src/components/TokenRefresh';

const { store, persistor } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <AuthNavigator />
      <Logout />
      <TokenRefresh reviewTime={120000} />
    </PersistGate>
  </Provider>
);

export default App;
