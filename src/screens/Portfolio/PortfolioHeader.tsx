import React, {useEffect} from 'react';
import {StyleSheet, View, ImageBackground, Text} from 'react-native';
import {usePortfolioDataContext} from './PortfolioContext';
import AppPicker from '../../shared/components/AppPicker';
import Button from '../../shared/components/Button';
import {colors} from '../../constants';
import {convertToDollar} from '../../utils/util';

const PortfolioHeader = () => {
  const {portfolioData, selectedChain, setSelectedChain} =
    usePortfolioDataContext();

  const chainEntities = portfolioData?.record?.chain_portfolios || [];

  useEffect(() => {
    if (portfolioData?.record?.chain_portfolios?.[0]) {
      setSelectedChain(portfolioData.record.chain_portfolios[0]);
    }
  }, [portfolioData, setSelectedChain]);

  return (
    <ImageBackground
      style={styles.image}
      source={require('../../assets/wallet_bg.png')}
      resizeMode="cover">
      <View>
        <View style={styles.alignRight}>
          <AppPicker
            data={chainEntities}
            idField="chain_id"
            valueField="chain_id"
            value={selectedChain}
            onChange={item => {
              setSelectedChain(item);
            }}
          />
        </View>
        <Text style={styles.title}>{'Total Balance'}</Text>
        <Text style={styles.holding}>
          {convertToDollar(selectedChain?.total_value)}
        </Text>
        <View style={styles.title}>
          <Button
            value="Load Wallet"
            onPress={() => {}}
            color={colors.primary}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {padding: 18},
  alignRight: {flexDirection: 'row-reverse'},
  title: {fontSize: 12, paddingTop: 12},
  holding: {
    fontSize: 32,
    paddingTop: 8,
    fontWeight: 'bold',
  },
});

export default PortfolioHeader;
