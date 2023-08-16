import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import App from '@/App';
import store from '@/store';
// import store from '';

SplashScreen.preventAutoHideAsync();

function Entry() {
  enableScreens(false);
  const [isReady, setIsReady] = useState(false);

  setTimeout(() => {
    SplashScreen.hideAsync().then(() => setIsReady(true));
  }, 2000);

  if (isReady) {
    return (
      <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <StatusBar style='auto' />
          <App />
        </NativeBaseProvider>
      </NavigationContainer>
      </Provider>
    );
  }
}

registerRootComponent(Entry);
