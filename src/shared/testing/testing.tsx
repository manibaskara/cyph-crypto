import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {render as rtlRender, RenderAPI} from '@testing-library/react-native';
import React, {ReactElement} from 'react';
import PortfolioProvider from '../../screens/Portfolio/PortfolioProvider';

const flushPromises = () => new Promise(setImmediate);

type Props = {
  children?: React.ReactNode;
};

const Providers: React.FC<Props> = ({children}): ReactElement => {
  return (
    <PortfolioProvider>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </PortfolioProvider>
  );
};

const render = (ui: ReactElement): RenderAPI =>
  rtlRender(ui, {wrapper: Providers});

export * from '@testing-library/react-native';

export {render, flushPromises};
