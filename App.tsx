/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import Navigation from './src/navigation/navigation';
import PortfolioProvider from './src/screens/Portfolio/PortfolioProvider';

function App(): JSX.Element {
  return (
    <PortfolioProvider>
      <Navigation />
    </PortfolioProvider>
  );
}

export default App;
