import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import { Background } from './components/background';
import { Theme } from './theme';
import { Navigator } from './navigator';
import { ThemeProvider } from 'react-native-elements';

export default function App() {
  let [isReady] = useFonts({
    Roboto: require('./fonts/roboto/Roboto-Black.ttf')
  });

  if (!isReady) return <AppLoading />;
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Background>
          <Navigator />
        </Background>
      </ThemeProvider>
      <StatusBar style="dark" />
    </>
  );
}
