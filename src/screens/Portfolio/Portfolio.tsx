import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import PortfolioHeader from './PortfolioHeader';
import CoinList from './CoinList';

const Portfolio = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PortfolioHeader />
      <CoinList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Portfolio;
