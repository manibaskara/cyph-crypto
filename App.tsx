/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import Navigation from './src/navigation/navigation';
import PortfolioProvider from './src/screens/Portfolio/PortfolioProvider';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

function App(): JSX.Element {
  return (
    <PortfolioProvider>
      <BottomSheetModalProvider>
        <Navigation />
      </BottomSheetModalProvider>
    </PortfolioProvider>
  );
}

export default App;
