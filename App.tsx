/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import Navigation from './src/navigation/navigation';
import APIContextProvider from './src/context/APIContextProvider';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {PORTFOLIO_URL, RESULT_MOCK} from './src/constants';
import fetchMock from 'fetch-mock';

fetchMock.mock(PORTFOLIO_URL, RESULT_MOCK, {
  delay: 1000,
  overwriteRoutes: true,
});

function App(): JSX.Element {
  return (
    <APIContextProvider>
      <BottomSheetModalProvider>
        <Navigation />
      </BottomSheetModalProvider>
    </APIContextProvider>
  );
}

export default App;
