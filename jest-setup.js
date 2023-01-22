import 'react-native-gesture-handler/jestSetup';
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

jest.mock('@gorhom/bottom-sheet', () => require('@gorhom/bottom-sheet/mock'));
