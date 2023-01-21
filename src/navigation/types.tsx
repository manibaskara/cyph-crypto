import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

export type DashboardStackParamsList = {
  Browsers: undefined;
};

export type PortfolioStackParamsList = {
  Portfolios: undefined;
};

export type ShortcutsStackParamsList = {
  Shortcut: undefined;
};

export type OptionsStackParamsList = {
  Option: undefined;
};

export type BrowserScreenProps = {
  navigation: NativeStackNavigationProp<DashboardStackParamsList, 'Browsers'>;
  route: RouteProp<DashboardStackParamsList, 'Browsers'>;
};
export type PortfolioScreenProps = {
  navigation: NativeStackNavigationProp<PortfolioStackParamsList, 'Portfolios'>;
  route: RouteProp<PortfolioStackParamsList, 'Portfolios'>;
};

export type ShortcutsScreenProps = {
  navigation: NativeStackNavigationProp<ShortcutsStackParamsList, 'Shortcut'>;
  route: RouteProp<ShortcutsStackParamsList, 'Shortcut'>;
};

export type OptionsScreenProps = {
  navigation: NativeStackNavigationProp<OptionsStackParamsList, 'Option'>;
  route: RouteProp<OptionsStackParamsList, 'Option'>;
};
