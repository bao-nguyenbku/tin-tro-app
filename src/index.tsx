import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { config, stackTheme, theme } from './theme';

import App from '@/App';
import store from '@/store';

SplashScreen.preventAutoHideAsync();

function Entry() {
  const [isReady, setIsReady] = useState(false);

  setTimeout(() => {
    SplashScreen.hideAsync().then(() => setIsReady(true));
  }, 2000);

  if (isReady) {
    return (
      <Provider store={store}>
        <NavigationContainer theme={stackTheme}>
          <NativeBaseProvider config={config} theme={theme}>
            <StatusBar style='auto' />
            <App />
          </NativeBaseProvider>
        </NavigationContainer>
      </Provider>
    );
  }
}

registerRootComponent(Entry);
