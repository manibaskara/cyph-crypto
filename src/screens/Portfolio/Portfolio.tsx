import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {usePortfolioDataContext} from './PortfolioContext';

const Portfolio = () => {
  const {portfolioData, isFetching, fetchPortfolioData} =
    usePortfolioDataContext();

  return (
    <SafeAreaView style={styles.container}>
      <View>{'Portfolio'}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Portfolio;
